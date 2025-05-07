export interface Block {
  slug: string;
  title: string;
  niche: string;
  category: string;
  preview: string;
  filePath?: string; // Optional path to the file that contains the code
}

export const blocks: Block[] = [
  {
    slug: "product-card-01",
    title: "Product Card 01",
    niche: "Ecommerce",
    category: "product-card",
    preview: "/preview/product-card/01",
    filePath: "registry/ecomm/product-card-01/product-card-01.tsx",
  },
  // Add more blocks as needed
];

export const categories = [...new Set(blocks.map((b) => b.category))];
export const niches = [...new Set(blocks.map((b) => b.niche))];
