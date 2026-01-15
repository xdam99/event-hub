// src/api/routes/eventRoutes.ts
import { Router } from 'express';
import { EventController, login } from '../controllers/event.controller';
import { CreateEventUseCase, GetAllEventsUseCase } from '../../application/usecases/events/index';
import { InMemoryEventRepository } from '../../infrastructure/repositories/InMemoryEventRepository';
import { authenticationMiddleware } from '../middlewares/index';


const router = Router();

const repository = new InMemoryEventRepository();
const createUseCase = new CreateEventUseCase(repository);

const controller = new EventController(
    createUseCase,
    // GetAllEventsUseCase,
    // getByIdUseCase,
    // updateUseCase,
    // deleteUseCase
);

// Routes REST pour les événements
router.post("/login", login)
router.post('/create', authenticationMiddleware, controller.create);
// router.get('/', );
// router.get('/:id', );
// router.put('/:id', );
// router.delete('/:id',);


export {router as EventRoute};