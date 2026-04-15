import express from "express";
import eventRoutes from "./event.route";
import userRoutes from "./user.route";
import otpRoutes from "./otp.route";
import cartRoutes from "./cart.route";
import analyticsRoutes from "./analytics.route";
import swaggerDocument from '../swagger.json';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

router.use("/events", eventRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/otp", otpRoutes);
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
