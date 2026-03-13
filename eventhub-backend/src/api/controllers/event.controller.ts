import { Request, Response, NextFunction } from 'express';
import {
    CreateEventUseCase,
    GetAllEventsUseCase,
    GetEventByIdUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase
} from '../../application/usecases';
import { EventRepositoryDatabase } from '../../infrastructure/repositories/event.repository';

const eventRepository = new EventRepositoryDatabase();
const createEventUseCase = new CreateEventUseCase(eventRepository);
const getAllEventsUseCase = new GetAllEventsUseCase(eventRepository);
const getEventByIdUseCase = new GetEventByIdUseCase(eventRepository);
const updateEventUseCase = new UpdateEventUseCase(eventRepository);
const deleteEventUseCase = new DeleteEventUseCase(eventRepository);

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventData = {
            title: req.body.title,
            description: req.body.description,
            startDate: new Date(req.body.startDate),
            venueId: req.body.venueId,
            capacity: req.body.capacity,
            price: req.body.price,
            organizerId: req.body.organizerId,
            categoryId: req.body.categoryId,
            imageUrl: req.body.imageUrl,
        };

        const event = await createEventUseCase.execute(eventData);
        res.status(201).jsonSuccess(event.props);
    } catch (error) {
        next(error);
    }
};

// export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const events = await getAllEventsUseCase.execute();
//         res.jsonSuccess(events.map(e => e.props));
//     } catch (error) {
//         next(error);
//     }
// };

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Récupération et typage des paramètres de pagination depuis l'URL
        const limit = parseInt(req.query.limit as string) || 10;
        const cursor = req.query.cursor as string | undefined;

        // 2. On passe les paramètres au Use Case
        const result = await getAllEventsUseCase.execute({ limit, cursor });

        // 3. On renvoie les données ET le curseur pour la page suivante
        res.jsonSuccess({
            events: result.events.map(e => e.props),
            nextCursor: result.nextCursor
        });
    } catch (error) {
        next(error);
    }
};


export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const event = await getEventByIdUseCase.execute(id);

        if (!event) {
            return res.status(404).jsonError('Event not found');
        }

        res.jsonSuccess(event.props);
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;

        if (!id) {
            return res.status(400).jsonError('Event ID is required');
        }

        const updateData = {
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
            venueId: req.body.venueId,
            capacity: req.body.capacity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            imageUrl: req.body.imageUrl,
        };

        const event = await updateEventUseCase.execute(id, updateData);
        res.jsonSuccess(event.props);
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        await deleteEventUseCase.execute(id);
        res.jsonSuccess({ message: 'Event deleted successfully' });
    } catch (error) {
        next(error);
    }
};
