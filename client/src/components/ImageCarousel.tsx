import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DesignImage } from "@shared/schema";

interface ImageCarouselProps {
  images: DesignImage[];
  title: string;
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  if (images.length === 0) {
    return (
      <div className="aspect-[4/5] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] bg-muted rounded-lg overflow-hidden group">
        {imageErrors.has(currentIndex) ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-4">
              <svg
                className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-muted-foreground">Image not available</p>
            </div>
          </div>
        ) : (
          <img
            src={images[currentIndex].imageUrl}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            data-testid={`carousel-image-${currentIndex}`}
            onError={() => handleImageError(currentIndex)}
          />
        )}
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToPrevious}
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToNext}
              data-testid="button-carousel-next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  data-testid={`carousel-dot-${index}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                index === currentIndex
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              data-testid={`carousel-thumb-${index}`}
            >
              {imageErrors.has(index) ? (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <svg
                    className="h-6 w-6 text-muted-foreground/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              ) : (
                <img
                  src={image.imageUrl}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(index)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
