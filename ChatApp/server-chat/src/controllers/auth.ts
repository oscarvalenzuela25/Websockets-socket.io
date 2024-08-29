import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../utils/jwt';
import { Response, Request } from 'express';

interface ExtendsRequest extends Request {
  uid?: string;
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        error: 'El correo ya está registrado',
      });
    }

    const salt = bcrypt.genSaltSync();
    const encryptedPassword = bcrypt.hashSync(String(password), salt);

    const user = new User({ name, email, password: encryptedPassword });
    await user.save();

    const token = await generateJWT(user.id);

    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        error: 'El correo ingresado no esta registrado',
      });
    }

    const validPassowrd = bcrypt.compareSync(String(password), user.password);
    if (!validPassowrd) {
      return res.status(500).json({
        error: 'Contraseña invalida',
      });
    }
    const token = await generateJWT(user.id);

    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const renew = async (req: ExtendsRequest, res: Response) => {
  try {
    const uid = req.uid;
    const user = await User.findById(uid);
    if (!user) {
      return res.status(400).json({
        error: 'El usuario con esa id no existe',
      });
    }
    const token = await generateJWT(user.id);
    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
