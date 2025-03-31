import React from 'react';

function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <div className="row">
      {notes.map(note => (
        <div className="col-md-4" key={note.id}>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  {new Date(note.createdDate).toLocaleString()}
                </small>
              </p>
              <button className="btn btn-primary me-2" onClick={() => onEdit(note)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => onDelete(note.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
