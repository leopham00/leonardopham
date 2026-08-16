import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "@/lib/about";
import PreviewBoundsTuner from "@/components/PreviewBoundsTuner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://leonardopham.vercel.app"),
  title: {
    default: "Leonardo Pham, Designer & Filmmaker",
    template: "%s | Leonardo Pham",
  },
  description:
    "Designer and filmmaker from Los Angeles. Brand identity, motion graphics, video direction, and web design for BREACH, VICE, Coca-Cola, Sprite, and Tylenol.",
  openGraph: {
    type: "website",
    siteName: "Leonardo Pham",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col">
        <header className="border-b border-hairline">
          <nav className="flex items-center justify-between px-4 md:px-6 h-12">
            <Link href="/" className="meta hover:text-muted transition-colors duration-200">
              Leonardo Pham
            </Link>
            <div className="flex items-center gap-5">
              <Link href="/" className="meta hover:text-muted transition-colors duration-200">
                Work
              </Link>
              <Link href="/about" className="meta hover:text-muted transition-colors duration-200">
                About
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="meta hover:text-muted transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-hairline mt-24">
          <div className="px-4 md:px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p className="meta text-muted">Los Angeles, CA</p>
            <div className="flex items-center gap-5">
              <a
                href={`mailto:${contact.email}`}
                className="meta hover:text-muted transition-colors duration-200"
              >
                {contact.email}
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="meta hover:text-muted transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>

        {process.env.NODE_ENV !== "production" && <PreviewBoundsTuner />}
      </body>
    </html>
  );
}
