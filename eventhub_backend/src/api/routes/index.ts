import { Router } from "express";
import { EventRoute } from "./eventRoute";

const router = Router();

router.use('/events', EventRoute);

export { router as ApiRoute };