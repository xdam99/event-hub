import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// ✅ PUBLIC : tout le monde peut voir
router.get("/", EventController.getAll);
router.get("/:id", EventController.getById);

// 🔒 PROTÉGÉ : il faut être connecté

router.post("/", authenticate, authorizeRoles(["organizer", "admin"]), EventController.create);
router.put("/:id", authenticate, authorizeRoles(["organizer", "admin"]), EventController.update);
router.delete("/:id", authenticate, authorizeRoles(["admin"]), EventController.delete);


export default router;
