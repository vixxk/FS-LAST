const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: 'Access denied: No role found' });
      }
  
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: `Access denied: ${req.user.role} role is not authorized for this resource` 
        });
      }
  
      next();
    };
  };
  
  module.exports = { checkRole };
  