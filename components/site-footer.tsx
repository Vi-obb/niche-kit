"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteFooter() {
  return (
    <footer className="w-full bg-transparent">
      <div className="flex px-4 md:px-32 h-16 items-center justify-between text-muted-foreground">
        <div className="flex items-center gap-6">
          <span className="inline-block font-medium">
            Tailored UI blocks for every niche
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-block font-medium">
            Built by{" "}
            <Link
              href="https://www.x.com/FiifiObbeng"
              className="text-foreground underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fiifi Obbeng on X"
              title="Fiifi Obbeng on X"
            >
              Fiifi Obbeng
            </Link>
          </span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
