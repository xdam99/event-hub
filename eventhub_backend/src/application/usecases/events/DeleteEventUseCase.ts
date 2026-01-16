import { EventRepositoryInterface } from "../../../domain/interfaces/EventRepositoryInterface";

export class DeleteEventUseCase {
    constructor(
        private readonly eventRepository: EventRepositoryInterface
    ) {}

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new Error("Event id is required");
        }

        const event = await this.eventRepository.findById(id);

        if (!event) {
            throw new Error("Event not found");
        }

        await this.eventRepository.delete(id);
    }
}
