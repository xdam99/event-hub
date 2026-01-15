// src/api/routes/eventRoutes.ts
import { Router } from 'express';
import { EventController } from '../controllers/EventController';
import { CreateEventUseCase } from '../../application/usecases/events/index';
import { InMemoryEventRepository } from '../../infrastructure/repositories/InMemoryEventRepository';


const router = Router();

const repository = new InMemoryEventRepository();
const createUseCase = new CreateEventUseCase(repository);

const controller = new EventController(
    createUseCase,
    // getAllUseCase,
    // getByIdUseCase,
    // updateUseCase,
    // deleteUseCase
);

// Routes REST pour les événements
router.post('/events', controller.create);
// router.get('/', );
// router.get('/:id', );
// router.put('/:id', );
// router.delete('/:id',);


export {router as eventRoute};