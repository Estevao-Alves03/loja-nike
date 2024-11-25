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
}

export const useCartStore = create<CartStore>((set) => {
    return{
        cart: [],

        addToCart: (item : Item) => 
            set((state) => {
                const existingItem = state.cart.find((cartItem) => cartItem.id === item.id)
                if(existingItem) {
                    return{
                        cart: state.cart.map((cartItem) => 
                            cartItem.id === item.id 
                        ? {...cartItem, quantity: cartItem.quantity + item.quantity}
                        : cartItem
                        )
                    }
                }
                return{cart: [...state.cart, {...item, quantity: item.quantity || 1 }]}
            }),
            
            removeFromCart: (id) => 
                set((state) => ({cart: state.cart.filter((item) => item.id !== id)})),

            incrementQuantity: (id) => 
                set((state) => ({
                    cart: state.cart.map((item) => 
                        item.id === id 
                    ? {...item, quantity: item.quantity + 1}
                    : item
                    ),
                })),

            decrementQuantity: (id) => 
                set((state) => ({
                    cart: state.cart.map((item) => 
                    item.id === id && item.quantity > 1
                    ? {...item, quantity: item.quantity -1 }
                    : item
                    )
                }))
    }
})