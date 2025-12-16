// 🟦 BACK
import { Request, Response } from "express";
import { IEventService } from "../services/IEventService";
import { EventService } from "../services/event.service";
import { Event } from "../models/Event";

const eventService: IEventService = new EventService();

export class EventController {
    static async getAll(req: Request, res: Response) {
        res.json(await eventService.getAll());
    }

    static async getById(req: Request, res: Response) {
        const event = await eventService.getById(Number(req.params.id));
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.json(event);
    }

    static async create(req: Request, res: Response) {
        const event = new Event(
        null,
        req.body.title,
        req.body.description,
        req.body.start_date,
        req.body.end_date,
        req.body.venue_id,
        req.body.category_id,
        req.body.organizer_id,
        req.body.image_url ?? null
        );

        const id = await eventService.create(event);
        res.status(201).json({ id });
    }

    static async update(req: Request, res: Response) {
        const event = new Event(
        Number(req.params.id),
        req.body.title,
        req.body.description,
        req.body.start_date,
        req.body.end_date,
        req.body.venue_id,
        req.body.category_id,
        req.body.organizer_id,
        req.body.image_url ?? null
        );

        await eventService.update(Number(req.params.id), event);
        res.json({ success: true });
    }

    static async delete(req: Request, res: Response) {
        await eventService.delete(Number(req.params.id));
        res.json({ success: true });
    }
}
