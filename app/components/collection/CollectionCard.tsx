import {Link} from 'react-router';
import type {MockCollection} from '~/lib/mock-data';

type CollectionCardProps = {
  collection: MockCollection;
};

export function CollectionCard({collection}: CollectionCardProps) {
  return (
    <Link
      to={`/collections/${collection.handle}`}
      className="group relative block overflow-hidden bg-zinc-100 aspect-square"
      prefetch="intent"
    >
      {collection.image ? (
        <img
          src={collection.image.url}
          alt={collection.image.altText}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/600x600/e4e4e7/52525b?text=' +
              encodeURIComponent(collection.title);
          }}
        />
      ) : (
        <div className="w-full h-full bg-zinc-200" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h3 className="text-xl font-semibold tracking-wide">
          {collection.title}
        </h3>
        {collection.description && (
          <p className="mt-1 text-sm text-white/80 max-w-xs">
            {collection.description}
          </p>
        )}
        <span className="mt-3 text-xs tracking-widest uppercase border-b border-white/60 pb-0.5 group-hover:border-white transition-colors">
          Shop now
        </span>
      </div>
    </Link>
  );
}
