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
      <div className="container px-4 md:px-32 py-6 mt-16">{children}</div>
    </>
  );
}
