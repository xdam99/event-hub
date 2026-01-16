import { CreateEventUseCase, CreateEventDTO } from '../../application/usecases/events/index';
import { InMemoryEventRepository } from '../../infrastructure/repositories/InMemoryEventRepository';

describe('CreateEventUseCase', () => {
    let repository: InMemoryEventRepository;
    let useCase: CreateEventUseCase;
    
    const validEventDTO: CreateEventDTO = {
        title: 'Concert de Jazz',
        description: 'Un super concert',
        date: new Date(Date.now() + 86400000), // demain
        venue: 'Salle de Concert',
        category: 'Musique',
        price: 50,
        capacity: 100,
        organizer: 'Damien J'
    };

    beforeEach(() => {
        repository = new InMemoryEventRepository();
        useCase = new CreateEventUseCase(repository);
    });

    it('should create an event successfully', async () => {
        const event = await useCase.execute(validEventDTO);

        expect(event).toBeDefined();
        expect(event.title).toBe(validEventDTO.title);
        expect(event.description).toBe(validEventDTO.description);
        expect(event.capacity).toBe(validEventDTO.capacity);
        expect(event.date).toEqual(validEventDTO.date);
        expect(event.organizer).toBe(validEventDTO.organizer);
    });

    it('should throw an error if title is missing', async () => {
        const dto = { ...validEventDTO, title: '' };
        await expect(useCase.execute(dto)).rejects.toThrow('Le titre est obligatoire');
    });

    it('should throw an error if description is missing', async () => {
        const dto = { ...validEventDTO, description: '' };
        await expect(useCase.execute(dto)).rejects.toThrow('La description est obligatoire');
    });

    it('should throw an error if venue is missing', async () => {
        const dto = { ...validEventDTO, venue: '' };
        await expect(useCase.execute(dto)).rejects.toThrow('Le lieu est obligatoire');
    });

    it('should throw an error if category is missing', async () => {
        const dto = { ...validEventDTO, category: '' };
        await expect(useCase.execute(dto)).rejects.toThrow('La catégorie est obligatoire');
    });

    it('should throw an error if price is missing', async () => {
        const dto = { ...validEventDTO, price: 0 };
        await expect(useCase.execute(dto)).rejects.toThrow('Le prix est obligatoire');
    });

    it('should throw an error if capacity is under 0', async () => {
        const dto = { ...validEventDTO, capacity: -1 };
        await expect(useCase.execute(dto)).rejects.toThrow('La capacité doit être positive');
    });

    it('should throw an error if date is in the past', async () => {
        const dto = { ...validEventDTO, date: new Date(Date.now() - 1000) };
        await expect(useCase.execute(dto)).rejects.toThrow('La date doit être dans le futur');
    });

});
