"use client";

import Link from "next/link";
import { niches } from "@/data/blocks";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";

// Convert niches array to menu structure
const menuItems = niches.map((niche, index) => ({
  id: index + 1,
  title: niche,
  url: `/${niche.toLowerCase()}`,
}));

export function NavHeader() {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <div className="w-full bg-transparent">
      <div className="px-4 md:px-32">
        <div className="flex  h-16 items-center w-full border-t border-dashed">
          <MotionConfig transition={{ bounce: 0, type: "tween" }}>
            <nav className="relative">
              <ul className="flex items-center gap-1">
                {menuItems.map((item) => {
                  const isActive = pathname.startsWith(item.url);
                  return (
                    <li key={item.id} className="relative">
                      <Link
                        href={item.url}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "transition-all",
                          hovered === item.id || isActive
                            ? "bg-accent text-accent-foreground"
                            : ""
                        )}
                        onMouseEnter={() => setHovered(item.id)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {item.title}
                      </Link>
                      {(hovered === item.id || isActive) && (
                        <motion.div
                          layout
                          layoutId={
                            isActive ? `active-${item.id}` : `hover-${item.id}`
                          }
                          className="absolute h-0.5 w-full bg-foreground bottom-0 mb-[-8px]"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </MotionConfig>
        </div>
      </div>
    </div>
  );
}
