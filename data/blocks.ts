// This file is used in both server and client contexts, so we need to avoid direct fs imports

export interface Block {
  slug: string;
  title: string;
  niche: string;
  category: string;
  preview: string;
  code: string;
}

// Pre-defined blocks instead of dynamically loading from filesystem
export const blocks: Block[] = [
  {
    slug: "product-card-01",
    title: "Product Card 01",
    niche: "Ecommerce",
    category: "product-card",
    preview: "/preview/product-card/01",
    code: `
import { Card } from "@/components/ui/card";

export default function ProductCard01() {
  return (
    <Card className="w-full max-w-sm">
      <div className="p-4">
        <h3 className="text-lg font-bold">Sample Product</h3>
        <p className="text-sm text-gray-500">Product description</p>
        <div className="mt-2 font-semibold">$99.99</div>
      </div>
    </Card>
  );
}`,
  },
  // You can add more blocks here as needed
];

export const categories = [...new Set(blocks.map((b) => b.category))];
export const niches = [...new Set(blocks.map((b) => b.niche))];
