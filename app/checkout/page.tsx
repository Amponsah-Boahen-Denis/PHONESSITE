"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { PageLayout } from "@/components/storefront";
import { products, formatCurrency } from "@/lib/products";

export default function CheckoutPage() {
  const { cartItems, subtotal, shipping, tax, total } = useCart();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    sameAsBilling: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const items = cartItems
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean) as { product: (typeof products)[number]; quantity: number }[];

  const handleChange = (field: string, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    ["firstName", "lastName", "email", "phone", "address", "city", "state", "zip"].forEach((field) => {
      const value = form[field as keyof typeof form];
      if (!String(value).trim()) nextErrors[field] = "This field is required";
    });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      alert("Order placed successfully");
    }
  };

  return (
    <PageLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-8 flex items-center justify-center gap-4 text-sm text-zinc-500">
          {[
            "Cart",
            "Checkout",
            "Payment",
            "Complete",
          ].map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${index === 1 ? "bg-[#f3c85d] text-zinc-900" : "bg-zinc-200 text-zinc-700"}`}>
                {index + 1}
              </span>
              {index < 3 && <span className="hidden sm:inline">{step}</span>}
              {index < 3 && <span className="hidden h-px w-8 bg-zinc-200 sm:block" />}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Billing Details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["firstName", "First Name"],
                  ["lastName", "Last Name"],
                  ["email", "Email"],
                  ["phone", "Phone Number"],
                ].map(([field, label]) => (
                  <div key={field} className={field === "email" || field === "phone" ? "sm:col-span-2" : ""}>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">{label}</label>
                    <input
                      value={form[field as keyof typeof form] as string}
                      onChange={(event) => handleChange(field, event.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-[#f3c85d]"
                    />
                    {errors[field] && <p className="mt-1 text-xs text-red-500">{errors[field]}</p>}
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-zinc-700">Address</label>
                  <input value={form.address} onChange={(event) => handleChange("address", event.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-[#f3c85d]" />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">City</label>
                  <input value={form.city} onChange={(event) => handleChange("city", event.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-[#f3c85d]" />
                  {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">State</label>
                  <input value={form.state} onChange={(event) => handleChange("state", event.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-[#f3c85d]" />
                  {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">ZIP / Postal Code</label>
                  <input value={form.zip} onChange={(event) => handleChange("zip", event.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-[#f3c85d]" />
                  {errors.zip && <p className="mt-1 text-xs text-red-500">{errors.zip}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">Country</label>
                  <select value={form.country} onChange={(event) => handleChange("country", event.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-[#f3c85d]">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              <label className="mt-6 flex items-center gap-2 text-sm text-zinc-700">
                <input type="checkbox" checked={form.sameAsBilling} onChange={(event) => handleChange("sameAsBilling", event.target.checked)} />
                Billing address is the same as shipping address
              </label>
            </div>

            <button type="submit" className="w-full rounded-full bg-[#f3c85d] px-5 py-3.5 text-sm font-semibold text-zinc-900 hover:bg-[#edb93c]">
              Continue to Payment
            </button>
          </form>

          <aside className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900">Order Summary</h2>
            <div className="mt-5 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  <img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900">{product.name}</p>
                    <p className="text-xs text-zinc-500">Qty: {quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900">{formatCurrency(product.price * quantity)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-zinc-200 pt-4 text-sm text-zinc-600">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(shipping)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
              <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-semibold text-zinc-900"><span>Total</span><span>{formatCurrency(total)}</span></div>
            </div>

            <div className="mt-6 flex gap-2">
              {['Visa', 'PayPal', 'Apple Pay'].map((label) => (
                <div key={label} className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-2 text-center text-xs font-medium text-zinc-700">
                  {label}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </PageLayout>
  );
}
