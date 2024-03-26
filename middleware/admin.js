const { verify } = require('jsonwebtoken');
const UNAUTHORIZED = 401;
const admin = (req, res, next) => {
  const adminHeader = req.headers['authorization'];
  const token = adminHeader.split(' ')[1];
  // const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }

  return next();
};
module.exports = admin;