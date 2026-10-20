const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    /*
        Jab client request bhejega, token header me aayega:
        Example:GET /api/profile
        Authorization: Bearer eyJhbGciOiJIUzI1Ni...*/
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      //401 - unauthroized
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; //removes bearer bcoz verify only need this token eyJhbGciOiJIUzI1Ni...
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    /*adding one new property
        req = {
    body: {...},
    headers: {...},
    params: {...},
    user: {
        id: "6a88b517...",
        role: "RESIDENT"
    }
}*/
    req.user = decoded;//Ye line controller ke liye information pass kar rahi hai.

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = authMiddleware;
