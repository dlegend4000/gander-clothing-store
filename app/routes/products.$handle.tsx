import type {Route} from './+types/products.$handle';
import {Link} from 'react-router';
import {getProductByHandle, mockProducts} from '~/lib/mock-data';
import {ProductImages} from '~/components/product/ProductImages';
import {ProductForm} from '~/components/product/ProductForm';
import {ProductGrid} from '~/components/product/ProductGrid';
import {Badge, getVariantFromTag} from '~/components/ui/Badge';
import {getTagBadge} from '~/lib/utils';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `${data?.product.title ?? 'Product'} — Gander`}];
};

export function loader({params}: Route.LoaderArgs) {
  const {handle} = params;
  if (!handle) throw new Response('Not found', {status: 404});

  const product = getProductByHandle(handle);
  if (!product) throw new Response(`Product "${handle}" not found`, {status: 404});

  // Related: same collection, excluding current product
  const collectionHandle = product.collections.nodes[0]?.handle;
  const related = mockProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        p.collections.nodes.some((c) => c.handle === collectionHandle),
    )
    .slice(0, 4);

  return {product, related};
}

export default function ProductPage({loaderData}: Route.ComponentProps) {
  const {product, related} = loaderData;
  const badge = getTagBadge(product.tags);
  const badgeVariant = getVariantFromTag(product.tags);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
        <Link to="/" className="hover:text-zinc-700">Home</Link>
        <span>/</span>
        {product.collections.nodes[0] && (
          <>
            <Link
              to={`/collections/${product.collections.nodes[0].handle}`}
              className="hover:text-zinc-700"
            >
              {product.collections.nodes[0].title}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-zinc-700">{product.title}</span>
      </nav>

      {/* Product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Images */}
        <ProductImages images={product.images.nodes} title={product.title} />

        {/* Details */}
        <div className="lg:sticky lg:top-24 self-start space-y-6">
          {badge && <Badge label={badge} variant={badgeVariant} />}
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-widest mb-1">
              {product.collections.nodes[0]?.title}
            </p>
            <h1 className="text-3xl font-semibold text-zinc-900">
              {product.title}
            </h1>
          </div>

          <ProductForm product={product} />

          <div className="border-t border-zinc-100 pt-6">
            <h3 className="text-sm font-medium text-zinc-900 mb-2">About this item</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-semibold mb-8">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
