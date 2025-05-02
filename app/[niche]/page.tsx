import { blocks } from "@/data/blocks";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function NichePage({
  params,
}: {
  params: { niche: string };
}) {
  const { niche } = await params;

  // Get unique categories for this niche
  const categories = [
    ...new Set(
      blocks
        .filter((block) => block.niche.toLowerCase() === niche.toLowerCase())
        .map((block) => block.category)
    ),
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link key={category} href={`/${niche}/${category}`}>
            <Card className="overflow-hidden h-full transition-all hover:shadow-md">
              <div className="p-6 flex flex-col justify-between h-full">
                <h3 className="text-lg font-semibold mb-2">
                  {category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {
                    blocks.filter(
                      (block) =>
                        block.niche.toLowerCase() === niche.toLowerCase() &&
                        block.category === category
                    ).length
                  }{" "}
                  components
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-xl font-semibold">No categories found</h2>
          <p className="mt-2 text-muted-foreground">
            No categories are available for the {niche} niche yet.
          </p>
        </div>
      )}
    </div>
  );
}
