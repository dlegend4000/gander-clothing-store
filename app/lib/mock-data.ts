// Phase 1: Static mock data that mirrors Shopify's Storefront API shape.
// When connecting Shopify (Phase 2), swap loader imports from this file
// to `context.storefront.query(...)` calls — zero component refactoring needed.

export type MockProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {amount: string; currencyCode: string};
    maxVariantPrice: {amount: string; currencyCode: string};
  };
  compareAtPriceRange?: {
    minVariantPrice: {amount: string; currencyCode: string};
  };
  featuredImage: {url: string; altText: string};
  images: {nodes: {url: string; altText: string}[]};
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      price: {amount: string; currencyCode: string};
      compareAtPrice?: {amount: string; currencyCode: string};
      selectedOptions: {name: string; value: string}[];
    }[];
  };
  options: {name: string; values: string[]}[];
  tags: string[];
  collections: {nodes: {handle: string; title: string}[]};
};

export type MockCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: {url: string; altText: string} | null;
  products: {nodes: MockProduct[]};
};

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const mockProducts: MockProduct[] = [
  {
    id: 'p1',
    title: 'Classic Crewneck Tee',
    handle: 'classic-crewneck-tee',
    description:
      'A wardrobe essential. Made from 100% premium organic cotton, this crewneck tee offers a relaxed fit and lasting comfort for everyday wear.',
    priceRange: {
      minVariantPrice: {amount: '39.00', currencyCode: 'EUR'},
      maxVariantPrice: {amount: '39.00', currencyCode: 'EUR'},
    },
    featuredImage: {
      url: '/images/products/tee-white.jpg',
      altText: 'Classic Crewneck Tee in White',
    },
    images: {
      nodes: [
        {url: '/images/products/tee-white.jpg', altText: 'Front view'},
        {url: '/images/products/tee-white-back.jpg', altText: 'Back view'},
      ],
    },
    variants: {
      nodes: [
        {
          id: 'p1-xs',
          availableForSale: true,
          price: {amount: '39.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'XS'}],
        },
        {
          id: 'p1-s',
          availableForSale: true,
          price: {amount: '39.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'S'}],
        },
        {
          id: 'p1-m',
          availableForSale: true,
          price: {amount: '39.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'M'}],
        },
        {
          id: 'p1-l',
          availableForSale: false,
          price: {amount: '39.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'L'}],
        },
        {
          id: 'p1-xl',
          availableForSale: true,
          price: {amount: '39.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'XL'}],
        },
      ],
    },
    options: [{name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL']}],
    tags: ['new', 'basics'],
    collections: {nodes: [{handle: 'mens', title: "Men's"}]},
  },
  {
    id: 'p2',
    title: 'Relaxed Linen Shirt',
    handle: 'relaxed-linen-shirt',
    description:
      'Effortless style meets natural breathability. This oversized linen shirt is perfect for warm days and layered looks alike.',
    priceRange: {
      minVariantPrice: {amount: '79.00', currencyCode: 'EUR'},
      maxVariantPrice: {amount: '79.00', currencyCode: 'EUR'},
    },
    featuredImage: {
      url: '/images/products/linen-shirt.jpg',
      altText: 'Relaxed Linen Shirt',
    },
    images: {
      nodes: [
        {url: '/images/products/linen-shirt.jpg', altText: 'Linen shirt front'},
        {
          url: '/images/products/linen-shirt-back.jpg',
          altText: 'Linen shirt back',
        },
      ],
    },
    variants: {
      nodes: [
        {
          id: 'p2-s',
          availableForSale: true,
          price: {amount: '79.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'S'}],
        },
        {
          id: 'p2-m',
          availableForSale: true,
          price: {amount: '79.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'M'}],
        },
        {
          id: 'p2-l',
          availableForSale: true,
          price: {amount: '79.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'L'}],
        },
        {
          id: 'p2-xl',
          availableForSale: false,
          price: {amount: '79.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'XL'}],
        },
      ],
    },
    options: [{name: 'Size', values: ['S', 'M', 'L', 'XL']}],
    tags: ['new'],
    collections: {nodes: [{handle: 'womens', title: "Women's"}]},
  },
  {
    id: 'p3',
    title: 'Slim Chino Trousers',
    handle: 'slim-chino-trousers',
    description:
      'Tailored for a clean silhouette. These slim-fit chinos are crafted from stretch cotton twill and work from desk to dinner.',
    priceRange: {
      minVariantPrice: {amount: '89.00', currencyCode: 'EUR'},
      maxVariantPrice: {amount: '89.00', currencyCode: 'EUR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '129.00', currencyCode: 'EUR'},
    },
    featuredImage: {
      url: '/images/products/chino-navy.jpg',
      altText: 'Slim Chino Trousers in Navy',
    },
    images: {
      nodes: [{url: '/images/products/chino-navy.jpg', altText: 'Navy chinos'}],
    },
    variants: {
      nodes: [
        {
          id: 'p3-28',
          availableForSale: true,
          price: {amount: '89.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '129.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Waist', value: '28'}],
        },
        {
          id: 'p3-30',
          availableForSale: true,
          price: {amount: '89.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '129.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Waist', value: '30'}],
        },
        {
          id: 'p3-32',
          availableForSale: true,
          price: {amount: '89.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '129.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Waist', value: '32'}],
        },
        {
          id: 'p3-34',
          availableForSale: true,
          price: {amount: '89.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '129.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Waist', value: '34'}],
        },
      ],
    },
    options: [{name: 'Waist', values: ['28', '30', '32', '34', '36']}],
    tags: ['sale'],
    collections: {nodes: [{handle: 'mens', title: "Men's"}]},
  },
  {
    id: 'p4',
    title: 'Merino Wool Jumper',
    handle: 'merino-wool-jumper',
    description:
      'Luxuriously soft 100% merino wool. Temperature-regulating, odour-resistant, and built for style — this is your year-round mid-layer.',
    priceRange: {
      minVariantPrice: {amount: '149.00', currencyCode: 'EUR'},
      maxVariantPrice: {amount: '149.00', currencyCode: 'EUR'},
    },
    featuredImage: {
      url: '/images/products/merino-jumper.jpg',
      altText: 'Merino Wool Jumper',
    },
    images: {
      nodes: [
        {
          url: '/images/products/merino-jumper.jpg',
          altText: 'Merino jumper front',
        },
      ],
    },
    variants: {
      nodes: [
        {
          id: 'p4-s',
          availableForSale: true,
          price: {amount: '149.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'S'}],
        },
        {
          id: 'p4-m',
          availableForSale: true,
          price: {amount: '149.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'M'}],
        },
        {
          id: 'p4-l',
          availableForSale: true,
          price: {amount: '149.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'L'}],
        },
        {
          id: 'p4-xl',
          availableForSale: true,
          price: {amount: '149.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'XL'}],
        },
      ],
    },
    options: [{name: 'Size', values: ['S', 'M', 'L', 'XL']}],
    tags: ['new', 'bestseller'],
    collections: {nodes: [{handle: 'mens', title: "Men's"}]},
  },
  {
    id: 'p5',
    title: 'Wide-Leg Trousers',
    handle: 'wide-leg-trousers',
    description:
      'A fashion-forward silhouette with elevated comfort. High-waisted and wide-legged, these trousers pair seamlessly with crop tops and structured blazers.',
    priceRange: {
      minVariantPrice: {amount: '99.00', currencyCode: 'EUR'},
      maxVariantPrice: {amount: '99.00', currencyCode: 'EUR'},
    },
    featuredImage: {
      url: '/images/products/wide-leg-trousers.jpg',
      altText: 'Wide-Leg Trousers',
    },
    images: {
      nodes: [
        {url: '/images/products/wide-leg-trousers.jpg', altText: 'Wide leg'},
      ],
    },
    variants: {
      nodes: [
        {
          id: 'p5-xs',
          availableForSale: true,
          price: {amount: '99.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'XS'}],
        },
        {
          id: 'p5-s',
          availableForSale: true,
          price: {amount: '99.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'S'}],
        },
        {
          id: 'p5-m',
          availableForSale: true,
          price: {amount: '99.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'M'}],
        },
        {
          id: 'p5-l',
          availableForSale: false,
          price: {amount: '99.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'L'}],
        },
      ],
    },
    options: [{name: 'Size', values: ['XS', 'S', 'M', 'L']}],
    tags: ['new'],
    collections: {nodes: [{handle: 'womens', title: "Women's"}]},
  },
  {
    id: 'p6',
    title: 'Ribbed Tank Top',
    handle: 'ribbed-tank-top',
    description:
      'A sleek, ribbed cotton tank top. Slim-fit with a scoop neck — ideal as a standalone piece or layered under a blazer.',
    priceRange: {
      minVariantPrice: {amount: '25.00', currencyCode: 'EUR'},
      maxVariantPrice: {amount: '25.00', currencyCode: 'EUR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '40.00', currencyCode: 'EUR'},
    },
    featuredImage: {
      url: '/images/products/ribbed-tank.jpg',
      altText: 'Ribbed Tank Top',
    },
    images: {
      nodes: [{url: '/images/products/ribbed-tank.jpg', altText: 'Tank top'}],
    },
    variants: {
      nodes: [
        {
          id: 'p6-xs',
          availableForSale: true,
          price: {amount: '25.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '40.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'XS'}],
        },
        {
          id: 'p6-s',
          availableForSale: true,
          price: {amount: '25.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '40.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'S'}],
        },
        {
          id: 'p6-m',
          availableForSale: true,
          price: {amount: '25.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '40.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'M'}],
        },
        {
          id: 'p6-l',
          availableForSale: true,
          price: {amount: '25.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '40.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'L'}],
        },
      ],
    },
    options: [{name: 'Size', values: ['XS', 'S', 'M', 'L']}],
    tags: ['sale'],
    collections: {nodes: [{handle: 'womens', title: "Women's"}]},
  },
  {
    id: 'p7',
    title: 'Denim Jacket',
    handle: 'denim-jacket',
    description:
      'A classic denim jacket with a modern slim cut. Finished with contrast stitching and a button-down front for that timeless look.',
    priceRange: {
      minVariantPrice: {amount: '119.00', currencyCode: 'EUR'},
      maxVariantPrice: {amount: '119.00', currencyCode: 'EUR'},
    },
    featuredImage: {
      url: '/images/products/denim-jacket.jpg',
      altText: 'Denim Jacket',
    },
    images: {
      nodes: [
        {url: '/images/products/denim-jacket.jpg', altText: 'Denim jacket'},
      ],
    },
    variants: {
      nodes: [
        {
          id: 'p7-s',
          availableForSale: true,
          price: {amount: '119.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'S'}],
        },
        {
          id: 'p7-m',
          availableForSale: true,
          price: {amount: '119.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'M'}],
        },
        {
          id: 'p7-l',
          availableForSale: true,
          price: {amount: '119.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'L'}],
        },
        {
          id: 'p7-xl',
          availableForSale: false,
          price: {amount: '119.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'XL'}],
        },
      ],
    },
    options: [{name: 'Size', values: ['S', 'M', 'L', 'XL']}],
    tags: ['bestseller'],
    collections: {
      nodes: [
        {handle: 'mens', title: "Men's"},
        {handle: 'womens', title: "Women's"},
      ],
    },
  },
  {
    id: 'p8',
    title: 'Oversized Hoodie',
    handle: 'oversized-hoodie',
    description:
      'Heavyweight fleece in an oversized silhouette. Drop-shoulder fit, kangaroo pocket, and brushed interior for maximum warmth.',
    priceRange: {
      minVariantPrice: {amount: '89.00', currencyCode: 'EUR'},
      maxVariantPrice: {amount: '89.00', currencyCode: 'EUR'},
    },
    compareAtPriceRange: {
      minVariantPrice: {amount: '120.00', currencyCode: 'EUR'},
    },
    featuredImage: {
      url: '/images/products/hoodie.jpg',
      altText: 'Oversized Hoodie',
    },
    images: {
      nodes: [{url: '/images/products/hoodie.jpg', altText: 'Oversized hoodie'}],
    },
    variants: {
      nodes: [
        {
          id: 'p8-xs',
          availableForSale: true,
          price: {amount: '89.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '120.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'XS'}],
        },
        {
          id: 'p8-s',
          availableForSale: true,
          price: {amount: '89.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '120.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'S'}],
        },
        {
          id: 'p8-m',
          availableForSale: true,
          price: {amount: '89.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '120.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'M'}],
        },
        {
          id: 'p8-l',
          availableForSale: true,
          price: {amount: '89.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '120.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'L'}],
        },
        {
          id: 'p8-xl',
          availableForSale: true,
          price: {amount: '89.00', currencyCode: 'EUR'},
          compareAtPrice: {amount: '120.00', currencyCode: 'EUR'},
          selectedOptions: [{name: 'Size', value: 'XL'}],
        },
      ],
    },
    options: [{name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL']}],
    tags: ['sale', 'bestseller'],
    collections: {
      nodes: [
        {handle: 'mens', title: "Men's"},
        {handle: 'womens', title: "Women's"},
        {handle: 'sale', title: 'Sale'},
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export const mockCollections: MockCollection[] = [
  {
    id: 'c1',
    title: "Men's",
    handle: 'mens',
    description: 'Clean cuts and timeless basics for everyday confidence.',
    image: {url: '/images/collections/mens.jpg', altText: "Men's collection"},
    products: {
      nodes: mockProducts.filter((p) =>
        p.collections.nodes.some((c) => c.handle === 'mens'),
      ),
    },
  },
  {
    id: 'c2',
    title: "Women's",
    handle: 'womens',
    description: 'Modern silhouettes. Thoughtfully made.',
    image: {
      url: '/images/collections/womens.jpg',
      altText: "Women's collection",
    },
    products: {
      nodes: mockProducts.filter((p) =>
        p.collections.nodes.some((c) => c.handle === 'womens'),
      ),
    },
  },
  {
    id: 'c3',
    title: 'Sale',
    handle: 'sale',
    description: 'Up to 40% off. While stocks last.',
    image: {url: '/images/collections/sale.jpg', altText: 'Sale'},
    products: {
      nodes: mockProducts.filter((p) => p.tags.includes('sale')),
    },
  },
  {
    id: 'c4',
    title: 'New Arrivals',
    handle: 'new-arrivals',
    description: 'Fresh drops — straight from the studio.',
    image: {url: '/images/collections/new.jpg', altText: 'New Arrivals'},
    products: {
      nodes: mockProducts.filter((p) => p.tags.includes('new')),
    },
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getProductByHandle(handle: string): MockProduct | undefined {
  return mockProducts.find((p) => p.handle === handle);
}

export function getCollectionByHandle(
  handle: string,
): MockCollection | undefined {
  return mockCollections.find((c) => c.handle === handle);
}

export function searchProducts(query: string): MockProduct[] {
  const q = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
