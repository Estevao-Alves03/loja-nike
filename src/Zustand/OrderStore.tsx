import { create } from "zustand";

interface Product {
  id: number;
  cod_product: number;
  name_product: string;
  description: string;
  price: number;
  discount?: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  products?: Product[];
}

interface OrderState {
    orders: Record<number, Order>;
    setOrder: (order: Order | Order[]) => void;
    setOrders: (orders: Order[]) => void;
  }
  
  export const useOrderStore = create<OrderState>((set) => ({
    orders: {},
    setOrder: (order) =>
        set(() => {
          const ordersArray = Array.isArray(order) ? order : [order];
          const newOrders = ordersArray.reduce((acc, o) => {
            acc[o.id] = o;
            return acc;
          }, {} as Record<number, Order>);
      
          return { orders: newOrders }; // sobrescreve completamente
        }),
        
    setOrders: (orders) =>
      set(() => {
        const orderMap: Record<number, Order> = {};
        orders.forEach((order) => {
          orderMap[order.id] = order;
        });
        return { orders: orderMap };
      }),
  }));
  
