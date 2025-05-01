import { SiteHeader } from "@/components/site-header";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Homepage() {
  return (
    <>
      <SiteHeader />
      <div className="relative flex flex-col min-h-[100vh] items-center justify-center overflow-hidden">
        {/* Grid Pattern Background */}
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          strokeDasharray="2 4"
          className="stroke-primary/20 dark:stroke-primary/20 [mask-image:radial-gradient(800px_at_center,white,transparent)]"
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Build faster, Sell better
          </h1>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl md:text-2xl">
            Tailored, modern web UI blocks for your next app idea.
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
