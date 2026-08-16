import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leonardo Pham — Links",
  robots: { index: false, follow: false },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
