using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesAPI.Models.DTOs;
using NotesAPI.Services;
using System.Security.Claims;

namespace NotesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _noteService;

        public NotesController(INoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes([FromQuery] string? search, [FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var notes = await _noteService.GetNotesAsync(userId, search, fromDate, toDate, page, pageSize);
            return Ok(notes);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] NoteDto noteDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var createdNote = await _noteService.CreateNoteAsync(userId, noteDto);
            return Ok(createdNote);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, [FromBody] NoteDto noteDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var updatedNote = await _noteService.UpdateNoteAsync(userId, id, noteDto);
            return Ok(updatedNote);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _noteService.DeleteNoteAsync(userId, id);
            return NoContent();
        }
    }
}
