// interface/controllers/cartController.ts
import { Request, Response, NextFunction } from 'express';
import { AddToCartUseCase } from '../../application/usecases/cart-usecases/add-to-cart.usecase';
import { CartRepositoryDatabase } from '../../infrastructure/repositories/cart.repository';

// Instanciation des dépendances
const cartRepository = new CartRepositoryDatabase(); 
const addToCartUseCase = new AddToCartUseCase(cartRepository);

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. On récupère l'utilisateur connecté via ton middleware JWT
        const user = (req as any).user; 
        if (!user) {
            return res.status(401).jsonError('N\'est pas autorisé');
        }

        // 2. On extrait les infos du billet depuis le body de la requête
        const { eventId, price, quantity } = req.body;

        // 3. On lance le Use Case !
        const updatedCart = await addToCartUseCase.execute({
            userId: user.id,
            item: { eventId, price, quantity }
        });

        // 4. On renvoie le panier mis à jour au client
        res.status(200).jsonSuccess(updatedCart);
    } catch (error) {
        // On passe l'erreur au middleware de gestion d'erreurs global
        next(error);
    }
};