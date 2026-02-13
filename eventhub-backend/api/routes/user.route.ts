import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { register, login, getProfile } from "../controllers/user.controller";

const router = Router();


router.post("/register", register);
router.post("/login", login);
router.get("/profile", AuthMiddleware, getProfile);

export default router as Router;
