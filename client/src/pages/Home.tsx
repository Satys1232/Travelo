import { Header } from "@/components/Header";
import { HeroSearch } from "@/components/HeroSearch";
import { TourCard } from "@/components/TourCard";
import { DestinationCard } from "@/components/DestinationCard";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tour, Destination, Review } from "@shared/schema";
import australiaImage from "@assets/generated_images/Australia_Sydney_Opera_House_22227abe.png";
import newZealandImage from "@assets/generated_images/New_Zealand_mountain_fjord_b8ed5ed8.png";
import fijiImage from "@assets/generated_images/Fiji_tropical_paradise_beach_ca08e39d.png";
import seAsiaImage from "@assets/generated_images/Southeast_Asia_temple_landmark_afb74b2d.png";
import usaImage from "@assets/generated_images/USA_Grand_Canyon_vista_dad411ac.png";

export default function Home() {
  // Fetch featured tours
  const { data: tours, isLoading: toursLoading } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  // Fetch destinations
  const { data: destinations, isLoading: destinationsLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  // Fetch reviews
  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const displayTours = tours || [];
  const displayDestinations = destinations || [];
  const displayReviews = reviews || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Search Section */}
        <HeroSearch />

        {/* Best Sellers & Hot Deals Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                BEST SELLERS & HOT DEALS
              </h2>
              <p className="text-muted-foreground">
                Recommended tours & activities in Sydney
              </p>
            </div>

            {toursLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="w-full aspect-[4/3]" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : displayTours.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {displayTours.slice(0, 6).map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
                <div className="text-center">
                  <Button variant="outline" size="lg" data-testid="button-view-all-tours">
                    View All Tours
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No tours available at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Destinations Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                TOP DESTINATIONS
              </h2>
              <p className="text-muted-foreground">
                Explore our most popular travel destinations
              </p>
            </div>

            {destinationsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-full aspect-square" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {displayDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.slug}
                    name={destination.name}
                    slug={destination.slug}
                    imageUrl={destination.imageUrl}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                CUSTOMER REVIEWS
              </h2>
              <p className="text-muted-foreground">
                What our travelers are saying about their experiences
              </p>
            </div>

            {reviewsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <ReviewCarousel reviews={displayReviews} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
