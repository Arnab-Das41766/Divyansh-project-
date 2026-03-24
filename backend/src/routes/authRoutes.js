import express from 'express';
import { 
  register, 
  login, 
  verifyOTP, 
  resendOTP, 
  getCurrentUser,
  logout 
} from '../controllers/authController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

// Protected routes
router.get('/me', verifyToken, getCurrentUser);
router.post('/logout', verifyToken, logout);

export default router;
