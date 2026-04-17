// tests/integration/AddToCartUseCase.test.ts
import { AddToCartUseCase } from '../../application/usecases/cart-usecases/add-to-cart.usecase';
import { Cart } from '../../domain/entities/Cart';
import { describe, it, expect, beforeEach } from '@jest/globals';

class InMemoryCartRepository {
    private carts: Map<string, Cart> = new Map();

    async findByUserId(userId: string): Promise<Cart> {
        return this.carts.get(userId) || { userId, items: [], total: 0 };
    }

    async save(cart: Cart): Promise<void> {
        this.carts.set(cart.userId, cart);
    }
}

describe('AddToCartUseCase (Integration)', () => {
    let cartRepository: InMemoryCartRepository;
    let addToCartUseCase: AddToCartUseCase;

    beforeEach(() => {
        cartRepository = new InMemoryCartRepository();
        addToCartUseCase = new AddToCartUseCase(cartRepository); 
    });

    it('devrait récupérer le panier, ajouter le billet d\'événement, et le sauvegarder', async () => {
        const userId = 'user-456';
        const ticketToAdd = { eventId: 'concert-rock', price: 30, quantity: 1 };
        
        await cartRepository.save({
            userId,
            items: [{ eventId: 'expo-art', price: 15, quantity: 2 }],
            total: 30
        });

        await addToCartUseCase.execute({ userId, item: ticketToAdd });

        const savedCart = await cartRepository.findByUserId(userId);
        
        expect(savedCart.items.length).toBe(2);
        expect(savedCart.total).toBe(60);
        
        const concertTicket = savedCart.items.find(i => i.eventId === 'concert-rock');
        expect(concertTicket).toBeDefined();
        expect(concertTicket?.quantity).toBe(1);
    });
});