import {useState} from 'react';
import type {MockProduct} from '~/lib/mock-data';
import {VariantSelector} from './VariantSelector';
import {ProductPrice} from './ProductPrice';
import {Button} from '~/components/ui/Button';

type ProductFormProps = {
  product: MockProduct;
};

export function ProductForm({product}: ProductFormProps) {
  // Build initial selected options from first available variant
  const firstVariant = product.variants.nodes[0];
  const initialOptions: Record<string, string> = {};
  firstVariant?.selectedOptions.forEach((o) => {
    initialOptions[o.name] = o.value;
  });

  const [selectedOptions, setSelectedOptions] =
    useState<Record<string, string>>(initialOptions);
  const [added, setAdded] = useState(false);

  const handleChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({...prev, [name]: value}));
  };

  // Find matching variant
  const selectedVariant = product.variants.nodes.find((v) =>
    v.selectedOptions.every((o) => selectedOptions[o.name] === o.value),
  );

  const isAvailable = selectedVariant?.availableForSale ?? false;

  const handleAddToCart = () => {
    // Phase 1: UI only — just show confirmation flash
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Price */}
      <ProductPrice
        product={product}
        variant={selectedVariant}
        className="text-lg"
      />

      {/* Variant selector */}
      <VariantSelector
        options={product.options}
        variants={product.variants.nodes}
        selectedOptions={selectedOptions}
        onChange={handleChange}
      />

      {/* Add to cart */}
      <Button
        fullWidth
        size="lg"
        disabled={!isAvailable}
        onClick={handleAddToCart}
        className="tracking-widest uppercase"
      >
        {added
          ? '✓ Added!'
          : isAvailable
            ? 'Add to Bag'
            : 'Out of Stock'}
      </Button>

      {/* Size guide hint */}
      <p className="text-xs text-zinc-400 text-center">
        Free returns · Secure checkout
      </p>
    </div>
  );
}
