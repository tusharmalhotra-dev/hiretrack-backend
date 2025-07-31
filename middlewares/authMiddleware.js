const jwt = require("jsonwebtoken");

// ✅ Middleware to verify JWT token and attach user info to request
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ✅ Check if token exists and is properly formatted
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ✅ Attach user info to req.user
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = verifyToken; 