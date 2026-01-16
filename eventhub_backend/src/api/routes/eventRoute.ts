// src/api/routes/eventRoutes.ts
import { Router } from 'express';
import { EventController, login } from '../controllers/event.controller';
import { 
    CreateEventUseCase,
    GetAllEventsUseCase,
    GetEventByIdUseCase
} from '../../application/usecases/events/index';
// import { InMemoryEventRepository } from '../../infrastructure/repositories/InMemoryEventRepository';
import { authenticationMiddleware } from '../middlewares/index';
import { EventRepositoryDatabase } from '../../infrastructure/repositories/eventRepositoryDatabase';


const router = Router();

// const repository = new InMemoryEventRepository();

const repository = new EventRepositoryDatabase();
const createUseCase = new CreateEventUseCase(repository);
const getAllEventsUseCase = new GetAllEventsUseCase(repository);
const getEventByIdUseCase = new GetEventByIdUseCase(repository);
// const updateUseCase = new UpdateEventUseCase(repository);
// const deleteUseCase = new DeleteEventUseCase(repository);

const controller = new EventController(
    createUseCase,
    getAllEventsUseCase,
    getEventByIdUseCase
    // updateUseCase,
    // deleteUseCase
);

// Routes REST pour les événements
router.post("/login", login)
router.post('/create', authenticationMiddleware, controller.create);
router.get('/', authenticationMiddleware, controller.getAll);
router.get('/:id', authenticationMiddleware, controller.getById);
// router.put('/:id', );
// router.delete('/:id',);


export {router as EventRoute};