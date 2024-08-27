const { Router } = require('express');
const { validateJwt } = require('../middlewares/validateJwt');
const { getMessages } = require('../controllers/messages');
const router = Router();

router.get('/:fromUserId', validateJwt, getMessages);

module.exports = router;
