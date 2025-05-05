import { NavHeader } from "@/components/nav-header";
import { SiteHeader } from "@/components/site-header";

export default function NicheLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <NavHeader />
      
      <div className="px-4 md:px-32 py-4">{children}</div>
    </>
  );
}
