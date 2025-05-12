import { blocks } from "@/data/blocks";
import Link from "next/link";
import { ProductCardIllustration } from "@/components/thumbnails/ProductCard";

const CategoryIllustrations: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  "product-cards": ProductCardIllustration,
  carts: ProductCardIllustration,
};

type Params = Promise<{
  niche: string;
}>;

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Params }) {
  const { niche } = await params;
  return {
    title: `${niche} blocks | Niche kit`,
  };
}

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
      <div className="grid gap-6 grid-cols-2 md:grid-cols-4 border p-4 rounded-xl bg-background border-dashed">
        {categories.map((category) => {
          const IllustrationComponent = CategoryIllustrations[category];

          return (
            <Link key={category} href={`/${niche}/${category}`}>
              <div className="h-full">
                <div className="p-3 flex flex-col justify-between h-full">
                  {IllustrationComponent && (
                    <div className="flex p-3 border bg-muted rounded-md border-dashed justify-center mb-2">
                      <IllustrationComponent width={100} height={125} />
                    </div>
                  )}
                  <h3 className="font-medium">
                    {category
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
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
