// tests/unit/Cart.test.ts
import { addItemToCart, Cart, CartItem } from '../../domain/entities/Cart';
import { describe, it, expect } from '@jest/globals';

describe('Cart Domain Logic (Pure Functions)', () => {
    it('devrait ajouter un nouvel événement dans un panier vide et calculer le total', () => {
        const initialCart: Cart = { userId: 'user-123', items: [], total: 0 };
        const ticket: CartItem = { eventId: 'event-fest-1', price: 50, quantity: 2 };

        const updatedCart = addItemToCart(initialCart, ticket);

        expect(updatedCart.items.length).toBe(1);
        expect(updatedCart.items[0].eventId).toBe('event-fest-1');
        expect(updatedCart.total).toBe(100); // 50 * 2
        
        expect(initialCart.items.length).toBe(0);
    });

    it('devrait mettre à jour la quantité si l\'événement est déjà dans le panier', () => {
        const initialCart: Cart = { 
            userId: 'user-123', 
            items: [{ eventId: 'event-fest-1', price: 50, quantity: 1 }], 
            total: 50 
        };
        const ticket: CartItem = { eventId: 'event-fest-1', price: 50, quantity: 3 };

        const updatedCart = addItemToCart(initialCart, ticket);

        expect(updatedCart.items.length).toBe(1);
        expect(updatedCart.items[0].quantity).toBe(4);
        expect(updatedCart.total).toBe(200);
    });
});