import { EventRepositoryInterface } from "../../../domain/interfaces/event-repository.interface";
import { Event } from "../../../domain/entities/Event";

// export class GetAllEventsUseCase {
//     constructor(private readonly eventRepository: EventRepositoryInterface) { }

//     async execute(): Promise<Event[]> {
//         return this.eventRepository.findAll();
//     }
// }

export interface GetAllEventsRequest {
    limit: number;
    cursor?: string;
}

export interface GetAllEventsResponse {
    events: Event[];
    nextCursor: string | null;
}

export class GetAllEventsUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) { }

    async execute(request: GetAllEventsRequest): Promise<GetAllEventsResponse> {
        const events = await this.eventRepository.findAll(request.limit, request.cursor);

        let nextCursor: string | null = null;
        if (events.length === request.limit) {
            const lastEvent = events[events.length - 1];
            nextCursor = lastEvent.props.id; 
        }

        return {
            events,
            nextCursor
        };
    }
}