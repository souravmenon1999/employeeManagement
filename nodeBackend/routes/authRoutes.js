import express from 'express';
import { registeruser, loginuser, otpVerify, logout, refreshToken } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registeruser);
router.post('/otp-verify', otpVerify);
router.post('/login', loginuser);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

export default router;
