const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
  // do stuff
  const token = req.cookies.access_token;
  if(!token)  return res.status(401).json({error:"Unauthorized!"});

  try{
    const decoded = jwt.verify(token,'jwtkey');
    req.user = decoded;
    console.log('tokenvirified')
    next();
  } catch (err){
    res.status(400).json({error: "Invalid token!"});
  }
};

module.exports = authMiddleware;