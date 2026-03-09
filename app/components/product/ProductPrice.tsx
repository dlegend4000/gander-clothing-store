import {formatPrice} from '~/lib/utils';
import type {MockProduct} from '~/lib/mock-data';

type ProductPriceProps = {
  product: Pick<MockProduct, 'priceRange' | 'compareAtPriceRange'>;
  variant?: MockProduct['variants']['nodes'][number] | null;
  className?: string;
};

export function ProductPrice({product, variant, className}: ProductPriceProps) {
  const price = variant
    ? variant.price
    : product.priceRange.minVariantPrice;

  const compareAtPrice = variant
    ? variant.compareAtPrice
    : product.compareAtPriceRange?.minVariantPrice;

  const isOnSale =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  return (
    <div className={className}>
      {isOnSale ? (
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-semibold">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <span className="text-zinc-400 line-through text-sm">
            {formatPrice(compareAtPrice!.amount, compareAtPrice!.currencyCode)}
          </span>
        </div>
      ) : (
        <span className="font-semibold">
          {formatPrice(price.amount, price.currencyCode)}
        </span>
      )}
    </div>
  );
}
