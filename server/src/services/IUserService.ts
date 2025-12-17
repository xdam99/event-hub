import { User } from "../models/User";

export interface IUserService {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | null>;
  create(user: User): Promise<number>;
}
