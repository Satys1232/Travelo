import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Heart } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import type { Tour } from "@shared/schema";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const rating = parseFloat(tour.rating || "0");
  const price = parseFloat(tour.price || "0");

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {tour.badge && (
            <Badge
              variant={tour.badge === "Best Seller" ? "default" : "destructive"}
              className="shadow-lg"
              data-testid={`badge-${tour.badge.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {tour.badge}
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          data-testid="button-favorite"
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
          />
        </Button>
      </div>

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <Link href={`/tours/${tour.slug}`} data-testid="link-tour-detail">
          <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors line-clamp-2 cursor-pointer">
            {tour.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span data-testid="text-location">{tour.location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground" data-testid="text-review-count">
            ({tour.reviewCount || 0})
          </span>
        </div>

        {/* Duration */}
        {tour.duration && (
          <div className="flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span data-testid="text-duration">
              {tour.duration} {tour.duration === 1 ? "day" : "days"}
            </span>
          </div>
        )}

        {/* Description */}
        {tour.shortDescription && (
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid="text-description">
            {tour.shortDescription}
          </p>
        )}
      </CardContent>

      {/* Footer with Pricing */}
      <CardFooter className="p-4 pt-0 flex items-center justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-primary" data-testid="text-price">
            ${price.toFixed(0)}
          </div>
          <div className="text-xs text-muted-foreground">per person</div>
        </div>
        <Link href={`/tours/${tour.slug}`} asChild>
          <Button data-testid="button-view-details">READ MORE</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
