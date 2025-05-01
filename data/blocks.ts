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
    {
        slug: 'product-card',
        title: 'Product Card 01',
        niche: 'E-commerce',
        category: 'product-card',
        preview: '/preview/hero-section/one',
        code: loadCode('app/preview/product-card/01/page.tsx'),
    },
]





export const categories = [...new Set(blocks.map((b) => b.category))];
export const niches = [...new Set(blocks.map((b) => b.niche))];