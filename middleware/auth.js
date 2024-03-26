const jwt = require('jsonwebtoken');
const UNAUTHORIZED = 401;
const authMiddleware = (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader.split(' ')[1];
  //console.log(authHeader);
  if (!token) return res.status(UNAUTHORIZED).send();
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assuming jwt is imported
    req.user = decoded;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }
};


module.exports = authMiddleware;