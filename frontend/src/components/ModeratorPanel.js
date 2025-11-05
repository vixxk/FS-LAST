import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function ModeratorPanel({ token }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModeratorData();
  }, []);

  const fetchModeratorData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/moderator/panel', {
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

      console.log('Moderator panel data:', result);
      setData(result.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch moderator data:', err);
      setError('Failed to fetch moderator data');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-card moderator-card">
      <div className="card-header">
        <h2>Moderator Panel</h2>
        <span className="role-tag moderator">Moderator</span>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error-box">{error}</div>
        ) : data ? (
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{data.pendingReports}</div>
              <div className="stat-label">Pending Reports</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{data.resolvedReports}</div>
              <div className="stat-label">Resolved Reports</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{data.flaggedContent}</div>
              <div className="stat-label">Flagged Content</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{data.activeUsers}</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
        ) : null}
      </div>
      
      <div className="card-footer">
        <button onClick={fetchModeratorData} className="refresh-btn">
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default ModeratorPanel;
