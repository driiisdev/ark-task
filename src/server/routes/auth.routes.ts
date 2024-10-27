import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';
import { validateRegistration, validateLogin } from '@/middleware/validation';
import { rateLimiter } from '@/middleware/rate-limiter';

const router = Router();
const authController = new AuthController();

router.post('/register', validateRegistration, rateLimiter, authController.register);
router.post('/login', validateLogin, rateLimiter, authController.login);
router.post('/logout', authController.logout);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/forgot-password', rateLimiter, authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword);
router.get('/me', authController.getCurrentUser);

export default router;
