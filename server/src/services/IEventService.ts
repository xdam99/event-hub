import { Event } from "../models/Event";

export interface IEventService {
  getAll(): Promise<Event[]>;
  getById(id: number): Promise<Event | null>;
  create(event: Event): Promise<number>;
  update(id: number, event: Event): Promise<void>;
  delete(id: number): Promise<void>;
}
