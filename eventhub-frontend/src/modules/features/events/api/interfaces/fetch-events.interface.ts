import type { EventsModel } from "../../model/events.model";

export interface IEventGateway {
    findAll(): Promise<EventsModel.Event[]>;
    findById(id: string): Promise<EventsModel.Event | null>;
    findPaginated(cursor: string, limit: number): Promise<EventsModel.PaginatedEvents>;
}