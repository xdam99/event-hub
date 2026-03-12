import axios from "axios";
import type { EventsModel } from "../model/events.model";
import type { IFetchEvents } from "./interfaces/fetch-events.interface";

export class EventGateway implements IFetchEvents {
    async findAll(): Promise<EventsModel.Event[]> {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/events", {
                    withCredentials: true,
                }
            );

            if(!response.data.success) {
                throw new Error(response.data.error?.message || "Erreur inconnue");
            }

            return response.data.data;
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error("Une erreur inattendue est survenue");
        }
    }
}