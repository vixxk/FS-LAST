import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function AdminDashboard({ token }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/dashboard', {
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

      console.log('Admin dashboard data:', result);
      setData(result.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      setError('Failed to fetch admin data');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-card admin-card">
      <div className="card-header">
        <h2>Admin Dashboard</h2>
        <span className="role-tag admin">Admin Only</span>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error-box">{error}</div>
        ) : data ? (
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{data.totalUsers}</div>
              <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{data.activeUsers}</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{data.systemHealth}</div>
              <div className="stat-label">System Health</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{data.pendingTasks}</div>
              <div className="stat-label">Pending Tasks</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{data.completedTasks}</div>
              <div className="stat-label">Completed Tasks</div>
            </div>
          </div>
        ) : null}
      </div>
      
      <div className="card-footer">
        <button onClick={fetchAdminData} className="refresh-btn">
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
