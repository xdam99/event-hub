// 🟦 BACK
import bcrypt from "bcrypt";
import mysqlPool from "../db/mysql";
import { IUserService } from "./IUserService";
import { User, UserRole } from "../models/User";
import db from "../db/mysql";

export class UserService implements IUserService {
    async getAll(): Promise<User[]> {
        const [rows]: any = await mysqlPool.query(
        "SELECT id, name, email, role, created_at FROM users"
        );

        return rows.map(
        (r: any) => new User(r.id, r.name, r.email, r.role, "", r.created_at)
        );
    }

    async getById(id: number): Promise<User | null> {
        const [rows]: any = await mysqlPool.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
        );

        if (!rows[0]) return null;
        const r = rows[0];
        return new User(r.id, r.name, r.email, r.role, r.password, r.created_at);
    }

    static async getByEmail(email: string): Promise<User | null> {
        const [rows]: any = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
        );

        if (!rows.length) return null;

        const u = rows[0];

        return new User(
            u.id,
            u.name,
            u.email,
            u.role as UserRole,
            u.password,
            u.created_at
        );
    }

    async create(user: User): Promise<number> {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const [result]: any = await mysqlPool.query(
        `
        INSERT INTO users (name, email, role, password)
        VALUES (?, ?, ?, ?)
        `,
        [user.name, user.email, user.role, hashedPassword]
        );

        return result.insertId;
    }
}
