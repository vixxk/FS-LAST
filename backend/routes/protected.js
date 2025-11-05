const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');

const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
  res.json({ 
    message: 'This is a protected route', 
    user: req.user 
  });
});

router.get('/admin/dashboard', verifyToken, checkRole('Admin'), (req, res) => {
  res.json({ 
    message: 'Welcome to Admin Dashboard', 
    data: { 
      totalUsers: 100, 
      activeUsers: 75, 
      systemHealth: 'Good',
      pendingTasks: 12,
      completedTasks: 88
    } 
  });
});

router.get('/moderator/panel', verifyToken, checkRole('Moderator', 'Admin'), (req, res) => {
  res.json({ 
    message: 'Welcome to Moderator Panel', 
    data: { 
      pendingReports: 15, 
      resolvedReports: 45,
      flaggedContent: 8,
      activeUsers: 234
    } 
  });
});

router.get('/user/profile', verifyToken, checkRole('User', 'Moderator', 'Admin'), (req, res) => {
  res.json({ 
    message: 'User Profile', 
    user: req.user,
    profile: {
      email: `${req.user.username}@example.com`,
      joinDate: '2024-01-15',
      lastLogin: new Date().toISOString()
    }
  });
});

module.exports = router;
