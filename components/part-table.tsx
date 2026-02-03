import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Part, ComputedPrice } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatCurrency } from "@/lib/price-calculator";
import { ChevronRight } from "lucide-react";

interface PartTableProps {
  parts: Part[];
  getPriceForPart: (part: Part) => ComputedPrice | null;
}

export function PartTable({ parts, getPriceForPart }: PartTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Part Name</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Compatible Trucks</TableHead>
            <TableHead className="text-right font-semibold">Price</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parts.map((part) => {
            const price = getPriceForPart(part);
            return (
              <TableRow
                key={part._id}
                className="group cursor-pointer transition-colors hover:bg-muted/50"
              >
                <TableCell>
                  <Link
                    href={`/parts/${part.slug}`}
                    className="block font-medium text-foreground"
                  >
                    {part.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {CATEGORY_LABELS[part.category] || part.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {part.compatibleTrucks?.slice(0, 2).map((truck) => (
                      <Badge key={truck} variant="secondary" className="text-xs">
                        {truck}
                      </Badge>
                    ))}
                    {(part.compatibleTrucks?.length || 0) > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{(part.compatibleTrucks?.length || 0) - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-semibold text-foreground">
                      {price
                        ? formatCurrency(price.finalPrice)
                        : formatCurrency(part.basePrice)}
                    </span>
                    {price && (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-800 text-xs"
                      >
                        Tax Inc.
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/parts/${part.slug}`}>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
