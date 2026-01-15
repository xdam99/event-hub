import { Event } from '../../../domain/entities/Event';
import { EventRepositoryInterface } from '../../../domain/interfaces/EventRepositoryInterface';

export interface CreateEventDTO {
    title: string;
    description: string;
    date: Date;
    venue: string;
    category: string;
    capacity: number;
    price: number;
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
            price: dto.price,
            capacity: dto.capacity,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Sauvegarde
        return this.eventRepository.save(event);
    }
}

