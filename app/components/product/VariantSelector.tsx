import {cn} from '~/lib/utils';
import type {MockProduct} from '~/lib/mock-data';

type VariantSelectorProps = {
  options: MockProduct['options'];
  variants: MockProduct['variants']['nodes'];
  selectedOptions: Record<string, string>;
  onChange: (name: string, value: string) => void;
};

export function VariantSelector({
  options,
  variants,
  selectedOptions,
  onChange,
}: VariantSelectorProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.name}>
          <p className="text-sm font-medium text-zinc-700 mb-2 uppercase tracking-wider">
            {option.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;

              // Find if this option value has an available variant
              const variantForOption = variants.find((v) =>
                v.selectedOptions.some(
                  (o) => o.name === option.name && o.value === value,
                ),
              );
              const isAvailable = variantForOption?.availableForSale ?? false;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onChange(option.name, value)}
                  disabled={!isAvailable}
                  className={cn(
                    'relative px-4 py-2 text-sm border transition-all duration-150',
                    isSelected
                      ? 'border-zinc-900 bg-zinc-900 text-white'
                      : 'border-zinc-200 text-zinc-700 hover:border-zinc-400',
                    !isAvailable &&
                      'opacity-40 cursor-not-allowed line-through',
                  )}
                  aria-label={`${option.name}: ${value}${!isAvailable ? ' (out of stock)' : ''}`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
