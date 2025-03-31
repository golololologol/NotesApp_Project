import React, { useState, useEffect } from 'react';

function NoteForm({ onSave, editingNote, onCancel, error, clearError }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger">
          {error.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label>Title</label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => { setTitle(e.target.value); clearError && clearError(); }} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea 
            className="form-control" 
            value={description} 
            onChange={(e) => { setDescription(e.target.value); clearError && clearError(); }} 
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success me-2">
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
        {editingNote && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </>
  );
}

export default NoteForm;
