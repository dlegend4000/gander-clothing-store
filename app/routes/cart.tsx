import type {Route} from './+types/cart';
import {Link} from 'react-router';
import {CartEmpty} from '~/components/cart/CartEmpty';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Your Bag — Gander'}];
};

export function loader() {
  // Phase 1: UI only. Phase 2: return context.cart.get()
  return {cartItems: []};
}

export default function CartPage({loaderData}: Route.ComponentProps) {
  const {cartItems} = loaderData;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-semibold">Your Bag</h1>
        <Link
          to="/collections"
          className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          ← Continue shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        // Phase 2: render cart line items here
        <CartEmpty />
      )}
    </div>
  );
}
