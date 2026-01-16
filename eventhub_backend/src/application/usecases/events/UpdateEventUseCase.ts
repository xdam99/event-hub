import { Event } from '../../../domain/entities/Event';
import { EventRepositoryInterface } from '../../../domain/interfaces/EventRepositoryInterface';

export interface UpdateEventDTO {
    id: string;
    title?: string;
    description?: string;
    date?: Date;
    capacity?: number;
    organizer?: string;
    venue?: string;
    category?: string;
    price?: number;
    imageUrl?: string[];
}


export class UpdateEventUseCase {
    constructor(
        private readonly eventRepository: EventRepositoryInterface
    ) {}

    async execute(dto: UpdateEventDTO): Promise<Event> {
        // Je renvoie l'update
        return this.eventRepository.update(dto.id, dto);
    }
}