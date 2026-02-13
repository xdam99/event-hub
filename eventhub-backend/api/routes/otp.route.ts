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

// Rate limit (max 4/min)
const otpVerifyLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 4,
    message: { success: false, error: 'Trop de tentatives, veuillez réessayer plus tard' },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/generate", AuthMiddleware, generateOtpSecret);
router.post("/verify-activation", AuthMiddleware, otpVerifyLimiter, verifyAndActivateOtp);
router.post("/verify-login", otpVerifyLimiter, verifyOtpLogin);
router.post("/verify-backup", otpVerifyLimiter, verifyOtpBackupCode);
router.post("/disable", AuthMiddleware, disableOtp);

export default router as Router;
