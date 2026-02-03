import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Part, ComputedPrice } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatCurrency } from "@/lib/price-calculator";

interface PartGridProps {
  parts: Part[];
  getPriceForPart: (part: Part) => ComputedPrice | null;
}

export function PartGrid({ parts, getPriceForPart }: PartGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {parts.map((part) => {
        const price = getPriceForPart(part);
        const imageUrl = part.images?.[0];

        return (
          <Link
            key={part._id}
            href={`/parts/${part.slug}`}
            className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:shadow-md hover:border-foreground/20"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              {imageUrl ? (
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={part.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <span className="text-2xl">No Img</span>
                </div>
              )}
            </div>
            <div className="p-2">
              <p className="text-xs text-muted-foreground">
                {CATEGORY_LABELS[part.category] || part.category}
              </p>
              <h3 className="mt-0.5 text-sm font-medium text-foreground line-clamp-2">
                {part.title}
              </h3>
              <div className="mt-1.5 flex items-center gap-1">
                <span className="text-sm font-bold text-foreground">
                  {price
                    ? formatCurrency(price.finalPrice)
                    : formatCurrency(part.basePrice)}
                </span>
                {price && (
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 text-[10px] px-1 py-0"
                  >
                    Tax
                  </Badge>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
