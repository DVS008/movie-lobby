import { Router } from 'express';
import { generateToken, registerUser } from '../controllers/authController';

const router = Router();

router.post('/generate-token', generateToken);
router.post('/register', registerUser);

export default router;