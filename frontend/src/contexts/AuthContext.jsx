import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { parseError } from '../utils/errorParser'; // added import

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save token changes to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { username, password });
      setToken(res.data.token);
      navigate('/notes');
    } catch (err) {
      setError(parseError(err, 'Login failed')); // use parseError
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/register', { username, password });
      setToken(res.data.token);
      navigate('/notes');
    } catch (err) {
      setError(parseError(err, 'Registration failed')); // use parseError
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    navigate('/login');
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ token, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}