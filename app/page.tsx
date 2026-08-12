import Link from "next/link";
import { ArrowRight, Cpu, Headphones, ShieldCheck, ShoppingBag, Sparkles, Star, Truck } from "lucide-react";
import { BenefitBar, Button, CategoryCard, PageLayout, ProductGrid, SectionHeading } from "@/components/storefront";
import { categories, products } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <PageLayout>
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 lg:px-6">
        <section className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f7efdb] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a6804]">
                <Sparkles className="h-3.5 w-3.5" />
                New season arrivals
              </div>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-bold tracking-[-0.06em] text-zinc-900 sm:text-5xl lg:text-[4rem] lg:leading-[1.05]">
                  Upgrade Your Tech. Elevate Your Life.
                </h1>
                <p className="max-w-lg text-lg text-zinc-600">
                  Discover premium laptops, phones, audio, and accessories built for work, play, and everything in between.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="rounded-full bg-[#f3c85d] px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-[#edb93c]">
                  Shop now
                </Link>
                <Link href="/about" className="rounded-full border border-zinc-300 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400">
                  Learn more
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-2 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-[#f3c85d] text-[#f3c85d]" />
                  <span>4.9 average rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#d99b16]" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[#f5d98b]/40 blur-3xl" />
              <div className="absolute -right-6 bottom-12 h-36 w-36 rounded-full bg-[#f3c85d]/25 blur-3xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-[#fbfaf7] p-5 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
                  alt="Laptop and accessories"
                  className="h-[420px] w-full rounded-[24px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <BenefitBar />

        <section className="mt-16">
          <SectionHeading eyebrow="Categories" title="Shop by category" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </section>

        <section className="mt-20 overflow-hidden rounded-[28px] border border-zinc-200 bg-[#f6d36b] p-6 text-zinc-900 shadow-sm lg:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">Special deals of the week</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">MacBook Air M2</h2>
              <div className="flex items-center gap-3 text-sm font-medium text-zinc-700">
                <span className="rounded-md bg-white/80 px-2 py-1">12d</span>
                <span className="rounded-md bg-white/80 px-2 py-1">03h</span>
                <span className="rounded-md bg-white/80 px-2 py-1">45m</span>
                <span className="rounded-md bg-white/80 px-2 py-1">22s</span>
              </div>
              <div className="flex items-end gap-3 pt-2">
                <span className="text-4xl font-bold">$1,199</span>
                <span className="pb-1 text-lg text-zinc-700 line-through">$1,399</span>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/products/macbook-air-m2" className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
                  Shop the deal
                </Link>
                <Button variant="secondary" className="border-zinc-900 bg-transparent text-zinc-900 hover:border-zinc-900 hover:bg-white/70">
                  Add to cart
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
                alt="MacBook Air"
                className="max-h-[360px] w-full max-w-[560px] rounded-[32px] object-contain"
              />
            </div>
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Featured" title="Explore our latest tech" action={<Link href="/shop" className="text-sm font-semibold text-[#d99b16]">See all products</Link>} />
          <ProductGrid productsToRender={featuredProducts} />
        </section>
      </main>
    </PageLayout>
  );
}
