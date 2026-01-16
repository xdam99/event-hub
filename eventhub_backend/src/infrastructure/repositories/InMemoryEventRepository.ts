import { Event } from '../../domain/entities/Event';
import { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryEventRepository implements EventRepositoryInterface {
  private events: Event[] = [];

  async save(event: Event): Promise<Event> {
    // Genere un ID
    if (!(event as any).props.id) {
      (event as any).props.id = uuidv4();
    }

    this.events.push(event);
    return event;
  }

  async findById(id: string): Promise<Event | null> {
    const event = this.events.find(e => (e as any).props.id === id);
    return event ?? null;
  }

  async findAll(): Promise<Event[]> {
    return this.events;
  }

  async update(event: Event): Promise<Event> {
    const index = this.events.findIndex(e => (e as any).props.id === (event as any).props.id);
    if (index === -1) {
      throw new Error('Event not found');
    }

    this.events[index] = event;
    return event;
  }

  async delete(id: string): Promise<void> {
    const index = this.events.findIndex(e => (e as any).props.id === id);
    if (index === -1) {
      throw new Error('Event not found');
    }

    this.events.splice(index, 1);
  }

  async findByOrganizerId(organizerId: string): Promise<Event[]> {
    return this.events.filter(e => (e as any).props.organizerId === organizerId);
  }

  async findByCategoryId(categoryId: string): Promise<Event[]> {
    return this.events.filter(e => (e as any).props.category === categoryId);
  }

  // Méthodes parce que je veux respecter l'interface
  async findByCategory(category: string): Promise<Event[]> {
    return this.events.filter(e => (e as any).props.category === category);
  }

  async findByDate(date: Date): Promise<Event[]> {
    return this.events.filter(e => (e as any).props.date.toDateString() === date.toDateString());
  }
}
