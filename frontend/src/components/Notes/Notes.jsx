import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import SearchBar from './SearchBar';
import Layout from '../common/Layout';
import { parseError } from '../../utils/errorParser'; // added import

function Notes() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [filters, setFilters] = useState({ search: '', fromDate: '', toDate: '' });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noteError, setNoteError] = useState(null);

  const fetchNotes = async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      const params = { page, pageSize: 15 };
      if (filters.search && filters.search.trim() !== '') {
        params.search = filters.search;
      }
      if (filters.fromDate && filters.fromDate.trim() !== '') {
        params.fromDate = filters.fromDate;
      }
      if (filters.toDate && filters.toDate.trim() !== '') {
        params.toDate = filters.toDate;
      }
      
      const res = await api.get('/notes', { params });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNotes(page, filters);
  }, [page, filters]);

  const handleSave = async (note) => {
    try {
      if (editingNote) {
        await api.put(`/notes/${editingNote.id}`, note);
      } else {
        await api.post('/notes', note);
      }
      setEditingNote(null);
      setNoteError(null);
      fetchNotes(page, filters);
    } catch (err) {
      const errorMessage = parseError(err, 'Note saving failed'); // use parseError
      setNoteError(errorMessage);
      console.error(err);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes(page, filters);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <Layout>
      <h2>Your Notes</h2>
      <SearchBar onFilterChange={handleFilterChange} />
      <NoteForm 
        onSave={handleSave} 
        editingNote={editingNote} 
        onCancel={() => setEditingNote(null)}
        error={noteError}
        clearError={() => setNoteError(null)}
      />
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      {/* Example simple pagination */}
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </Layout>
  );
}

export default Notes;
