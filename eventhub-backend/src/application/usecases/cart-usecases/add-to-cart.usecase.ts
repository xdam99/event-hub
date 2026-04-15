// usecases/cart-usecases/AddToCartUseCase.ts
import { Cart, CartItem, addItemToCart } from '../../../domain/entities/Cart';
import { ICartRepository } from '../../../infrastructure/repositories/cart.repository';

export interface AddToCartRequest {
    userId: string;
    item: CartItem;
}

export class AddToCartUseCase {
    constructor(private cartRepository: ICartRepository) {}

    async execute(request: AddToCartRequest): Promise<Cart> {
        let currentCart = await this.cartRepository.findByUserId(request.userId);

        if (!currentCart) {
            currentCart = {
                userId: request.userId,
                items: [],
                total: 0
            };
        }

        const updatedCart = addItemToCart(currentCart, request.item);

        await this.cartRepository.save(updatedCart);

        return updatedCart;
    }
}