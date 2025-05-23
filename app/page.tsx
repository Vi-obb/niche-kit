import { SiteHeader } from "@/components/site-header";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Homepage() {
  return (
    <>
      <SiteHeader />
      <div className="relative flex flex-col min-h-[80vh] items-center justify-center overflow-hidden px-4 md:px-32 border border-dashed mt-2 md:mt-4 mx-4 md:mx-32 bg-background rounded-3xl">
        {/* Grid Pattern Background */}
        <GridPattern
          width={50}
          height={50}
          x={-8}
          y={-18}
          strokeDasharray="2 4"
          className="stroke-primary/20 dark:stroke-primary/20 [mask-image:radial-gradient(800px_at_center,white,transparent)]"
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-4 text-center">
          <h1 className="font-bold tracking-tighter text-3xl md:text-6xl">
            Build Faster with Tailored UI Blocks for Every App
          </h1>
          <p className="max-w-[42rem] text-muted-foreground md:text-lg">
            Niche Kit is an open-source UI library for the web, powered by shadcn/ui.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Button asChild size="lg">
              <Link href="/ecommerce">Explore components</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
