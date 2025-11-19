import { useRoute } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { TourCard } from "@/components/TourCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import type { Destination, Tour } from "@shared/schema";
import australiaImage from "@assets/Australia_Sydney_Opera_House_22227abe.png";
import newZealandImage from "@assets/New_Zealand_mountain_fjord_b8ed5ed8.png";
import fijiImage from "@assets/Fiji_tropical_paradise_beach_ca08e39d.png";
import seAsiaImage from "@assets/Southeast_Asia_temple_landmark_afb74b2d.png";
import usaImage from "@assets/USA_Grand_Canyon_vista_dad411ac.png";

export default function DestinationPage() {
  const [, params] = useRoute("/destinations/:slug");
  const slug = params?.slug;

  const { data: destination, isLoading: destinationLoading } = useQuery<Destination>({
    queryKey: [`/api/destinations/${slug}`],
    enabled: !!slug,
  });

  const { data: tours, isLoading: toursLoading } = useQuery<Tour[]>({
    queryKey: [`/api/destinations/${slug}/tours`],
    enabled: !!slug && !!destination,
  });

  const displayTours = tours || [];

  if (destinationLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Skeleton className="w-full h-96 md:h-[500px]" />
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Skeleton className="h-8 w-64 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="w-full aspect-[4/3]" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The destination you're looking for doesn't exist.
            </p>
            <Button onClick={() => window.location.href = "/"}>
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative w-full h-96 md:h-[500px]">
          <img
            src={destination.imageUrl!}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-destination-name">
                {destination.name}
              </h1>
              {destination.description && (
                <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                  {destination.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tours Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">
              Tours & Activities in {destination.name}
            </h2>

            {toursLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="w-full aspect-[4/3]" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : displayTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No tours available for this destination at the moment.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Check back soon for new adventures!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
