import { prisma } from '../../api/prisma/client';
import { EventRepositoryInterface } from '../../domain/interfaces/EventRepositoryInterface';
import { Event } from '../../domain/entities/Event';

export class EventRepositoryDatabase implements EventRepositoryInterface {
    async save(event: Event): Promise<Event> {
        const saved = await prisma.event.create({
            data: {
                title: event.title,
                description: event.description,
                date: event.date,
                capacity: event.capacity,
                price: event.price,
                organizer: event.organizer, // <- OK maintenant
                venue: event.venue,
                category: event.category,
                imageUrl: event.imageUrl || [],
            }
        });

        return new Event({
            title: saved.title,
            description: saved.description,
            date: saved.date,
            capacity: saved.capacity,
            price: saved.price,
            organizer: saved.organizer,
            venue: saved.venue,
            category: saved.category,
            imageUrl: saved.imageUrl,
            createdAt: saved.createdAt,
            updatedAt: saved.updatedAt,
        });
    }

    async findAll(): Promise<Event[]> {
        const events = await prisma.event.findMany();
        return events.map(e => new Event({
            id: e.id,
            title: e.title,
            description: e.description,
            date: e.date,
            capacity: e.capacity,
            price: e.price,
            organizer: e.organizer,
            venue: e.venue,
            category: e.category,
            imageUrl: e.imageUrl,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
        }));
    }

    async findById(id: string): Promise<Event | null> {
        const e = await prisma.event.findUnique({ where: { id } });
        if (!e) return null;
            return new Event({
                title: e.title,
                description: e.description,
                date: e.date,
                capacity: e.capacity,
                price: e.price,
                organizer: e.organizer,
                venue: e.venue,
                category: e.category,
                imageUrl: e.imageUrl,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
            });
        }

    async update(event: Event): Promise<Event> {
        const updated = await prisma.event.update({
            where: { id: event.id },
            data: {
            title: event.title,
            description: event.description,
            date: event.date,
            capacity: event.capacity,
            price: event.price,
            organizer: event.organizer,
            venue: event.venue,
            category: event.category,
            imageUrl: event.imageUrl || [],
            updatedAt: new Date(),
            },
        });

        return new Event({
            title: updated.title,
            description: updated.description,
            date: updated.date,
            capacity: updated.capacity,
            price: updated.price,
            organizer: updated.organizer,
            venue: updated.venue,
            category: updated.category,
            imageUrl: updated.imageUrl,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.event.delete({ where: { id } });
    }

}
