const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

exports.protect = async (req, res, next) => {
 
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
   console.log("Token from header:", token);

  if (!token)
    return res.status(401).json({ message: "Not authorized, token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    console.log("Decoded token:", decoded);

     console.log("Decoded JWT:", decoded); 

    const user = await User.findById(decoded.userId).select("-password");
     console.log("User fetched:", user); 
    if (!user)
      return res.status(401).json({ message: "User not found" });

    req.user = user; 
   console.log(req.user)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};
