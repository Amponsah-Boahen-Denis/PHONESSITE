"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageLayout, ProductGrid, FilterSidebar, SectionHeading } from "@/components/storefront";
import { formatCurrency, products } from "@/lib/products";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({
    category: "All",
    brand: [] as string[],
    maxPrice: 2000,
    minRating: 0,
  });

  const visibleProducts = useMemo(() => {
    const query = initialSearch.toLowerCase();

    const filtered = products.filter((product) => {
      const matchesQuery = !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesCategory = filters.category === "All" || product.category === filters.category;
      const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand);
      const matchesPrice = product.price <= filters.maxPrice;
      const matchesRating = product.rating >= filters.minRating;

      return matchesQuery && matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });

    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [filters, initialSearch, sortBy]);

  return (
    <PageLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <SectionHeading eyebrow="Shop" title="All Products" action={<span className="text-sm text-zinc-500">{visibleProducts.length} products</span>} />

        <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
          <FilterSidebar
            filters={filters}
            setFilters={(update) => setFilters((current) => ({ ...current, ...update }))}
            onClear={() => setFilters({ category: "All", brand: [], maxPrice: 2000, minRating: 0 })}
          />

          <div>
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
              <div>
                <p className="text-sm text-zinc-500">Showing <span className="font-semibold text-zinc-900">{visibleProducts.length}</span> items</p>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-zinc-600">Sort by</label>
                <select id="sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </div>
            </div>

            <ProductGrid productsToRender={visibleProducts} />
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
