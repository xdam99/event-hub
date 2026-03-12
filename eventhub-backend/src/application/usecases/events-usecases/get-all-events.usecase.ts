import { EventRepositoryInterface } from "../../../domain/interfaces/event-repository.interface";
import { Event } from "../../../domain/entities/Event";

export class GetAllEventsUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) { }

    async execute(): Promise<Event[]> {
        return this.eventRepository.findAll();
    }
}