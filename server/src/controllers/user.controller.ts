// 🟦 BACK
import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../models/User";

const userService = new UserService();

export class UserController {

  // GET /users
  static async getAll(req: Request, res: Response) {
    const users = await userService.getAll();
    res.json(users);
  }

  // GET /users/:id
  static async getById(req: Request, res: Response) {
    const user = await userService.getById(Number(req.params.id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  }

  // POST /users
  static async create(req: Request, res: Response) {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (!["admin", "organizer", "participant"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = new User(
      null,
      name,
      email,
      role,
      password
    );

    const id = await userService.create(user);
    res.status(201).json({ id });
  }
}
