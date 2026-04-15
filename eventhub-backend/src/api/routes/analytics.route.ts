import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { getAnalytics, recordAnalytics } from "../controllers/analytics.controller";


const router = Router();

router.get("/", AuthMiddleware, getAnalytics);
router.post("/", recordAnalytics);

export default router;