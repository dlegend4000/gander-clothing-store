import type {Route} from './+types/collections._index';
import {mockCollections} from '~/lib/mock-data';
import {CollectionCard} from '~/components/collection/CollectionCard';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Collections — Gander'}];
};

export function loader() {
  return {collections: mockCollections};
}

export default function CollectionsIndex({loaderData}: Route.ComponentProps) {
  const {collections} = loaderData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">All Collections</h1>
        <p className="mt-2 text-zinc-500">Browse everything we carry.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((col) => (
          <CollectionCard key={col.id} collection={col} />
        ))}
      </div>
    </div>
  );
}
