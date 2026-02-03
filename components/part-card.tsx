import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Part, ComputedPrice } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatCurrency } from "@/lib/price-calculator";

interface PartCardProps {
  part: Part;
  price: ComputedPrice | null;
}

export function PartCard({ part, price }: PartCardProps) {
  const imageUrl = part.images?.[0];

  return (
    <Link href={`/parts/${part.slug}`}>
      <Card className="group h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-foreground/20 pt-0">
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={part.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <span className="text-4xl">No Image</span>
            </div>
          )}
          <Badge className="absolute left-3 top-3 bg-background/90 text-foreground hover:bg-background/90">
            {CATEGORY_LABELS[part.category] || part.category}
          </Badge>
        </div>
        <CardContent className="px-3">
          <h3 className="text-balance font-semibold text-foreground line-clamp-2">
            {part.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {part.description}
          </p>
          {part.compatibleTrucks && part.compatibleTrucks.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {part.compatibleTrucks.slice(0, 3).map((truck) => (
                <Badge key={truck} variant="outline" className="text-xs">
                  {truck}
                </Badge>
              ))}
              {part.compatibleTrucks.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{part.compatibleTrucks.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-4 py-1">
          {price ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                {formatCurrency(price.finalPrice)}
              </span>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-800"
              >
                Tax Included
              </Badge>
            </div>
          ) : (
            <span className="text-lg font-bold text-foreground">
              {formatCurrency(part.basePrice)}
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
