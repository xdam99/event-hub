import { Router } from "express";
import rateLimit from "express-rate-limit";
import { AuthMiddleware } from "../middlewares";
import {
    generateOtpSecret,
    verifyAndActivateOtp,
    verifyOtpLogin,
    verifyOtpBackupCode,
    disableOtp,
} from "../controllers/otp.controller";

const router = Router();

// Rate limiter (max 4/min)
const otpVerifyLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 4,
    message: { success: false, error: 'Trop de tentatives, veuillez réessayer plus tard' },
    standardHeaders: true,
    legacyHeaders: false,
});

// POST /otp/generate
router.post("/generate", AuthMiddleware, generateOtpSecret);
// POST /otp/verify-activation
router.post("/verify-activation", AuthMiddleware, otpVerifyLimiter, verifyAndActivateOtp);
// POST /otp/verify-login
router.post("/verify-login", otpVerifyLimiter, verifyOtpLogin);
// POST /otp/verify-backup
router.post("/verify-backup", otpVerifyLimiter, verifyOtpBackupCode);
// POST /otp/disable
router.post("/disable", AuthMiddleware, disableOtp);

export default router as Router;
