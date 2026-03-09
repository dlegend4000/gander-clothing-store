import {Form} from 'react-router';
import type {Route} from './+types/search';
import {searchProducts} from '~/lib/mock-data';
import {ProductGrid} from '~/components/product/ProductGrid';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Search — Gander'}];
};

export function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const term = url.searchParams.get('q') ?? '';
  const results = term ? searchProducts(term) : [];
  return {term, results};
}

export default function SearchPage({loaderData}: Route.ComponentProps) {
  const {term, results} = loaderData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Search</h1>

      {/* Search input */}
      <Form method="get" className="flex gap-2 mb-12">
        <input
          type="search"
          name="q"
          defaultValue={term}
          placeholder="Search for products…"
          autoFocus
          className="flex-1 border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
        />
        <button
          type="submit"
          className="bg-zinc-900 text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-zinc-700 transition-colors"
        >
          Search
        </button>
      </Form>

      {/* Results */}
      {!term && (
        <p className="text-zinc-400 text-center py-12">
          Start typing to find products.
        </p>
      )}

      {term && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-500">
            No results for <strong>&quot;{term}&quot;</strong>
          </p>
          <p className="text-sm text-zinc-400 mt-2">
            Try different keywords or browse our collections.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <p className="text-sm text-zinc-400 mb-6">
            {results.length} result{results.length !== 1 ? 's' : ''} for{' '}
            <strong className="text-zinc-700">&quot;{term}&quot;</strong>
          </p>
          <ProductGrid products={results} />
        </div>
      )}
    </div>
  );
}
