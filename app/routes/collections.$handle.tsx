import {redirect} from 'react-router';
import type {Route} from './+types/collections.$handle';
import {getCollectionByHandle} from '~/lib/mock-data';
import {ProductGrid} from '~/components/product/ProductGrid';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `${data?.collection.title ?? 'Collection'} — Gander`}];
};

export function loader({params}: Route.LoaderArgs) {
  const {handle} = params;
  if (!handle) throw redirect('/collections');

  const collection = getCollectionByHandle(handle);
  if (!collection) {
    throw new Response(`Collection "${handle}" not found`, {status: 404});
  }

  return {collection};
}

export default function CollectionPage({loaderData}: Route.ComponentProps) {
  const {collection} = loaderData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">{collection.title}</h1>
        {collection.description && (
          <p className="mt-2 text-zinc-500 max-w-lg">{collection.description}</p>
        )}
      </div>

      {/* Count */}
      <p className="text-sm text-zinc-400 mb-6">
        {collection.products.nodes.length} products
      </p>

      {/* Grid */}
      <ProductGrid products={collection.products.nodes} />
    </div>
  );
}
