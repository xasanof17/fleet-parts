import Link from "next/link";
import { Truck } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight text-foreground">
              Fleet Parts
            </h1>
            <p className="text-xs text-muted-foreground">
              Intelligence System
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Catalog
          </Link>
          <Link
            href="/studio"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
