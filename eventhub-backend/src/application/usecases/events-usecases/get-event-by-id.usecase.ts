import { EventRepositoryInterface } from "../../../domain/interfaces/event-repository.interface";
import { Event } from "../../../domain/entities/Event";

export class GetEventByIdUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) { }

    async execute(eventId: string): Promise<Event | null> {
        if (!eventId) {
            throw new Error('Event ID is required');
        }

        return this.eventRepository.findById(eventId);
    }
}