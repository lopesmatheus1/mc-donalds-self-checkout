"use client";
import { Prisma } from "@prisma/client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          avatarImageUrl: true;
          name: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  cartProducts: CartProduct[];
  addProductsToCart: (item: CartProduct) => void;
  removeFromCart: (id: string) => void;
  increaseQuantityToProduct: (id: string) => void;
  decreaseQuantityToProduct: (id: string) => void;
  total: number;
  toggleCart: () => void;
  cartIsOpen: boolean;
  totalProductQuantity: number;
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

export const CartContext = createContext<ICartContext>({
  cartProducts: [],
  total: 0,
  addProductsToCart: () => {},
  removeFromCart: () => {},
  increaseQuantityToProduct: () => {},
  decreaseQuantityToProduct: () => {},
  toggleCart: () => {},
  cartIsOpen: false,
  totalProductQuantity: 0,
  setCartProducts: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  useEffect(() => {
    if (cartProducts.length === 0) {
      setCartIsOpen(false);
    }
  }, [cartProducts]);

  const toggleCart = () => {
    setCartIsOpen(!cartIsOpen);
  };

  const total = useMemo(() => {
    return cartProducts.reduce((acc, cartProduct) => {
      return acc + cartProduct.price * cartProduct.quantity;
    }, 0);
  }, [cartProducts]);

  const totalProductQuantity = useMemo(() => {
    return cartProducts.reduce((acc, cartProducts) => {
      return acc + cartProducts.quantity;
    }, 0);
  }, [cartProducts]);

  const addProductsToCart = (product: CartProduct) => {
    const productIsAlreadyInCart = cartProducts.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyInCart) {
      return setCartProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
    }
    return setCartProducts((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id: string) => {
    setCartProducts((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantityToProduct = (id: string) => {
    setCartProducts((prevCart) =>
      prevCart.map((cartProduct) => {
        if (cartProduct.id === id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const decreaseQuantityToProduct = (id: string) => {
    const product = cartProducts.find((cartProduct) => cartProduct.id === id);
    if (product?.quantity === 1) return;
    setCartProducts((prevCart) =>
      prevCart.map((cartProduct) => {
        if (cartProduct.id === id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        cartIsOpen,
        totalProductQuantity,
        setCartProducts,
        addProductsToCart,
        removeFromCart,
        decreaseQuantityToProduct,
        increaseQuantityToProduct,
        toggleCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
