import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Register() {
  const { register, loading, error, clearError } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Register</h2>
      {error && (
        <div className="alert alert-danger">
          {error.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input 
            type="username"
            className="form-control" 
            value={username} 
            onChange={(e)=> setUsername(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input 
            type="password"
            className="form-control" 
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="mt-3">
        Already have an account?{' '}
        <Link to="/login" onClick={() => clearError && clearError()}>
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;