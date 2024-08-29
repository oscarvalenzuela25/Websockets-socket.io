import { Router } from 'express';
import { createUser, login, renew } from '../controllers/auth';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { validateJwt } from '../middlewares/validateJwt';
const router = Router();

// Create new users
router.post(
  '/new',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

// Login
router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  login
);

// Renew token
router.get('/renew', validateJwt, renew);

export default router;
