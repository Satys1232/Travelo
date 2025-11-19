import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Review } from "@shared/schema";

interface ReviewCarouselProps {
  reviews: Review[];
}

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No reviews yet</p>
      </div>
    );
  }

  // Show 3 reviews at a time on desktop, 1 on mobile
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = currentIndex * reviewsPerPage;
  const visibleReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <div className="space-y-6">
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleReviews.map((review, index) => (
          <Card key={review.id} className="hover-elevate transition-all" data-testid={`card-review-${startIndex + index}`}>
            <CardContent className="p-6 space-y-4">
              {/* Quote Icon */}
              <Quote className="h-10 w-10 text-muted-foreground/30" />

              {/* Review Text */}
              <p className="text-sm text-muted-foreground italic leading-relaxed line-clamp-4" data-testid="text-review-comment">
                {review.comment}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3 pt-2">
                <Avatar className="h-12 w-12 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold" data-testid="avatar-initials">
                    {review.customerInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm" data-testid="text-customer-name">
                    {review.customerName}
                  </div>
                  <div className="text-xs text-muted-foreground" data-testid="text-customer-location">
                    {review.customerLocation}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            data-testid="button-review-previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted hover-elevate"
                }`}
                data-testid={`button-review-dot-${index}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex === totalPages - 1}
            data-testid="button-review-next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
