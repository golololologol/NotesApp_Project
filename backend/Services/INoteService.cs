using NotesAPI.Models.DTOs;

namespace NotesAPI.Services
{
    public interface INoteService
    {
        Task<IEnumerable<NoteResponseDto>> GetNotesAsync(string userId, string search, DateTime? fromDate, DateTime? toDate, int page, int pageSize);
        Task<NoteResponseDto> CreateNoteAsync(string userId, NoteDto noteDto);
        Task<NoteResponseDto> UpdateNoteAsync(string userId, int noteId, NoteDto noteDto);
        Task DeleteNoteAsync(string userId, int noteId);
    }
}
