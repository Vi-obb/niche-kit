import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Tailored UI blocks for every app | Niche kit",
  description:
    "Niche kit is an open-source UI component library built with shadcn/ui. Access beautifully designed, responsive and ready-to-use blocks for ecommerce, CMS, marketplaces, finance apps, AI tools, and more.",
  keywords:
    "ui library, shadcn, tailwind ui, react components, ecommerce ui, saas ui, cms blocks, developer tools, booking app ui, open source ui, niche kit, frontend templates, shadcn/ui components, ai, responsive, nextjs, react, component library, web development, web applications, marketplace, lms ui, events apps, ai apps",
  openGraph: {
    title: "Tailored UI blocks for every app | Niche kit",
    description:
      "Niche kit is an open-source UI component library built with shadcn/ui. Access beautifully designed, responsive and ready-to-use blocks for ecommerce, CMS, marketplaces, finance apps, AI tools, and more.",
    url: "https://niche-kit.vercel.app",
    siteName: "Niche kit",
    images: [
      {
        url: "https://niche-kit.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Niche kit ui library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tailored UI blocks for every app | Niche kit",
    description:
      "Niche kit is an open-source UI component library built with shadcn/ui. Access beautifully designed, responsive and ready-to-use blocks for ecommerce, CMS, marketplaces, finance apps, AI tools, and more.",
    images: ["https://niche-kit.vercel.app/og-image.png"],
    creator: "@FiifiObbeng",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
