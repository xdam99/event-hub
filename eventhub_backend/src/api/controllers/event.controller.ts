import { Request, Response, NextFunction } from 'express';
import { prisma } from "../prisma/client";
import { 
    CreateEventUseCase, 
    CreateEventDTO, 
    GetAllEventsUseCase,
    GetEventByIdUseCase,
    GetEventByIdDTO,
    UpdateEventUseCase,
    DeleteEventUseCase 
} from '../../application/usecases/events/index';
import { generateSignature, isValidPassword } from '../utility/index';
import { LoginInputs } from '../../domain/entities/User';

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const {email, password} = req.body as LoginInputs;

        const user = await prisma.user.findUnique({
            where: {email: email}
        });

        // Pour éviter de donner des infos à par exemple une personne qui voudrait attaquer notre site
        // Si le mail existe déjà dans notre BDD, on va mettre un message d'erreur générique
        if(!user){
            return res.jsonError("Invalid credentials", 401)
        }

        const isPasswordMatch = await isValidPassword(password, user.password, user.salt);

        if(!isPasswordMatch){
            return res.jsonError("Invalid credentials",401)
        }

        // Création du token avec notre fonction
        const token = generateSignature({
            id: user.id,
            fisrtName: user.firstName,
            lastName: user.lastName,
            email: user.email, 
            phone: user.phone,
            role: user.role
        })


        res.jsonSuccess(token)

    } catch (error) {
        next(error);
    }
};

export class EventController {
    constructor(
        private readonly createEventUseCase: CreateEventUseCase,
        private readonly getAllEventsUseCase: GetAllEventsUseCase,
        private readonly getEventByIdUseCase: GetEventByIdUseCase,
        private readonly updateEventUseCase: UpdateEventUseCase,
        private readonly deleteEventUseCase: DeleteEventUseCase
    ) {}

    // POST /api/events
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const dto: CreateEventDTO = req.body;
        const event = await this.createEventUseCase.execute(dto);

        res.jsonSuccess(event, 201);
        
        } catch (error) {
        next(error);
        }
    }

    // GET /api/events
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const events = await this.getAllEventsUseCase.execute();

        if (!events) {
            return res.jsonError('No events found', 404);
        }

        res.jsonSuccess(events, 200);
        } catch (error) {
            next(error);
        }
    }

    // GET /api/events/:id
    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            let id: string;

            if (Array.isArray(req.params.id)) {
                id = req.params.id[0];
            } else if (typeof req.params.id === 'string') {
                id = req.params.id;
            } else {
                return res.jsonError('Invalid id', 400);
            }

            const dto: GetEventByIdDTO = { id };
            const event = await this.getEventByIdUseCase.execute(dto);

            if (!event) {
                return res.jsonError('Event not found', 404);
            }

            res.jsonSuccess(event, 200);
        } catch (error) {
            next(error);
        }
    };

    // PUT /api/events/:id
    update = async(req: Request, res: Response, next: NextFunction) => {
        try {

        const { id } = req.params;
        const updatedEvent = await this.updateEventUseCase.execute({ 
            id,
            ...req.body
        });
        
        if (!updatedEvent) {
            return res.jsonError('Event not found', 404);
        }

        res.jsonSuccess(updatedEvent, 200);
        } catch (error) {
        next(error);
        }
    }

    // DELETE /api/events/:id
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;

            await this.deleteEventUseCase.execute(id);

            res.jsonSuccess('Event deleted successfully', 200);

        } catch (error) {
            next(error);
        }
    }
}
