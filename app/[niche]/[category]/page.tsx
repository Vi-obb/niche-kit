import { blocks } from "@/data/blocks";
import Link from "next/link";
import { BlockPreview } from "@/components/block-preview";
import { ArrowLeft } from "lucide-react";

type Params = Promise<{
  niche: string;
  category: string;
}>;

export default async function CategoryPage({ params }: { params: Params }) {
  const { niche, category } = await params;

  // Get blocks for this niche and category
  const categoryBlocks = blocks.filter(
    (block) =>
      block.niche.toLowerCase() === niche.toLowerCase() &&
      block.category === category
  );

  // Format category name for display
  const formattedCategory =
    category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") + "s";

  return (
    <div className="border p-7 rounded-xl border-dashed bg-background">
      <div className="mb-6 flex flex-col gap-2 items-start">
        <Link
          href={`/${niche}`}
          className="inline-flex items-center gap-2 text-sm hover:underline text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blocks
        </Link>
        <h1 className="text-2xl font-bold">{formattedCategory}</h1>
      </div>

      <div className="flex flex-col gap-16">
        {categoryBlocks.map((block) => (
          <BlockPreview {...block} key={block.slug} />
        ))}
      </div>

      {categoryBlocks.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-xl font-semibold">No components found</h2>
          <p className="mt-2 text-muted-foreground">
            No components are available for the {formattedCategory} category
            yet.
          </p>
        </div>
      )}
    </div>
  );
}
