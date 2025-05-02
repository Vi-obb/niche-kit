"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { niches } from "@/data/blocks";
import { cn } from "@/lib/utils";

export function NavHeader() {
  const pathname = usePathname();
  const currentNiche = pathname.split("/")[1]?.toLowerCase();

  return (
    <div className="sticky top-16 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-32 flex h-14 items-center">
        <div className="mr-4 flex">
          <nav className="flex items-center gap-6 text-sm">
            {niches.map((niche) => {
              const isActive = currentNiche === niche.toLowerCase();
              return (
                <Link
                  key={niche}
                  href={`/${niche.toLowerCase()}`}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {niche}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
