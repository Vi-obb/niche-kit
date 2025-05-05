import { blocks } from "@/data/blocks";
import Link from "next/link";

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
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{formattedCategory}</h1>
      </div>

      <div className="flex flex-col">
        {categoryBlocks.map((block) => (
          <Link key={block.slug} href={block.preview}>
            <div>
              <h3 className="text-lg font-semibold">{block.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {categoryBlocks.length === 0 && (
        <div className="rounded-lg border p-8 text-center">
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
