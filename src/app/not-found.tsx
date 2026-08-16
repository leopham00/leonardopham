import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 md:px-6 pt-16 md:pt-24 pb-16">
      <p className="meta text-muted mb-4">404</p>
      <h1 className="text-[clamp(2rem,5.5vw,4.25rem)] leading-[0.98] tracking-[-0.03em] mb-8">
        Not found
      </h1>
      <Link
        href="/"
        className="meta border-b border-ink pb-0.5 hover:text-muted hover:border-muted transition-colors duration-200"
      >
        Back to work
      </Link>
    </div>
  );
}
