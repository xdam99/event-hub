import { UpdateEventDTO } from '../../application/usecases/events/index';
import { Event } from '../entities/Event';

export interface EventRepositoryInterface {
    save(event: Event): Promise<Event>;
    findById(id: string): Promise<Event | null>;
    findAll(): Promise<Event[]>;
    update(id: string, data: UpdateEventDTO): Promise<Event>;
    delete(id: string): Promise<void>;
}
