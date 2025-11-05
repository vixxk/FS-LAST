import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ModeratorPanel from './components/ModeratorPanel';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken) {
      setToken(storedToken);
    }
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    console.log('Login successful:', { token: newToken, user: newUser });
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>JWT Authentication System</h1>
        {user && (
          <div className="user-info">
            <span className="username">{user.username}</span>
            <span className="role-badge">{user.role}</span>
          </div>
        )}
      </header>

      <main className="app-main">
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <div className="control-panel">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>

            <div className="dashboard-container">
              {user?.role === 'Admin' && <AdminDashboard token={token} />}
              
              {(user?.role === 'Moderator' || user?.role === 'Admin') && (
                <ModeratorPanel token={token} />
              )}
              
              <UserProfile token={token} />
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 JWT Auth App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
