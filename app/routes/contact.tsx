import {useState} from 'react';
import type {Route} from './+types/contact';
import {Button} from '~/components/ui/Button';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Contact — Gander'}];
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase text-zinc-400 mb-3">
          Get in touch
        </p>
        <h1 className="text-4xl font-semibold">Contact Us</h1>
        <p className="mt-4 text-zinc-500 leading-relaxed">
          Questions about sizing, an order, or anything else? We typically
          respond within one business day.
        </p>
      </div>

      {submitted ? (
        <div className="bg-zinc-50 border border-zinc-200 p-8 text-center">
          <div className="text-4xl mb-4">✉️</div>
          <h3 className="text-lg font-semibold mb-2">Message received!</h3>
          <p className="text-zinc-500 text-sm">
            Thanks for reaching out. We&apos;ll be in touch within one business
            day.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                First name
              </label>
              <input
                type="text"
                required
                className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Last name
              </label>
              <input
                type="text"
                className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Subject
            </label>
            <select className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 bg-white">
              <option value="">Select a topic…</option>
              <option value="order">My Order</option>
              <option value="return">Return / Exchange</option>
              <option value="sizing">Sizing Help</option>
              <option value="product">Product Question</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Message
            </label>
            <textarea
              required
              rows={5}
              className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 resize-none"
              placeholder="How can we help?"
            />
          </div>

          <Button type="submit" size="lg" fullWidth>
            Send Message
          </Button>
        </form>
      )}

      {/* Direct contact */}
      <div className="mt-12 pt-8 border-t border-zinc-100 grid grid-cols-2 gap-6 text-sm text-zinc-500">
        <div>
          <p className="font-medium text-zinc-900 mb-1">Email</p>
          <p>hello@gander.store</p>
        </div>
        <div>
          <p className="font-medium text-zinc-900 mb-1">Response time</p>
          <p>Within 1 business day</p>
        </div>
      </div>
    </div>
  );
}
