const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      error: 'x-token header is required',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid Token',
    });
  }
};

module.exports = {
  validateJwt,
};
