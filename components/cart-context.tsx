"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/lib/products";

export type CartEntry = {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
};

type CartContextValue = {
  cartItems: CartEntry[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, color?: string, storage?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  cartCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("techstore-cart");
    const savedWishlist = localStorage.getItem("techstore-wishlist");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("techstore-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("techstore-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1, color?: string, storage?: string) => {
    setCartItems((items) => {
      const existing = items.find(
        (item) => item.productId === product.id && item.selectedColor === color && item.selectedStorage === storage,
      );

      if (existing) {
        return items.map((item) =>
          item.productId === product.id && item.selectedColor === color && item.selectedStorage === storage
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...items, { productId: product.id, quantity, selectedColor: color, selectedStorage: storage }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item,
      ).filter((item) => item.quantity > 0),
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((items) =>
      items.includes(productId) ? items.filter((item) => item !== productId) : [...items, productId],
    );
  };

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const product = productMap[item.productId];
      return product ? sum + product.price * item.quantity : sum;
    }, 0);
  }, [cartItems]);

  const shipping = subtotal > 0 ? 18 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <CartContext.Provider value={{ cartItems, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist, cartCount, subtotal, shipping, tax, total }}>
      {children}
    </CartContext.Provider>
  );
}

const productMap = Object.fromEntries(products.map((product: Product) => [product.id, product]));

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
