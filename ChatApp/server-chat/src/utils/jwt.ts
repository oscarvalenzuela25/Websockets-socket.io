import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED || '',
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

export const verifyJWT = (token: string): [boolean, null | string] => {
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED || '') as {
      uid: string;
    };
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};
