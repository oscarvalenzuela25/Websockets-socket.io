const jwt = require('jsonwebtoken');

const generateJWT = uid => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

const verifyJWT = token => {
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = {
  generateJWT,
  verifyJWT,
};
