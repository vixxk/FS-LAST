import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log(`${name} updated:`, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Both username and password are required');
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    console.log('Form submitted with data:', formData);
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      console.log('Login successful:', data);
      onLogin(data.token, data.user);
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error: Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="test-credentials">
          <h3>Test Credentials</h3>
          <div className="credential-list">
            <div className="credential-item">
              <strong>Admin:</strong> admin / admin123
            </div>
            <div className="credential-item">
              <strong>Moderator:</strong> moderator / mod123
            </div>
            <div className="credential-item">
              <strong>User:</strong> user / user123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
