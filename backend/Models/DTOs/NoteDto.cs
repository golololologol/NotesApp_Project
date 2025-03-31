using System.ComponentModel.DataAnnotations;

namespace NotesAPI.Models.DTOs
{
    public class NoteDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }
    }
}
