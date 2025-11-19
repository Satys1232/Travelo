import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TourCard } from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Tour } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Tours() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activityType, setActivityType] = useState("all");
  const [destination, setDestination] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const { data: tours, isLoading } = useQuery<Tour[]>({
    queryKey: ["/api/tours", { activityType, destination, search: searchQuery }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activityType && activityType !== "all") params.set("activityType", activityType);
      if (destination && destination !== "all") params.set("destination", destination);
      if (searchQuery) params.set("search", searchQuery);
      
      const url = `/api/tours${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url, { credentials: "include" });
      
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      
      return res.json();
    },
  });

  const displayTours = tours || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Tours
            </h1>
            <p className="text-lg opacity-90">
              Find the perfect adventure for your next journey
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-card border-b py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <Label htmlFor="search">Search Tours</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-tours"
                  />
                </div>
              </div>

              {/* Activity Type */}
              <div>
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select value={activityType} onValueChange={setActivityType}>
                  <SelectTrigger id="activity-type" data-testid="select-activity-type">
                    <SelectValue placeholder="All Activities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="tours">Tours</SelectItem>
                    <SelectItem value="car-rentals">Car Rentals</SelectItem>
                    <SelectItem value="cruises">Cruises</SelectItem>
                    <SelectItem value="hotels">Hotels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Destination */}
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger id="destination" data-testid="select-destination">
                    <SelectValue placeholder="All Destinations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Destinations</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="new-zealand">New Zealand</SelectItem>
                    <SelectItem value="fiji">Fiji</SelectItem>
                    <SelectItem value="south-east-asia">South East Asia</SelectItem>
                    <SelectItem value="usa">USA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <Label htmlFor="sort-by">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by" data-testid="select-sort-by">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {isLoading ? (
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
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground" data-testid="text-tour-count">
                    Showing {displayTours.length} tours
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No tours found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setActivityType("all");
                    setDestination("all");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
