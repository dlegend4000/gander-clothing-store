import {useState} from 'react';
import type {MockProduct} from '~/lib/mock-data';

type ProductImagesProps = {
  images: MockProduct['images']['nodes'];
  title: string;
};

export function ProductImages({images, title}: ProductImagesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src =
      'https://placehold.co/600x750/f4f4f5/71717a?text=' +
      encodeURIComponent(title);
  };

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-[4/5] bg-zinc-100 overflow-hidden">
        <img
          src={activeImage?.url}
          alt={activeImage?.altText ?? title}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-20 h-20 bg-zinc-100 overflow-hidden border-2 transition-colors ${
                activeIndex === i ? 'border-zinc-900' : 'border-transparent'
              }`}
            >
              <img
                src={img.url}
                alt={img.altText}
                className="w-full h-full object-cover"
                onError={handleError}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
