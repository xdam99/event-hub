// 🟦 BACK
import mysqlPool from "../db/mysql";
import { Event } from "../models/Event";
import { IEventService } from "./IEventService";

export class EventService implements IEventService {
    async getAll(): Promise<Event[]> {
        const [rows]: any = await mysqlPool.query(`
        SELECT
            e.*,
            v.name AS venue_name,
            c.name AS category_name,
            u.name AS organizer_name
        FROM events e
        JOIN venues v ON e.venue_id = v.id
        JOIN categories c ON e.category_id = c.id
        JOIN users u ON e.organizer_id = u.id
        `);

        return rows.map(
        (r: any) =>
            new Event(
            r.id,
            r.title,
            r.description,
            r.start_date,
            r.end_date,
            r.venue_id,
            r.category_id,
            r.organizer_id,
            r.image_url,
            r.venue_name,
            r.category_name,
            r.organizer_name
            )
        );
    }

    async getById(id: number): Promise<Event | null> {
        const [rows]: any = await mysqlPool.query(
        `
        SELECT
            e.*,
            v.name AS venue_name,
            c.name AS category_name,
            u.name AS organizer_name
        FROM events e
        JOIN venues v ON e.venue_id = v.id
        JOIN categories c ON e.category_id = c.id
        JOIN users u ON e.organizer_id = u.id
        WHERE e.id = ?
        `,
        [id]
    );

    if (!rows[0]) return null;

        const r = rows[0];
        return new Event(
        r.id,
        r.title,
        r.description,
        r.start_date,
        r.end_date,
        r.venue_id,
        r.category_id,
        r.organizer_id,
        r.image_url,
        r.venue_name,
        r.category_name,
        r.organizer_name
        );
    }

    async create(event: Event): Promise<number> {
        const [result]: any = await mysqlPool.query(
        `
        INSERT INTO events
        (title, description, start_date, end_date, venue_id, category_id, organizer_id, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            event.title,
            event.description,
            event.start_date,
            event.end_date,
            event.venue_id,
            event.category_id,
            event.organizer_id,
            event.image_url,
        ]
        );

        return result.insertId;
    }

    async update(id: number, event: Event): Promise<void> {
        await mysqlPool.query(
        `
        UPDATE events SET
            title = ?,
            description = ?,
            start_date = ?,
            end_date = ?,
            venue_id = ?,
            category_id = ?,
            organizer_id = ?,
            image_url = ?
        WHERE id = ?
        `,
        [
            event.title,
            event.description,
            event.start_date,
            event.end_date,
            event.venue_id,
            event.category_id,
            event.organizer_id,
            event.image_url,
            id,
        ]
        );
    }

    async delete(id: number): Promise<void> {
        await mysqlPool.query("DELETE FROM events WHERE id = ?", [id]);
    }
}
