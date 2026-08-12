"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageLayout, CartSummaryCard } from "@/components/storefront";
import { useCart } from "@/components/cart-context";
import { formatCurrency, products } from "@/lib/products";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const items = cartItems
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean) as { product: (typeof products)[number]; quantity: number; selectedColor?: string; selectedStorage?: string }[];

  return (
    <PageLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d99b16]">Shopping bag</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">Your Cart</h1>
          </div>
          <span className="text-sm text-zinc-500">{items.length} items</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center shadow-sm">
                <p className="text-lg font-semibold text-zinc-900">Your cart is empty.</p>
                <Link href="/shop" className="mt-4 inline-block rounded-full bg-[#f3c85d] px-5 py-3 text-sm font-semibold text-zinc-900">Continue shopping</Link>
              </div>
            ) : (
              items.map(({ product, quantity, selectedColor, selectedStorage }) => (
                <div key={`${product.id}-${selectedColor ?? "default"}-${selectedStorage ?? "default"}`} className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                  <img src={product.images[0]} alt={product.name} className="h-28 w-28 rounded-xl object-cover" />

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{product.brand}</p>
                        <Link href={`/products/${product.id}`} className="mt-1 block text-xl font-semibold text-zinc-900 hover:text-[#d99b16]">{product.name}</Link>
                        {(selectedColor || selectedStorage) && (
                          <p className="mt-1 text-sm text-zinc-500">{selectedColor ?? ""}{selectedColor && selectedStorage ? " / " : ""}{selectedStorage ?? ""}</p>
                        )}
                      </div>
                      <button type="button" onClick={() => removeFromCart(product.id)} className="text-zinc-400 hover:text-red-500" aria-label="Remove item">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2">
                        <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 text-zinc-700"><Minus className="h-4 w-4" /></button>
                        <span className="min-w-6 text-center text-sm font-semibold text-zinc-900">{quantity}</span>
                        <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1 text-zinc-700"><Plus className="h-4 w-4" /></button>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-zinc-900">{formatCurrency(product.price * quantity)}</p>
                        <p className="text-sm text-zinc-500">{formatCurrency(product.price)} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>

          <aside>
            <CartSummaryCard />
          </aside>
        </div>
      </main>
    </PageLayout>
  );
}
