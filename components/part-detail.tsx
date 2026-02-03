"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageCarousel } from "@/components/image-carousel";
import { PriceBreakdown } from "@/components/price-breakdown";
import type { Part, ComputedPrice } from "@/lib/types";
import { CATEGORY_LABELS, STATE_NAMES } from "@/lib/types";
import { calculatePrice, formatCurrency } from "@/lib/price-calculator";
import { ArrowLeft, Copy, Check, Clock, Calendar, Share2 } from "lucide-react";

interface PartDetailProps {
  part: Part;
}

function isRecentlyUpdated(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays <= 7;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PartDetail({ part }: PartDetailProps) {
  const [selectedState, setSelectedState] = useState("none");
  const [price, setPrice] = useState<ComputedPrice | null>(null);
  const [copied, setCopied] = useState(false);

  const availableStates =
    part.statePricing?.map((sp) => sp.stateCode).sort() || [];

  useEffect(() => {
    const savedState = localStorage.getItem("fleetparts-state");
    if (savedState && savedState !== "none") {
      setSelectedState(savedState);
    }
  }, []);

  useEffect(() => {
    if (selectedState !== "none") {
      setPrice(calculatePrice(part, selectedState));
      localStorage.setItem("fleetparts-state", selectedState);
    } else {
      setPrice(null);
    }
  }, [selectedState, part]);

  const handleCopyInfo = async () => {
    const info = `
Part: ${part.title}
Category: ${CATEGORY_LABELS[part.category] || part.category}
Description: ${part.description}
Base Price: ${formatCurrency(part.basePrice)}
${price ? `Price in ${STATE_NAMES[selectedState]}: ${formatCurrency(price.finalPrice)} (includes ${price.taxRate}% tax)` : ""}
${part.compatibleTrucks?.length ? `Compatible Trucks: ${part.compatibleTrucks.join(", ")}` : ""}
${part.notes ? `Notes: ${part.notes}` : ""}
    `.trim();

    await navigator.clipboard.writeText(info);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: part.title,
        text: part.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyInfo}>
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy Info"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          {part.images && part.images.length > 0 ? (
            <ImageCarousel images={part.images} title={part.title} />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-muted">
              <span className="text-4xl text-muted-foreground">No Images</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">
                {CATEGORY_LABELS[part.category] || part.category}
              </Badge>
              {isRecentlyUpdated(part._updatedAt) && (
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  <Clock className="mr-1 h-3 w-3" />
                  Updated Recently
                </Badge>
              )}
            </div>
            <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground">
              {part.title}
            </h1>
            <p className="mt-4 text-pretty text-muted-foreground">
              {part.description}
            </p>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Select Your State
                </label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select state for pricing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No State Selected</SelectItem>
                    {availableStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {STATE_NAMES[state] || state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {price ? (
                <PriceBreakdown price={price} />
              ) : (
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(part.basePrice)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Base price (select a state to see tax-inclusive pricing)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {part.compatibleTrucks && part.compatibleTrucks.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Compatible Trucks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {part.compatibleTrucks.map((truck) => (
                    <Badge key={truck} variant="secondary">
                      {truck}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {part.notes && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{part.notes}</p>
              </CardContent>
            </Card>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Created {formatDate(part._createdAt)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Updated {formatDate(part._updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
