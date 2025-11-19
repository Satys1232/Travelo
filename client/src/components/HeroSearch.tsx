import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Anchor, Car, Ship, Hotel, MapPin, Search, Calendar } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_beach_sailing_adventure_93433351.png";

export function HeroSearch() {
  const [activeTab, setActiveTab] = useState("tours");
  const [searchParams, setSearchParams] = useState({
    startLocation: "",
    endLocation: "",
    startDate: "",
    endDate: "",
  });

  const activityTypes = [
    { id: "tours", label: "Tours", icon: Anchor },
    { id: "car-rentals", label: "Car Rentals", icon: Car },
    { id: "cruises", label: "Cruises", icon: Ship },
    { id: "hotels", label: "Hotels", icon: Hotel },
  ];

  const handleSearch = () => {
    // Will be connected to backend in integration phase
    console.log("Search params:", { ...searchParams, activityType: activeTab });
  };

  return (
    <div className="relative w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful ocean sailing adventure"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            FIND ALL TOURS, ACTIVITIES AND COURSES!
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Skydive, Surf course, kayak, sailing tours, diving trips, guided tours and much more!
          </p>
        </div>

        {/* Search Card */}
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm p-6 md:p-8">
          {/* Activity Type Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {activityTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.id}
                  variant={activeTab === type.id ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setActiveTab(type.id)}
                  data-testid={`button-activity-${type.id}`}
                >
                  <Icon className="h-4 w-4" />
                  {type.label}
                </Button>
              );
            })}
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Start Location */}
            <div className="lg:col-span-1">
              <Label htmlFor="start-location" className="text-sm font-medium mb-2 block">
                Start Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="start-location"
                  placeholder="Where from?"
                  className="pl-10"
                  value={searchParams.startLocation}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, startLocation: e.target.value })
                  }
                  data-testid="input-start-location"
                />
              </div>
            </div>

            {/* End Location */}
            <div className="lg:col-span-1">
              <Label htmlFor="end-location" className="text-sm font-medium mb-2 block">
                End Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="end-location"
                  placeholder="Where to?"
                  className="pl-10"
                  value={searchParams.endLocation}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, endLocation: e.target.value })
                  }
                  data-testid="input-end-location"
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="lg:col-span-1">
              <Label htmlFor="start-date" className="text-sm font-medium mb-2 block">
                Start Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="start-date"
                  type="date"
                  className="pl-10"
                  value={searchParams.startDate}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, startDate: e.target.value })
                  }
                  data-testid="input-start-date"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="lg:col-span-1">
              <Label htmlFor="end-date" className="text-sm font-medium mb-2 block">
                End Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="end-date"
                  type="date"
                  className="pl-10"
                  value={searchParams.endDate}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, endDate: e.target.value })
                  }
                  data-testid="input-end-date"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1 flex items-end">
              <Button
                className="w-full gap-2"
                size="default"
                onClick={handleSearch}
                data-testid="button-search"
              >
                <Search className="h-4 w-4" />
                SEARCH
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12 max-w-6xl mx-auto">
          {[
            { label: "CERTIFIED AGENTS", value: "500+" },
            { label: "THINGS TO DO", value: "30,000+" },
            { label: "TOUR OPERATORS", value: "3,000+" },
            { label: "RENTAL COMPANIES", value: "500+" },
            { label: "BEST PRICES", value: "100%" },
            { label: "EXCELLENT CUSTOMER SUPPORT", value: "24/7" },
          ].map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs md:text-sm text-white/90 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
