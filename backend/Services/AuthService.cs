using Microsoft.AspNetCore.Identity;
using NotesAPI.Exceptions;
using NotesAPI.Helpers;
using NotesAPI.Models.DTOs;
using NotesAPI.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace NotesAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtTokenGenerator _tokenGenerator;

        public AuthService(UserManager<ApplicationUser> userManager, IJwtTokenGenerator tokenGenerator)
        {
            _userManager = userManager;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<string> RegisterAsync(RegisterModel model)
        {
            var errors = new List<string>();

            var user = new ApplicationUser { UserName = model.Username };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                errors.AddRange(result.Errors.Select(e => "• " + e.Description));

            if (errors.Any())
            {
                var errorMessage = "Registration failed:\n" + string.Join("\n", errors);
                throw new ArgumentException(errorMessage);
            }

            return _tokenGenerator.GenerateToken(user);
        }

        public async Task<string> LoginAsync(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
                throw new ArgumentException("Incorrect Username or Password.");

            if (!await _userManager.CheckPasswordAsync(user, model.Password))
                throw new ArgumentException("Incorrect Username or Password.");

            return _tokenGenerator.GenerateToken(user);
        }
    }
}