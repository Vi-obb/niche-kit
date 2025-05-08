// This code is adapted from Origin UI
// Source: https://github.com/origin-space/originui/blob/main/components/code-block.tsx
"use client";

import { cn } from "@/lib/utils";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { JSX, useLayoutEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import type { BundledLanguage } from "shiki/bundle/web";
import { codeToHast } from "shiki/bundle/web";

export async function highlight(code: string, lang: BundledLanguage) {
  const hast = await codeToHast(code, {
    lang,
    theme: "github-dark",
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}

type Props = {
  code: string;
  lang: BundledLanguage;
  initial?: JSX.Element;
  preHighlighted?: JSX.Element | null;
  maxHeight?: number;
  className?: string;
};

export default function CodeBlock({
  code,
  lang,
  initial,
  maxHeight,
  preHighlighted,
  className,
}: Props) {
  const [content, setContent] = useState<JSX.Element | null>(
    preHighlighted || initial || null
  );

  useLayoutEffect(() => {
    // If we have pre-highlighted content, use that
    if (preHighlighted) {
      setContent(preHighlighted);
      return;
    }

    let isMounted = true;

    // The code is guaranteed to be a string from BlockPreview
    highlight(code, lang).then((result) => {
      if (isMounted) {
        setContent(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [code, lang, preHighlighted]);

  // Simply return the highlighted content
  return (
    <div
      className={cn(
        "[&_code]:text-[13px]/2 [&_code]:font-mono [&_pre]:min-h-[400px] [&_pre]:max-h-[800px] [&_pre]:overflow-auto [&_pre]:border [&_pre]:border-dashed [&_pre]:rounded-xl [&_pre]:!bg-background [&_pre]:p-4 [&_pre]:leading-snug",
        className
      )}
      style={{ "--pre-max-height": `${maxHeight}px` } as React.CSSProperties}
    >
      {content}
    </div>
  );
}
