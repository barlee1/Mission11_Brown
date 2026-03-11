import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/cartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (projectId: number) => void;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookId === item.bookId);

      if (existingItem) {
        return prevCart.map((c) =>
          c.bookId === item.bookId
            ? {
                ...c,
                quantity: c.quantity + 1,
                subtotal: (c.quantity + 1) * c.price, // Update subtotal
              }
            : c
        );
      } else {
        return [...prevCart, { ...item, quantity: 1, subtotal: item.price }];
      }
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((c) =>
            c.bookId === bookId
              ? {
                  ...c,
                  quantity: c.quantity - 1,
                  subtotal: (c.quantity - 1) * c.price,
                }
              : c
          )
          .filter((c) => c.quantity > 0) // Remove item if quantity is 0
    );
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
