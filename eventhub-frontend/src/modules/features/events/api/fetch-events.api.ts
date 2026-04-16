import axios from "axios";
import type { EventsModel } from "../model/events.model";
import type { IEventGateway } from "./interfaces/fetch-events.interface";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export class EventGateway implements IEventGateway {
    async findAll(): Promise<EventsModel.Event[]> {
        try {
            const response = await axios.get(
                `${API_BASE}:3000/events`, {
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
    async findById(id: string): Promise<EventsModel.Event | null> {
        try {
            const response = await axios.get(`${API_BASE}/events/${id}`, {
                withCredentials: true
            });
            return response.data.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                return null;
            }
            console.error(`failed to fetch event ${id}:`, error);
            throw error;
        }
    }
    async findPaginated(cursor: string, limit: number): Promise<EventsModel.PaginatedEvents> {
        try {
            const response = await axios.get(`${API_BASE}/events`, {
                params: { cursor, limit },
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch paginated events:", error);
            throw error;
        }
    }
}
