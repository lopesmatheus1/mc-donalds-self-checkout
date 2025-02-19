"use client";
import { Prisma } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }> {
  quantity: number;
}

interface ICartContext {
  cart: CartProduct[];
  addToCart: (item: CartProduct) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<ICartContext>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addToCart = (item: CartProduct) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
