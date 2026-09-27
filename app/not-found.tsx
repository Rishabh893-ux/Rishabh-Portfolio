import Link from "next/link";
import Magnetic from "@/components/Magnetic";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
      <span className="gradient-text-static animate-pulse font-mono text-sm font-medium">404</span>
      <h1 className="mt-3 font-display text-2xl font-semibold text-primary">Page not found</h1>
      <p className="mt-2 text-secondary">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Magnetic className="mt-6">
        <Link href="/" className="gradient-btn rounded-xl px-5 py-2.5 text-sm font-medium text-bg">
          Back home
        </Link>
      </Magnetic>
    </div>
  );
}
