import { EventRepositoryInterface } from "../../../domain/interfaces/EventRepositoryInterface";
import { Event } from "../../../domain/entities/Event";

export interface GetAllEventsDTO {
    title: string;
    description: string;
    date: Date;
    capacity: number;
    organizer: string;
    venue: string;
    category: string;
    price: number;
}

export class GetAllEventsUseCase {
    constructor(
        private readonly eventRepository: EventRepositoryInterface
    ) {}
    async execute(): Promise<Event[]> {
        return this.eventRepository.findAll();
    }
}