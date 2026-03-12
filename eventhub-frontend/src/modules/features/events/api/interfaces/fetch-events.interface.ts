import type { EventsModel } from "../../model/events.model";

export interface IFetchEvents {
    findAll(): Promise<EventsModel.Event[]>;
    findById(id: string): Promise<EventsModel.Event | null>;
}