const { Router } = require('express');
const { createUser, login, renew } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJwt } = require('../middlewares/validateJwt');
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

module.exports = router;
