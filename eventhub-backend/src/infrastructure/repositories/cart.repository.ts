import { PrismaClient } from '@prisma/client';
import { Cart } from '../../domain/entities/Cart';

// Idéalement, tu importes une instance de Prisma partagée dans ton projet
const prisma = new PrismaClient(); 

export interface ICartRepository {
    findByUserId(userId: string): Promise<Cart | null>;
    save(cart: Cart): Promise<void>;
}

export class CartRepositoryDatabase implements ICartRepository {
    
    async findByUserId(userId: string): Promise<Cart | null> {
        const cartRecord = await prisma.cart.findUnique({
            where: { userId },
            include: { items: true }
        });

        if (!cartRecord) return null;

        return {
            userId: cartRecord.userId,
            total: cartRecord.total,
            items: cartRecord.items.map(item => ({
                eventId: item.eventId,
                price: item.price,
                quantity: item.quantity
            }))
        };
    }

    async save(cart: Cart): Promise<void> {
        await prisma.cart.upsert({
            where: { userId: cart.userId },
            create: {
                userId: cart.userId,
                total: cart.total,
                items: {
                    create: cart.items.map(item => ({
                        eventId: item.eventId,
                        price: item.price,
                        quantity: item.quantity
                    }))
                }
            },
            update: {
                total: cart.total,
                // L'astuce ici : notre Domaine a déjà calculé la liste exacte des items.
                // On vide donc les anciens items en base et on insère la nouvelle liste propre.
                items: {
                    deleteMany: {}, 
                    create: cart.items.map(item => ({
                        eventId: item.eventId,
                        price: item.price,
                        quantity: item.quantity
                    }))
                }
            }
        });
    }
}