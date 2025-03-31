using NotesAPI.Models.Entities;

namespace NotesAPI.Helpers
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(ApplicationUser user);
    }
}
