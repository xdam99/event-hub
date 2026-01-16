// src/api/routes/eventRoutes.ts
import { Router } from 'express';
import { EventController, login } from '../controllers/event.controller';
import { 
    CreateEventUseCase,
    GetAllEventsUseCase,
    GetEventByIdUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase
} from '../../application/usecases/events/index';
import { EventRepositoryDatabase } from '../../infrastructure/repositories/eventRepositoryDatabase';
import { authenticationMiddleware } from '../middlewares/index';

// ***************** Sans la base de données *****************
// import { InMemoryEventRepository } from '../../infrastructure/repositories/InMemoryEventRepository';
// ***************** Sans la base de données *****************




const router = Router();

// const repository = new InMemoryEventRepository();

const repository = new EventRepositoryDatabase();
const createUseCase = new CreateEventUseCase(repository);
const getAllEventsUseCase = new GetAllEventsUseCase(repository);
const getEventByIdUseCase = new GetEventByIdUseCase(repository);
const updateUseCase = new UpdateEventUseCase(repository);
const deleteUseCase = new DeleteEventUseCase(repository);

const controller = new EventController(
    createUseCase,
    getAllEventsUseCase,
    getEventByIdUseCase,
    updateUseCase,
    deleteUseCase
);

// Routes REST pour les événements
router.post("/login", login)
router.post('/create', authenticationMiddleware, controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', authenticationMiddleware, controller.update);
router.delete('/:id', authenticationMiddleware, controller.delete);


export {router as EventRoute};