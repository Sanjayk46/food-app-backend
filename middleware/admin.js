// const { verify } = require('jsonwebtoken');
// const UNAUTHORIZED = 401;
// const admin = (req, res, next) => {
//   const adminHeader = req.headers['authorization'];
//   const token = adminHeader.split(' ')[1];
//   // const token = req.headers.access_token;
//   if (!token) return res.status(UNAUTHORIZED).send();

//   try {
//     const decoded = verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(UNAUTHORIZED).send();
//   }
// };
//module.exports = admin;
const UNAUTHORIZED = 400;
const authMiddleware = require("./auth");
const admin = (req, res, next) => {
  authMiddleware(req,res=>{
  const user = req.user;
  if (!user || typeof user.isAdmin === 'undefined') {
    // If user is not defined or isAdmin property is not defined, return unauthorized
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check if user is an admin
  if (!user.isAdmin) {
    // If user is not an admin, return unauthorized
    return res.status(403).json({ error: 'Forbidden' });
  }
});

  // If user is an admin, proceed to the next middleware
  next();
};
module.exports = {admin,authMiddleware};
