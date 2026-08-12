import Link from "next/link";
import { PageLayout, ProductGrid, SectionHeading } from "@/components/storefront";
import { categories, categoryMap, getProductsByCategory } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = categoryMap[slug];

  if (!categoryName) {
    notFound();
  }

  const category = categories.find((item) => item.name === categoryName);
  const products = getProductsByCategory(slug);

  return (
    <PageLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-[#f3c85d] p-6 shadow-sm lg:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">Category</p>
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900">{categoryName}</h1>
              <p className="max-w-xl text-lg text-zinc-700">
                {category?.description ?? "Find the perfect laptop for work, gaming, and everything in between."}
              </p>
            </div>
            <div className="overflow-hidden rounded-[26px] bg-white/50 p-4">
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80"
                alt={categoryName}
                className="h-[240px] w-full rounded-[18px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-6 flex flex-wrap gap-3">
            {[
              "All Laptops",
              "Ultrabooks",
              "Gaming Laptops",
              "2-in-1 Laptops",
              "Traditional Laptops",
            ].map((label) => (
              <button key={label} type="button" className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-[#f3c85d] hover:text-zinc-900">
                {label}
              </button>
            ))}
          </div>

          <SectionHeading eyebrow="Products" title={`${categoryName}`} action={<span className="text-sm text-zinc-500">{products.length} items</span>} />
          <ProductGrid productsToRender={products} />
        </div>
      </main>
    </PageLayout>
  );
}
