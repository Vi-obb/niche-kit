import { blocks } from "@/data/blocks";
import Link from "next/link";
import { ProductCardIllustration } from "@/components/thumbnails/ProductCard";

// Map category slugs to their illustrations
const CategoryIllustrations: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  "product-card": ProductCardIllustration,
  "cart": ProductCardIllustration, 
  // Add more category illustrations as they become available
  // Example: "blog-card": BlogCardIllustration,
};

type Params = Promise<{
  niche: string;
}>;

export default async function NichePage({ params }: { params: Params }) {
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
      <div className="grid gap-6 grid-cols-2 md:grid-cols-4 border p-4 rounded-xl border-dashed">
        {categories.map((category) => {
          // Get the illustration component for this category if available
          const IllustrationComponent = CategoryIllustrations[category];

          return (
            <Link key={category} href={`/${niche}/${category}`}>
              <div className="h-full">
                <div className="p-3 flex flex-col justify-between h-full">
                  {IllustrationComponent && (
                    <div className="flex p-3 border rounded-md border-dashed justify-center mb-2">
                      <IllustrationComponent width={100} height={125} />
                    </div>
                  )}
                  <h3 className="font-medium">
                    {category
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ") + "s"}
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
              </div>
            </Link>
          );
        })}
      </div>

      {categories.length === 0 && (
        <div className="rounded-xl border p-4 border-dashed text-center">
          <h2 className="text-xl font-semibold">No categories found</h2>
          <p className="mt-2 text-muted-foreground">
            No categories are available for the {niche} niche yet.
          </p>
        </div>
      )}
    </div>
  );
}
