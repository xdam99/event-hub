import { EventRepositoryInterface } from "../../../domain/interfaces/EventRepositoryInterface";

export interface EventDTO {
    title: string;
    description: string;
    date: Date;
    venue: string;
    category: string;
    price: number;
}

export class GetAllEventsUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) {}
    async execute(dto : EventDTO): Promise<Event[]> {
        this.eventRepository.findAll();
    }
}