import { Request, Response, NextFunction } from 'express';
import { prisma } from "../prisma/client";
import { CreateEventUseCase, CreateEventDTO } from '../../application/usecases/events/index';
import { generateSignature, isValidPassword } from '../utility/index';
import { LoginInputs } from '../../domain/entities/User';
// import { GetAllEventsUseCase } from '../../application/usecases/GetAllEventUseCase';
// import { GetEventByIdUseCase } from '../../application/usecases/GetEventByIdUseCase';
// import { UpdateEventUseCase } from '../../application/usecases/UpdateEventUseCase';
// import { DeleteEventUseCase } from '../../application/usecases/DeleteEventUseCase';

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
    // private readonly getAllEventsUseCase: GetAllEventsUseCase,
    // private readonly getEventByIdUseCase: GetEventByIdUseCase,
    // private readonly updateEventUseCase: UpdateEventUseCase,
    // private readonly deleteEventUseCase: DeleteEventUseCase
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
  // async getAll(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const events = await this.getAllEventsUseCase.execute();
  //     res.status(200).json({
  //       success: true,
  //       data: events
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // // GET /api/events/:id
  // async getById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const event = await this.getEventByIdUseCase.execute(id);
  //     if (!event) {
  //       return res.status(404).json({ success: false, message: 'Event not found' });
  //     }
  //     res.status(200).json({ success: true, data: event });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // // PUT /api/events/:id
  // async update(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const dto = req.body;
  //     const updatedEvent = await this.updateEventUseCase.execute(id, dto);
  //     res.status(200).json({
  //       success: true,
  //       message: 'Event updated successfully',
  //       data: updatedEvent
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // // DELETE /api/events/:id
  // async delete(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     await this.deleteEventUseCase.execute(id);
  //     res.status(200).json({
  //       success: true,
  //       message: 'Event deleted successfully'
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
