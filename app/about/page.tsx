import { PageLayout } from "@/components/storefront";

export default function AboutPage() {
  return (
    <PageLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <section className="grid items-center gap-10 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d99b16]">About us</p>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Passionate About Technology. Dedicated To You.</h1>
            <p className="text-lg leading-8 text-zinc-600">
              TechStore brings together the latest gadgets, premium accessories, and practical tech essentials selected to help people work smarter, play harder, and live better.
            </p>
          </div>
          <div className="overflow-hidden rounded-[26px] border border-zinc-200 bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="TechStore team"
              className="h-[430px] w-full object-cover"
            />
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["10K+", "Happy Customers"],
            ["500+", "Products"],
            ["50+", "Top Brands"],
            ["99%", "Satisfaction"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
              <p className="text-4xl font-bold tracking-tight text-zinc-900">{value}</p>
              <p className="mt-2 text-sm text-zinc-600">{label}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900">Why Choose TechStore?</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Quality Products", "Curated devices and accessories from top-performing brands you can trust."],
              ["Best Prices", "Competitive pricing and frequent deals on the latest technology."],
              ["Fast Delivery", "Quick shipping and seamless checkout from order to doorstep."],
              ["Excellent Support", "Our team is ready to help with every step of your tech journey."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7efdb] text-[#d99b16]">
                  <span className="text-lg font-bold">★</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
