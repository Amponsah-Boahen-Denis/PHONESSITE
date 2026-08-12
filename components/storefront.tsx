"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  CircleUserRound,
  CreditCard,
  Heart,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import { useCart } from "@/components/cart-context";
import { categories, formatCurrency, products, type Product } from "@/lib/products";

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[#f1b634]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${index < Math.round(rating) ? "fill-current text-[#f1b634]" : "text-zinc-300"}`}
        />
      ))}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("search") ?? "");

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/shop" },
    { label: "Deals", href: "/shop" },
    { label: "New Arrivals", href: "/shop" },
    { label: "Brands", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  const submitSearch = (value: string) => {
    const normalized = value.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (normalized) {
      params.set("search", normalized);
    } else {
      params.delete("search");
    }

    router.push(`/shop?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#f3c85d] text-sm font-bold text-zinc-900">T</span>
          <span className="text-2xl font-bold tracking-tight text-zinc-900">TechStore</span>
        </Link>

        <div className="hidden flex-1 max-w-xl items-center gap-3 lg:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitSearch(query);
              }}
              placeholder="Search products..."
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm text-zinc-700 outline-none transition focus:border-[#f3c85d] focus:bg-white"
            />
          </div>
          <button
            onClick={() => submitSearch(query)}
            className="rounded-full bg-[#f3c85d] px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-[#edb93c]"
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-full border border-zinc-200 p-2.5 text-zinc-700 transition hover:border-[#f3c85d] hover:text-zinc-900 sm:flex" aria-label="Account">
            <CircleUserRound className="h-5 w-5" />
          </button>
          <button className="hidden rounded-full border border-zinc-200 p-2.5 text-zinc-700 transition hover:border-[#f3c85d] hover:text-zinc-900 sm:flex" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </button>
          <Link href="/cart" className="relative flex items-center gap-2 rounded-full border border-zinc-200 p-2.5 text-zinc-700 transition hover:border-[#f3c85d] hover:text-zinc-900" aria-label="Shopping cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f3c85d] px-1 text-[10px] font-semibold text-zinc-900">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="rounded-full border border-zinc-200 p-2.5 text-zinc-700 lg:hidden"
            onClick={() => setMenuOpen((state) => !state)}
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-zinc-200 bg-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-3 text-sm font-medium text-zinc-700">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition ${active ? "text-[#d99b16]" : "hover:text-zinc-900"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-zinc-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    submitSearch(query);
                    setMenuOpen(false);
                  }
                }}
                className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none"
                placeholder="Search products..."
              />
            </div>
            <div className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-md px-2 py-2 hover:bg-zinc-50">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 bg-[#111111] text-zinc-200">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#f3c85d] text-sm font-bold text-zinc-900">T</span>
              <span className="text-2xl font-bold text-white">TechStore</span>
            </div>
            <p className="text-sm leading-6 text-zinc-400">
              Discover premium technology designed to make modern life faster, smarter, and more connected.
            </p>
            <div className="flex gap-2 text-sm text-zinc-300">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">f</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">x</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">in</span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Shop</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="hover:text-[#f3c85d]">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Customer Service</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {[
                "Shipping Policy",
                "Return Policy",
                "Payment Methods",
                "FAQ",
                "Track Order",
              ].map((text) => (
                <li key={text}><a href="#" className="hover:text-[#f3c85d]">{text}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {[
                "About Us",
                "Blog",
                "Careers",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((text) => (
                <li key={text}><a href="#" className="hover:text-[#f3c85d]">{text}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Newsletter</h3>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              Subscribe to get the latest updates and exclusive offers.
            </p>
            <form className="flex gap-2">
              <input type="email" placeholder="Your email" className="w-full rounded-full border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500" />
              <button type="submit" className="rounded-full bg-[#f3c85d] px-4 py-3 text-sm font-semibold text-zinc-900">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
          © 2024 TechStore. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export function BenefitBar() {
  const items = [
    { icon: Truck, label: "Free Shipping", text: "On orders over $100" },
    { icon: ShieldCheck, label: "Secure Payment", text: "Protected checkout" },
    { icon: ArrowRight, label: "Easy Returns", text: "30-day return policy" },
    { icon: Sparkles, label: "24/7 Support", text: "Always here to help" },
  ];

  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 lg:px-6">
      <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map(({ icon: Icon, label, text }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7dc8a]/60 text-[#d99b16]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">{label}</h3>
              <p className="text-xs text-zinc-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoryCard({ category }: { category: { name: string; slug: string; description: string; count: number } }) {
  const image = {
    Laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    Smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    Tablets: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80",
    Accessories: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
    Smartwatches: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
  }[category.name];

  return (
    <Link href={`/category/${category.slug}`} className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="overflow-hidden">
        <img src={image} alt={category.name} className="h-52 w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="space-y-2 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-zinc-900">{category.name}</h3>
          <ArrowRight className="h-4 w-4 text-zinc-400 transition group-hover:text-[#d99b16]" />
        </div>
        <p className="text-sm text-zinc-500">{category.count} products</p>
      </div>
    </Link>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden rounded-xl bg-zinc-100">
        <Link href={`/products/${product.id}`}>
          <img src={product.images[0]} alt={product.name} className="h-52 w-full object-cover transition duration-300 group-hover:scale-105" />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#f3c85d] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-900">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/80 text-zinc-700 shadow-sm backdrop-blur-sm transition hover:text-[#d99b16]"
          aria-label="Add to wishlist"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-[#d99b16]" : ""}`} />
        </button>
      </div>

      <div className="space-y-3 p-2 pt-4">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{product.brand}</p>
        <Link href={`/products/${product.id}`} className="block text-lg font-semibold text-zinc-900 hover:text-[#d99b16]">
          {product.name}
        </Link>

        <div className="flex items-center gap-2">
          <RatingStars rating={product.rating} />
          <span className="text-sm text-zinc-500">({product.reviewCount})</span>
        </div>

        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-zinc-900">{formatCurrency(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-zinc-400 line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f3c85d] px-3 py-2.5 font-medium text-zinc-900 transition hover:bg-[#edb93c]"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export function Button({ children, variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }) {
  const styles = variant === "primary"
    ? "bg-[#f3c85d] text-zinc-900 hover:bg-[#edb93c]"
    : "border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400";

  return (
    <button {...props} className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${styles} ${className}`}>
      {children}
    </button>
  );
}

export function ProductGrid({ productsToRender }: { productsToRender: Product[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {productsToRender.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function FilterSidebar({
  filters,
  setFilters,
  onClear,
}: {
  filters: { category: string; brand: string[]; maxPrice: number; minRating: number };
  setFilters: (update: Partial<{ category: string; brand: string[]; maxPrice: number; minRating: number }>) => void;
  onClear: () => void;
}) {
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  return (
    <aside className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900">Filters</h2>
        <button type="button" onClick={onClear} className="text-sm font-medium text-[#d99b16]">Clear Filters</button>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.slug} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="radio"
                name="category"
                checked={filters.category === category.name}
                onChange={() => setFilters({ category: category.name })}
              />
              <span>{category.name}</span>
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
            <input
              type="radio"
              name="category"
              checked={filters.category === "All"}
              onChange={() => setFilters({ category: "All" })}
            />
            <span>All</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => {
                  const next = filters.brand.includes(brand)
                    ? filters.brand.filter((option) => option !== brand)
                    : [...filters.brand, brand];
                  setFilters({ brand: next });
                }}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">Price</h3>
        <input
          type="range"
          min={0}
          max={2000}
          value={filters.maxPrice}
          onChange={(event) => setFilters({ maxPrice: Number(event.target.value) })}
          className="w-full accent-[#f3c85d]"
        />
        <div className="mt-2 flex justify-between text-xs text-zinc-500">
          <span>$0</span>
          <span>{formatCurrency(filters.maxPrice)}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-600">Rating</h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5].map((rating) => (
            <label key={rating} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => setFilters({ minRating: rating })}
              />
              <span>{rating}+ stars</span>
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === 0}
              onChange={() => setFilters({ minRating: 0 })}
            />
            <span>All ratings</span>
          </label>
        </div>
      </div>
    </aside>
  );
}

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
        <img src={images[selectedIndex]} alt={name} className="h-[420px] w-full object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`overflow-hidden rounded-xl border ${selectedIndex === index ? "border-[#f3c85d]" : "border-zinc-200"}`}
          >
            <img src={image} alt={`${name} preview ${index + 1}`} className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function QuantitySelector({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} className="text-xl text-zinc-700">−</button>
      <span className="min-w-8 text-center text-sm font-semibold text-zinc-900">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} className="text-xl text-zinc-700">+</button>
    </div>
  );
}

export function CartSummaryCard() {
  const { subtotal, shipping, tax, total } = useCart();

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-zinc-900">Cart Summary</h3>
      <div className="space-y-3 text-sm text-zinc-600">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(shipping)}</span></div>
        <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
        <div className="mt-3 flex justify-between border-t border-zinc-200 pt-3 text-base font-semibold text-zinc-900"><span>Total</span><span>{formatCurrency(total)}</span></div>
      </div>
      <Link href="/checkout" className="mt-5 block w-full rounded-full bg-[#f3c85d] px-5 py-3 text-center text-sm font-semibold text-zinc-900 hover:bg-[#edb93c]">
        Proceed to Checkout
      </Link>
    </div>
  );
}

export function getProductMap() {
  return Object.fromEntries(products.map((product) => [product.id, product]));
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#d99b16]">{eyebrow}</p>}
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className="space-y-5">
      {[{ label: "Phone", value: "+1 (800) 555-0199" }, { label: "Email", value: "hello@techstore.com" }, { label: "Address", value: "350 Market Street, San Francisco, CA" }, { label: "Working Hours", value: "Mon - Sat: 9:00 AM - 8:00 PM" }].map((item) => (
        <div key={item.label} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
          <p className="mt-2 text-base font-medium text-zinc-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="mt-6 flex flex-col gap-3 sm:flex-row"
    >
      <input type="email" required placeholder="Email address" className="w-full rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm outline-none" />
      <button type="submit" className="rounded-full bg-[#f3c85d] px-5 py-3 text-sm font-semibold text-zinc-900">Subscribe</button>
      {submitted && <span className="text-sm text-emerald-600">Thanks for subscribing!</span>}
    </form>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export function ProductFeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-3 text-sm text-zinc-600">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f3c85d]" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProductTabs({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const tabs = ["Description", "Specifications", "Reviews", "Shipping & Returns"];
  return (
    <div className="mt-10 border-b border-zinc-200">
      <div className="flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition ${activeTab === tab ? "border-b-2 border-[#f3c85d] text-zinc-900" : "text-zinc-500"}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          {index > 0 && <ChevronDown className="h-3.5 w-3.5 rotate-[-90deg]" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-zinc-900">{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
