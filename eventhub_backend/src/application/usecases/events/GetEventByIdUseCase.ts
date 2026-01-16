import { EventRepositoryInterface } from "../../../domain/interfaces/EventRepositoryInterface";
import { Event } from "../../../domain/entities/Event";

export interface GetEventByIdDTO {
    id: string;
}

export class GetEventByIdUseCase {
    constructor(
        private readonly eventRepository: EventRepositoryInterface
    ) {}

    async execute(dto: GetEventByIdDTO): Promise<Event | null> {
        return this.eventRepository.findById(dto.id);
    }
}
