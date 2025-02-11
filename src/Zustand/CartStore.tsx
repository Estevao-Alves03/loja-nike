import { create } from "zustand"

type Item = {
    id: string,
    name: string,
    image: string,
    price: string,
    description: string,
    size: string, 
    quantity: number,
}

type CartStore = {
    cart: Item[],
    addToCart: (item: Item) => void
    removeFromCart: (id: string) => void 
    incrementQuantity: (id: string) => void
    decrementQuantity: (id: string) => void
    calculateTotals: () => void
    totalPrice: number
    discount: number
    finalPrice: number
}

export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    totalPrice: 0,
    discount: 0,
    finalPrice: 0,

    addToCart: (item: Item) => 
        set((state) => {
            const existingItem = state.cart.find((cartItem) => cartItem.id === item.id)
            if (existingItem) {
                return {
                    cart: state.cart.map((cartItem) =>
                        cartItem.id === item.id 
                            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                            : cartItem
                    )
                }
            }
            return { cart: [...state.cart, { ...item, quantity: item.quantity || 1 }] }
        }),

    removeFromCart: (id: string) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),

    incrementQuantity: (id: string) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ),
        })),

    decrementQuantity: (id: string) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ),
        })),

    calculateTotals: () => {
        const cart = get().cart;
        const totalPrice = cart.reduce((total: number, product: Item) => total + Number(product.price) * product.quantity, 0);
        const discount = (35 / 100) * totalPrice;
        const finalPrice = totalPrice - discount;

        set({ totalPrice, discount, finalPrice });
    },
}));
