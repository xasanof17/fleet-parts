import { client } from "@/sanity/lib/client";
import { partsQuery, categoriesQuery } from "@/sanity/lib/queries";
import { Header } from "@/components/header";
import { PartsCatalog } from "@/components/parts-catalog";
import type { Part } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fleet Parts Intelligence | Parts Catalog",
  description:
    "Browse our comprehensive fleet parts catalog with state-specific pricing. Find engine, transmission, brake, and suspension parts for your fleet vehicles.",
  openGraph: {
    title: "Fleet Parts Intelligence | Parts Catalog",
    description:
      "Browse our comprehensive fleet parts catalog with state-specific pricing.",
    type: "website",
  },
};

async function getParts(): Promise<Part[]> {
  return client.fetch(partsQuery, {}, { next: { tags: ["parts"] } });
}

async function getCategories(): Promise<string[]> {
  return client.fetch(categoriesQuery, {}, { next: { tags: ["parts"] } });
}

export default async function HomePage() {
  const [parts, categories] = await Promise.all([getParts(), getCategories()]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Fleet Parts Catalog
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            Browse our comprehensive selection of fleet parts with state-specific
            pricing and tax calculations.
          </p>
        </div>

        {parts.length > 0 ? (
          <PartsCatalog parts={parts} categories={categories} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
            <p className="text-lg font-medium text-foreground">No parts yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add parts via the{" "}
              <a href="/studio" className="text-foreground underline">
                Admin Studio
              </a>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
