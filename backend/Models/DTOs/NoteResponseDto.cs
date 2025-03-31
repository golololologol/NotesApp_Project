using System;

namespace NotesAPI.Models.DTOs
{
    public class NoteResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
