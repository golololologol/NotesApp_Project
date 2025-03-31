using NotesAPI.Models.Entities;
using NotesAPI.Models.DTOs;

namespace NotesAPI.Services
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterModel model);
        Task<string> LoginAsync(LoginModel model);
    }
}
