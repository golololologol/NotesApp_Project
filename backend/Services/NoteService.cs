using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NotesAPI.Data;
using NotesAPI.Exceptions;
using NotesAPI.Models.DTOs;
using NotesAPI.Models.Entities;

namespace NotesAPI.Services
{
    public class NoteService : INoteService
    {
        private readonly ApplicationDbContext _context;

        public NoteService(ApplicationDbContext context, ILogger<NoteService> logger)
        {
            _context = context;
        }

        public async Task<IEnumerable<NoteResponseDto>> GetNotesAsync(string userId, string? search, DateTime? fromDate, DateTime? toDate, int page, int pageSize)
        {
            var query = _context.Notes.Where(n => n.UserId == userId);

            if (!search.IsNullOrEmpty())
                query = query.Where(n => n.Title.Contains(search));
            if (fromDate.HasValue)
                query = query.Where(n => n.CreatedDate >= fromDate.Value.Date);
            if (toDate.HasValue)
                query = query.Where(n => n.CreatedDate <= toDate.Value.Date);

            var notes = await query
                .OrderByDescending(n => n.CreatedDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return notes.Select(n => new NoteResponseDto
            {
                Id = n.Id,
                Title = n.Title,
                Description = n.Description,
                CreatedDate = n.CreatedDate
            });
        }

        public async Task<NoteResponseDto> CreateNoteAsync(string userId, NoteDto noteDto)
        {
            try
            {
                var note = new Note
                {
                    Title = noteDto.Title,
                    Description = noteDto.Description,
                    CreatedDate = DateTime.UtcNow,
                    UserId = userId
                };

                _context.Notes.Add(note);
                await _context.SaveChangesAsync();

                return new NoteResponseDto
                {
                    Id = note.Id,
                    Title = note.Title,
                    Description = note.Description,
                    CreatedDate = note.CreatedDate
                };
            }
            catch (Exception ex)
            {
                var errorMessage = "Creation failed:\n" + ex.Message;
                throw new Exception(errorMessage);
            }
        }

        public async Task<NoteResponseDto> UpdateNoteAsync(string userId, int noteId, NoteDto noteDto)
        {
            try
            {
                var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == noteId && n.UserId == userId);
                if (note == null)
                    throw new NotFoundException("Note not found.");

                note.Title = noteDto.Title;
                note.Description = noteDto.Description;
                await _context.SaveChangesAsync();

                return new NoteResponseDto
                {
                    Id = note.Id,
                    Title = note.Title,
                    Description = note.Description,
                    CreatedDate = note.CreatedDate
                };
            }
            catch (Exception ex)
            {
                var errorMessage = "Update failed:\n" + ex.Message;
                throw new Exception(errorMessage);
            }
        }

        public async Task DeleteNoteAsync(string userId, int noteId)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == noteId && n.UserId == userId);
            if (note == null)
                throw new NotFoundException("Note not found.");

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
        }
    }
}
