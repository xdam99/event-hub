import 'dotenv/config';
import { EventRepositoryInterface } from '../../domain/interfaces/event-repository.interface';
import { Event, EventProps } from '../../domain/entities/Event';
import { prisma } from '../database/db';
export class EventRepositoryDatabase implements EventRepositoryInterface {

    async create(event: Event): Promise<Event> {
        const created = await prisma.event.create({
            data: {
                id: event.id,
                title: event.title,
                description: event.description,
                startDate: event.startDate,
                venueId: event.venueId,
                capacity: event.capacity,
                price: event.price,
                organizerId: event.organizerId,
                categoryId: event.categoryId,
                imageUrl: event.imageUrl,
            },
        });

        return new Event(created as EventProps);
    }

    async findAll(limit: number, cursor?: string): Promise<Event[]> {
        const queryArgs: Parameters<typeof prisma.event.findMany>[0] = {
            take: limit,
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            orderBy: { startDate: 'asc' },
        };

        const events = await prisma.event.findMany(queryArgs);
        return events.map((e) => new Event(e as EventProps));



        // const events = await prisma.event.findMany({
        //     take: limit,
        //     skip: cursor ? 1 : 0,
        //     ...(cursor && { cursor: { id: cursor } }),
        //     orderby: { startDate: 'asc' },
        // });
        // return events.map((e) => new Event(e as EventProps));
    }

    async findById(id: string): Promise<Event | null> {
        const event = await prisma.event.findUnique({
            where: { id },
        });

        if (!event) return null;
        return new Event(event as EventProps);
    }

    async delete(id: string): Promise<void> {
        await prisma.event.delete({
            where: { id },
        });
    }

    async update(id: string, event: Event): Promise<Event> {
        const updated = await prisma.event.update({
            where: { id },
            data: {
                title: event.title,
                description: event.description,
                startDate: event.startDate,
                venueId: event.venueId,
                capacity: event.capacity,
                price: event.price,
                organizerId: event.organizerId,
                categoryId: event.categoryId,
                imageUrl: event.imageUrl,
            },
        });

        return new Event(updated as EventProps);
    }
}
