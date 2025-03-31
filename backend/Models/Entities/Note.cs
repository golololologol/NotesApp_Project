using System;

namespace NotesAPI.Models.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
