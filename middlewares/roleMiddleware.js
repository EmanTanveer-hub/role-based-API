const User = require("../models/User"); 

// authorized middleware
const authorized = (...roles) => {
  return (req, res, next) => {
     console.log("ROLE CHECK:", req.user.role, roles);
     
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

module.exports = { authorized };



