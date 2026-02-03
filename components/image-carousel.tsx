"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-lg bg-muted">
        <div className="relative aspect-[4/3]">
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-4 bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            >
              <span className="sr-only">Go to image {index + 1}</span>
            </button>
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                "relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                index === currentIndex
                  ? "border-foreground"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
