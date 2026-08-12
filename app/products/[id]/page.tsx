"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { PageLayout, ProductFeatureList, ProductGallery, ProductTabs, RatingStars, QuantitySelector, Button } from "@/components/storefront";
import { useCart } from "@/components/cart-context";
import { formatCurrency, getProductById } from "@/lib/products";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? "");
  const [selectedStorage, setSelectedStorage] = useState(product?.storageOptions[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");

  if (!product) {
    notFound();
  }

  const tabContent = useMemo(() => {
    if (activeTab === "Description") {
      return <p className="text-base leading-7 text-zinc-600">{product.description}</p>;
    }
    if (activeTab === "Specifications") {
      return (
        <div className="grid gap-3 text-sm text-zinc-600 sm:grid-cols-2">
          {product.features.map((feature) => (
            <div key={feature} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">{feature}</div>
          ))}
        </div>
      );
    }
    if (activeTab === "Reviews") {
      return (
        <div className="space-y-4 text-zinc-600">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center gap-2"><RatingStars rating={product.rating} /><span className="font-semibold text-zinc-900">{product.rating} / 5</span></div>
            <p>Based on {product.reviewCount} reviews from verified customers.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-3 text-sm text-zinc-600">
        <p>Free 30-day returns on all eligible items.</p>
        <p>Standard shipping: 3-5 business days.</p>
        <p>Need help? Contact our customer support team at any time.</p>
      </div>
    );
  }, [activeTab, product]);

  return (
    <PageLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-900">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-zinc-900">Shop</Link>
          <span>/</span>
          <span className="text-zinc-900">{product.name}</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{product.brand}</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">{product.name}</h1>
            </div>

            <div className="flex items-center gap-3">
              <RatingStars rating={product.rating} />
              <span className="text-sm text-zinc-600">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-zinc-900">{formatCurrency(product.price)}</span>
              <span className="pb-1 text-lg text-zinc-500 line-through">{formatCurrency(product.originalPrice)}</span>
              <span className="mb-2 rounded-full bg-[#f7efdb] px-2.5 py-1 text-xs font-semibold text-[#9a6804]">Save {product.discount}%</span>
            </div>

            <p className="text-base leading-7 text-zinc-600">{product.description}</p>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">Storage</p>
                <div className="flex flex-wrap gap-2">
                  {product.storageOptions.map((option) => (
                    <button key={option} type="button" onClick={() => setSelectedStorage(option)} className={`rounded-full border px-4 py-2 text-sm font-medium ${selectedStorage === option ? "border-[#f3c85d] bg-[#f7efdb] text-zinc-900" : "border-zinc-200 bg-white text-zinc-700"}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">Color</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button key={color} type="button" onClick={() => setSelectedColor(color)} className={`rounded-full border px-4 py-2 text-sm font-medium ${selectedColor === color ? "border-[#f3c85d] bg-[#f7efdb] text-zinc-900" : "border-zinc-200 bg-white text-zinc-700"}`}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <Button onClick={() => addToCart(product, quantity, selectedColor, selectedStorage)} className="flex-1 px-8 py-3.5">Add to Cart</Button>
              <Button variant="secondary" className="px-8 py-3.5">Buy Now</Button>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <ProductFeatureList features={product.features} />
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="pt-6">{tabContent}</div>
        </section>
      </main>
    </PageLayout>
  );
}
