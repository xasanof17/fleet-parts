import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { partBySlugQuery, partSlugsQuery } from "@/sanity/lib/queries";
import { Header } from "@/components/header";
import { PartDetail } from "@/components/part-detail";
import type { Part } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPart(slug: string): Promise<Part | null> {
  return client.fetch(
    partBySlugQuery,
    { slug },
    { next: { tags: [`part-${slug}`] } }
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch(partSlugsQuery);
  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const part = await getPart(slug);

  if (!part) {
    return {
      title: "Part Not Found | Fleet Parts Intelligence",
    };
  }

  const title = part.seo?.metaTitle || `${part.title} | Fleet Parts Intelligence`;
  const description =
    part.seo?.metaDescription ||
    part.description.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: part.images?.[0] ? [{ url: part.images[0] }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: part.images?.[0] ? [part.images[0]] : [],
    },
    alternates: {
      canonical: part.seo?.canonical,
    },
  };
}

export default async function PartPage({ params }: PageProps) {
  const { slug } = await params;
  const part = await getPart(slug);

  if (!part) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: part.title,
    description: part.description,
    image: part.images?.[0],
    category: part.category,
    offers: {
      "@type": "Offer",
      price: part.basePrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <PartDetail part={part} />
        </main>
      </div>
    </>
  );
}
