import express from 'express';
import { signup, login, getProfile } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile/:userId', getProfile);

export default router;