import { User } from "../entities/User";

export interface UserRepositoryInterface {
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
}