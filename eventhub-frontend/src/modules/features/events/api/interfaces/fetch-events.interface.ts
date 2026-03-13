import type { EventsModel } from "../../model/events.model";

export interface IEventGateway {
    findAll(): Promise<EventsModel.Event[]>;
    findById(id: string): Promise<EventsModel.Event | null>;
    findPaginated(page: number, limit: number): Promise<EventsModel.PaginatedEvents>;
}