import axios from "axios";

export interface EventModel {
    id: string;
    title: string;
    description: string | null;
    startDate: string;
    venueId: string;
    capacity: number;
    price: number | null;
    organizerId: string;
    categoryId: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IEventGateway {
    findAll(): Promise<EventModel[]>;
    findById(id: string): Promise<EventModel | null>;
}

const API_BASE = 'http://localhost:3000/api';
export class EventGateway implements IEventGateway {
    async findAll(): Promise<EventModel[]> {
        const response = await axios.get(`${API_BASE}/events`, {
            withCredentials: true
        });
        return response.data.data; 
    }

    async findById(id: string): Promise<EventModel | null> {
        const response = await axios.get(`${API_BASE}/events/${id}`, {
            withCredentials: true
        });
        return response.data.data;
    }
}