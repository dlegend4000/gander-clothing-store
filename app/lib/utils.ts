export function formatPrice(
  amount: string,
  currencyCode: string = 'EUR',
): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getTagBadge(tags: string[]): string | null {
  if (tags.includes('new')) return 'New';
  if (tags.includes('sale')) return 'Sale';
  if (tags.includes('bestseller')) return 'Best Seller';
  return null;
}

export function isOnSale(
  compareAtPriceRange?: {minVariantPrice: {amount: string}} | null,
  priceRange?: {minVariantPrice: {amount: string}} | null,
): boolean {
  if (!compareAtPriceRange || !priceRange) return false;
  return (
    parseFloat(compareAtPriceRange.minVariantPrice.amount) >
    parseFloat(priceRange.minVariantPrice.amount)
  );
}
