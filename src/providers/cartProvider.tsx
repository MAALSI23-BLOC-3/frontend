import React, { useState, useEffect, createContext, useContext } from "react";
import { Cart } from "../types/Cart";

export interface CartContextType {
  cart: Cart | undefined;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  emptyCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart>({ items: [] });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart && savedCart !== "undefined") {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (id: number) => {
    let tmpCart: Cart;
    if (cart) {
      tmpCart = JSON.parse(JSON.stringify(cart));
    } else {
      tmpCart = { items: [] };
    }
    const existingProduct = tmpCart?.items.find(
      (item) => item.productId === id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      tmpCart.items.push({ productId: id, quantity: 1 });
    }
    setCart(tmpCart);
    localStorage.setItem("cart", JSON.stringify(tmpCart));
  };

  const removeFromCart = (id: number) => {
    const tmpCart: Cart = JSON.parse(JSON.stringify(cart));
    const existingProduct = tmpCart?.items.find(
      (item) => item.productId === id
    );
    if (existingProduct) {
      if (existingProduct.quantity === 1) {
        tmpCart.items = tmpCart.items.filter((item) => item.productId !== id);
      } else {
        existingProduct.quantity -= 1;
      }
      setCart(tmpCart);
      localStorage.setItem("cart", JSON.stringify(tmpCart));
    }
  };

  const emptyCart = () => {
    setCart({ items: [] });
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
