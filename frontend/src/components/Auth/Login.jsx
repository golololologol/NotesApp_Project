import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {
  const { login, loading, error, clearError } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logoutReason, setLogoutReason] = useState(null);

  useEffect(() => {
    const reason = localStorage.getItem('logoutReason');
    if (reason) {
      setLogoutReason(reason);
      localStorage.removeItem('logoutReason');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Login</h2>
      {logoutReason && (
        <div className="alert alert-danger">
          {logoutReason}
        </div>
      )}
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-3">
        Don't have an account?{' '}
        <Link to="/register" onClick={() => clearError && clearError()}>
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;