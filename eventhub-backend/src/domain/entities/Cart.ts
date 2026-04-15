export interface CartItem {
    eventId: string;
    price: number;
    quantity: number;
}

export interface Cart {
    userId: string;
    items: CartItem[];
    total: number;
}

export const addItemToCart = (cart: Cart, item: CartItem): Cart => {
    const existingItemIndex = cart.items.findIndex(i => i.eventId === item.eventId);
    let newItems = [...cart.items]; 

    if (existingItemIndex >= 0) {
        const existing = newItems[existingItemIndex];
        newItems[existingItemIndex] = { 
            ...existing, 
            quantity: existing.quantity + item.quantity 
        };
    } else {
        newItems.push(item);
    }

    const newTotal = newItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

    return { ...cart, items: newItems, total: newTotal };
};