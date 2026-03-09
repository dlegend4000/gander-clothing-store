import {cn} from '~/lib/utils';

type BadgeProps = {
  label: string;
  variant?: 'new' | 'sale' | 'bestseller' | 'default';
  className?: string;
};

export function Badge({label, variant = 'default', className}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs font-semibold tracking-widest uppercase px-2 py-0.5',
        variant === 'new' && 'bg-zinc-900 text-white',
        variant === 'sale' && 'bg-red-500 text-white',
        variant === 'bestseller' && 'bg-amber-500 text-white',
        variant === 'default' && 'bg-zinc-100 text-zinc-700',
        className,
      )}
    >
      {label}
    </span>
  );
}

export function getVariantFromTag(
  tags: string[],
): 'new' | 'sale' | 'bestseller' | 'default' {
  if (tags.includes('sale')) return 'sale';
  if (tags.includes('new')) return 'new';
  if (tags.includes('bestseller')) return 'bestseller';
  return 'default';
}
