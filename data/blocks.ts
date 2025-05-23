import fs from "fs";
import path from "path";

export interface Block {
  slug: string;
  title: string;
  niche: string;
  category: string;
  preview: string;
  code: string;
}

function loadCode(filePath: string): string {
  const fullPath = path.join(process.cwd(), filePath);
  return fs.readFileSync(fullPath, "utf-8");
}

export const blocks: Block[] = [
  // E-commerce Blocks

  // Product Cards
  {
    slug: "product-card-01",
    title: "Simple product card",
    niche: "ecommerce",
    category: "product-cards",
    preview: "/preview/product-cards/product-card-01",
    code: loadCode("app/code/product-card-01.tsx"),
  },
  {
    slug: "product-card-02",
    title: "Product card with horizontal layout",
    niche: "ecommerce",
    category: "product-cards",
    preview: "/preview/product-cards/product-card-02",
    code: loadCode("app/code/product-card-02.tsx"),
  },

  // Shopping Carts
  {
    slug: "cart-sheet",
    title: "Cart Sheet",
    niche: "ecommerce",
    category: "carts",
    preview: "/preview/carts/cart-sheet",
    code: loadCode("app/code/cart-sheet.tsx"),
  },
];

export const categories = [...new Set(blocks.map((b) => b.category))];
export const niches = [...new Set(blocks.map((b) => b.niche))];
