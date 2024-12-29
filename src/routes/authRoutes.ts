import { Router } from 'express';
import { generateToken, registerUser } from '../controllers/authController';

const router = Router();
//routes for authentication-related endpoints
router.post('/generate-token', generateToken);
router.post('/register', registerUser);

export default router;