import { Router } from 'express';
import { validateJwt } from '../middlewares/validateJwt';
import { getMessages } from '../controllers/messages';
const router = Router();

router.get('/:fromUserId', validateJwt, getMessages);

export default router;
