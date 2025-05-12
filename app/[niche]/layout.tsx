import { CategoryNav } from "@/components/category-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { niches } from "@/data/blocks";

export default function NicheLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <CategoryNav niches={niches} />
      <div className="px-4 md:px-32 py-4">{children}</div>
      <SiteFooter />
    </>
  );
}
