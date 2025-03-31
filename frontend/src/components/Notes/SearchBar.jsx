import React, { useState } from 'react';

function SearchBar({ onFilterChange }) {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ search, fromDate, toDate });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search by title" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input 
            type="date" 
            className="form-control" 
            value={fromDate} 
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input 
            type="date" 
            className="form-control" 
            value={toDate} 
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">Filter</button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
