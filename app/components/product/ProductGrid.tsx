import type {MockProduct} from '~/lib/mock-data';
import {ProductCard} from './ProductCard';

type ProductGridProps = {
  products: MockProduct[];
  className?: string;
};

export function ProductGrid({products, className}: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="py-20 text-center text-zinc-400">
        No products found.
      </div>
    );
  }

  return (
    <div
      className={
        className ??
        'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
