import { blocks } from "@/data/blocks";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: { niche: string; category: string };
}) {
  const { niche, category } = await params;

  // Get blocks for this niche and category
  const categoryBlocks = blocks.filter(
    (block) =>
      block.niche.toLowerCase() === niche.toLowerCase() &&
      block.category === category
  );

  // Format category name for display
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{formattedCategory}</h1>
        <p className="text-muted-foreground">
          {categoryBlocks.length} component
          {categoryBlocks.length !== 1 ? "s" : ""} in {niche}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categoryBlocks.map((block) => (
          <Link key={block.slug} href={block.preview}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative aspect-video bg-muted">
                {/* Preview placeholder - could be an image in the future */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Preview
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{block.title}</h3>
              </div>
            </Card>
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
