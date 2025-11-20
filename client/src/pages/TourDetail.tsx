import { useRoute } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingDialog } from "@/components/BookingDialog";
import { ReviewForm } from "@/components/ReviewForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Check,
  X,
  Calendar,
  Heart,
} from "lucide-react";
import { useState } from "react";
import type { Tour, Review } from "@shared/schema";

export default function TourDetail() {
  const [, params] = useRoute("/tours/:slug");
  const slug = params?.slug;
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const { data: tour, isLoading } = useQuery<Tour>({
    queryKey: [`/api/tours/${slug}`],
    enabled: !!slug,
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: [`/api/tours/${slug}/reviews`],
    enabled: !!slug && !!tour,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <Skeleton className="w-full h-96 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Tour Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The tour you're looking for doesn't exist.
            </p>
            <Button onClick={() => window.location.href = "/tours"}>
              Browse All Tours
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const price = parseFloat(tour.price || "0");
  const rating = parseFloat(tour.rating || "0");
  const included = tour.included || [];
  const excluded = tour.excluded || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative w-full h-96 md:h-[500px]">
          <img
            src={tour.imageUrl}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto">
              {tour.badge && (
                <Badge
                  variant={tour.badge === "Best Seller" ? "default" : "destructive"}
                  className="mb-2"
                >
                  {tour.badge}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-2" data-testid="text-tour-title">
                {tour.title}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span data-testid="text-tour-location">{tour.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span data-testid="text-tour-duration">
                    {tour.duration} {tour.duration === 1 ? "day" : "days"}
                  </span>
                </div>
                {tour.maxGroupSize && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Max {tour.maxGroupSize} people</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-tour-description">
                  {tour.description}
                </p>
              </section>

              <Separator />

              {/* What's Included */}
              {included.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* What's Not Included */}
              {excluded.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">What's Not Included</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <Separator />

              {/* Reviews */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {reviews && reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.slice(0, 3).map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
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
                            <span className="font-semibold text-sm">
                              {review.customerName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              from {review.customerLocation}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this tour!</p>
                )}
              </section>

              <Separator />

              {/* Write a Review */}
              <section>
                <ReviewForm tour={tour} />
              </section>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <div className="flex items-baseline gap-2 mb-4">
                    <div className="text-4xl font-bold text-primary" data-testid="text-tour-price">
                      ${price.toFixed(0)}
                    </div>
                    <div className="text-sm text-muted-foreground">per person</div>
                  </div>
                  {rating > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex">
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
                      <span className="text-sm text-muted-foreground">
                        {rating.toFixed(1)} ({tour.reviewCount || 0} reviews)
                      </span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full gap-2" 
                    size="lg" 
                    onClick={() => setBookingOpen(true)}
                    data-testid="button-book-now"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setIsFavorite(!isFavorite)}
                    data-testid="button-add-to-wishlist"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isFavorite ? "fill-destructive text-destructive" : ""
                      }`}
                    />
                    {isFavorite ? "Saved" : "Add to Wishlist"}
                  </Button>
                  <Separator />
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex justify-between">
                      <span>Free Cancellation</span>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex justify-between">
                      <span>Instant Confirmation</span>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex justify-between">
                      <span>Mobile Ticket</span>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {tour && (
        <BookingDialog 
          tour={tour} 
          open={bookingOpen} 
          onOpenChange={setBookingOpen} 
        />
      )}
    </div>
  );
}
