using System.ComponentModel.DataAnnotations;

namespace NotesAPI.Models.DTOs
{
    public class LoginModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class RegisterModel
    {
        [Required]
        [MinLength(6, ErrorMessage = "• Username must be at least 6 characters long.")]
        public string Username { get; set; }

        [Required]
        [MinLength(6, ErrorMessage = "• Password must be at least 6 characters long.")]
        public string Password { get; set; }
    }
}
