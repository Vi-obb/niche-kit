export interface Block {
  slug: string;
  title: string;
  niche: string;
  category: string;
  preview: string;
  filePath?: string; // Optional path to the file that contains the code
}

export const blocks: Block[] = [
  // E-commerce Blocks

  // Product Cards
  {
    slug: "product-card-01",
    title: "Product Card 01",
    niche: "Ecommerce",
    category: "product-card",
    preview: "/preview/product-card/01",
    filePath: "registry/ecomm/product-card-01/product-card-01.tsx",
  },
  {
    slug: "product-card-02",
    title: "Product Card 02",
    niche: "Ecommerce",
    category: "product-card",
    preview: "/preview/product-card/02",
    filePath: "registry/ecomm/product-card-02/product-card-02.tsx",
  },

  // Shopping Carts
  {
    slug: "cart-sheet",
    title: "Cart Sheet",
    niche: "Ecommerce",
    category: "cart",
    preview: "/preview/cart/sheet",
    filePath: "registry/ecomm/cart-sheet/cart-sheet.tsx",
  },
];

export const categories = [...new Set(blocks.map((b) => b.category))];
export const niches = [...new Set(blocks.map((b) => b.niche))];
