import { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { Event } from '../../domain/entities/Event';
import { UpdateEventDTO } from '../../application/usecases/events/index';

export class InMemoryEventRepository implements EventRepositoryInterface {
    private events: Event[] = [];

    async save(event: Event): Promise<Event> {
        this.events.push(event);
        return event;
    }

    async findAll(): Promise<Event[]> {
        return this.events;
    }

    async findById(id: string): Promise<Event | null> {
        return this.events.find(e => (e as any).props.id === id) || null;
    }

    async update(id: string, data: UpdateEventDTO): Promise<Event> {
        const index = this.events.findIndex(e => (e as any).props.id === id);
        if (index === -1) throw new Error('Event not found');

        const oldEvent = this.events[index];
        const updated = new Event({
            ...((oldEvent as any).props),
            ...data                        
        });

        this.events[index] = updated;
        return updated;
    }


    async delete(id: string): Promise<void> {
        this.events = this.events.filter(e => (e as any).props.id !== id);
    }

}