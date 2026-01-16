import { Event } from '../../../domain/entities/Event';
import { EventRepositoryInterface } from '../../../domain/interfaces/EventRepositoryInterface';

export interface CreateEventDTO {
    title: string;
    description: string;
    date: Date;
    venue: string;
    organizer: string;
    category: string;
    capacity: number;
    price: number;
    imageUrl?: string[]
}

export class CreateEventUseCase {
    constructor(
        private readonly eventRepository: EventRepositoryInterface
    ) {}

    async execute(dto: CreateEventDTO): Promise<Event> {
        // Création de l'ENTITEEEEEEE Event 
        const event = new Event({
            title: dto.title,
            description: dto.description,
            date: new Date(dto.date),
            venue: dto.venue,
            category: dto.category,
            organizer: dto.organizer,
            price: dto.price,
            capacity: dto.capacity,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Sauvegarde
        return this.eventRepository.save(event);
    }
}

