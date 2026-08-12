import { PageLayout } from "@/components/storefront";

export default function ContactPage() {
  return (
    <PageLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d99b16]">Contact</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">Get In Touch</h1>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Have a question about our products, delivery, or support? We’d love to hear from you.
            </p>

            <div className="mt-8 space-y-4">
              {[
                ["Phone", "+1 (800) 555-0199"],
                ["Email", "hello@techstore.com"],
                ["Address", "350 Market Street, San Francisco, CA"],
                ["Working Hours", "Mon - Sat: 9:00 AM - 8:00 PM"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</p>
                  <p className="mt-2 text-base font-medium text-zinc-900">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Location map"
                className="h-64 w-full object-cover"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900">Send us a message</h2>
            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">Your Name</label>
                  <input type="text" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-[#f3c85d]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">Your Email</label>
                  <input type="email" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-[#f3c85d]" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Subject</label>
                <input type="text" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-[#f3c85d]" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Your Message</label>
                <textarea rows={6} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-[#f3c85d]" />
              </div>

              <button type="submit" className="rounded-full bg-[#f3c85d] px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-[#edb93c]">
                Send Message
              </button>
            </form>
          </section>
        </div>
      </main>
    </PageLayout>
  );
}
