import {Link} from 'react-router';
import type {MockProduct} from '~/lib/mock-data';
import {Badge, getVariantFromTag} from '~/components/ui/Badge';
import {ProductPrice} from '~/components/product/ProductPrice';
import {getTagBadge} from '~/lib/utils';

type ProductCardProps = {
  product: MockProduct;
};

export function ProductCard({product}: ProductCardProps) {
  const badge = getTagBadge(product.tags);
  const badgeVariant = getVariantFromTag(product.tags);

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group block"
      prefetch="intent"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-100 aspect-[3/4]">
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge label={badge} variant={badgeVariant} />
          </div>
        )}
        <img
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/400x533/f4f4f5/71717a?text=' +
              encodeURIComponent(product.title);
          }}
        />
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="text-xs text-zinc-400 uppercase tracking-widest">
          {product.collections.nodes[0]?.title ?? ''}
        </p>
        <h3 className="text-sm font-medium text-zinc-900 group-hover:underline underline-offset-2">
          {product.title}
        </h3>
        <ProductPrice product={product} />
      </div>
    </Link>
  );
}
