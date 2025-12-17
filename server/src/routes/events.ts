import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.get("/", EventController.getAll);
router.get("/:id", EventController.getById);

router.post("/", authenticate, authorizeRoles(["organizer", "admin"]), EventController.create);
router.put("/:id", authenticate, authorizeRoles(["organizer", "admin"]), EventController.update);
router.delete("/:id", authenticate, authorizeRoles(["admin"]), EventController.delete);


export default router;
