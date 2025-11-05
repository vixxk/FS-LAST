import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function UserProfile({ token }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        setData(null);
        setLoading(false);
        return;
      }

      console.log('User profile data:', result);
      setData(result);
      setError('');
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setError('Failed to fetch user profile');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-card user-card">
      <div className="card-header">
        <h2>User Profile</h2>
        <span className="role-tag user">User</span>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error-box">{error}</div>
        ) : data ? (
          <div className="profile-info">
            <div className="info-row">
              <span className="info-label">Username:</span>
              <span className="info-value">{data.user.username}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Role:</span>
              <span className="info-value">{data.user.role}</span>
            </div>
            <div className="info-row">
              <span className="info-label">User ID:</span>
              <span className="info-value">{data.user.id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{data.profile.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Join Date:</span>
              <span className="info-value">{data.profile.joinDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Login:</span>
              <span className="info-value">
                {new Date(data.profile.lastLogin).toLocaleString()}
              </span>
            </div>
          </div>
        ) : null}
      </div>
      
      <div className="card-footer">
        <button onClick={fetchUserProfile} className="refresh-btn">
          Refresh Profile
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
