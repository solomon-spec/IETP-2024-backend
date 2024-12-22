import express from 'express';
import { registerUser } from '../controllers/userController';
import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', isAdmin, registerUser);

export default router;