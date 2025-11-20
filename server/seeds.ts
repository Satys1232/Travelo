import { db } from "./db";
import {
  destinations,
  tours,
  reviews,
  instagramPosts,
  type InsertDestination,
  type InsertTour,
  type InsertReview,
  type InsertInstagramPost,
} from "@shared/schema";

// Image paths as strings
const sailingImage = "/attached_assets/Van_adventure_coastal_sunset_cee52344.png";
const coastalRoadImage = "/attached_assets/Van_adventure_coastal_sunset_cee52344.png";
const vanImage = "/attached_assets/Van_adventure_coastal_sunset_cee52344.png";
const australiaImage = "/attached_assets/Australia_Sydney_Opera_House_22227abe.png";
const newZealandImage = "/attached_assets/New_Zealand_mountain_fjord_b8ed5ed8.png";
const fijiImage = "/attached_assets/Fiji_tropical_paradise_beach_ca08e39d.png";
const seAsiaImage = "/attached_assets/Southeast_Asia_temple_landmark_afb74b2d.png";
const usaImage = "/attached_assets/USA_Grand_Canyon_vista_dad411ac.png";
const koalaImage = "/attached_assets/Instagram_koala_wildlife_photo_427260fd.png";
const dogImage = "/attached_assets/Instagram_beach_dog_photo_14c6438c.png";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await db.delete(reviews);
    await db.delete(tours);
    await db.delete(destinations);
    await db.delete(instagramPosts);

    // Seed destinations
    console.log("🗺️  Seeding destinations...");
    const destinationData: InsertDestination[] = [
      {
        name: "Australia",
        slug: "australia",
        description: "Explore the land down under with stunning beaches, vibrant cities, and unique wildlife.",
        imageUrl: australiaImage,
        country: "Australia",
        featured: true,
      },
      {
        name: "New Zealand",
        slug: "new-zealand",
        description: "Discover breathtaking landscapes, from majestic fjords to snow-capped mountains.",
        imageUrl: newZealandImage,
        country: "New Zealand",
        featured: true,
      },
      {
        name: "Fiji",
        slug: "fiji",
        description: "Experience paradise on earth with crystal-clear waters and pristine beaches.",
        imageUrl: fijiImage,
        country: "Fiji",
        featured: true,
      },
      {
        name: "South East Asia",
        slug: "south-east-asia",
        description: "Immerse yourself in rich culture, ancient temples, and exotic cuisine.",
        imageUrl: seAsiaImage,
        country: "Multiple",
        featured: true,
      },
      {
        name: "USA",
        slug: "usa",
        description: "From national parks to vibrant cities, explore the diversity of America.",
        imageUrl: usaImage,
        country: "United States",
        featured: true,
      },
    ];

    const insertedDestinations = await db.insert(destinations).values(destinationData).returning();
    console.log(`✅ Created ${insertedDestinations.length} destinations`);

    // Get destination IDs
    const australia = insertedDestinations.find((d) => d.slug === "australia");
    const newZealand = insertedDestinations.find((d) => d.slug === "new-zealand");
    const fiji = insertedDestinations.find((d) => d.slug === "fiji");
    const seAsia = insertedDestinations.find((d) => d.slug === "south-east-asia");
    const usa = insertedDestinations.find((d) => d.slug === "usa");

    // Seed tours
    console.log("🚢 Seeding tours...");
    const tourData: InsertTour[] = [
      {
        title: "Luxury Sailing Adventure Sydney Harbour",
        slug: "luxury-sailing-adventure-sydney-harbour",
        description: "Experience the ultimate sailing adventure in Sydney Harbour aboard a luxury yacht. Enjoy stunning views of the Opera House and Harbour Bridge while cruising through crystal-clear waters. This exclusive tour includes premium beverages, gourmet snacks, and professional crew guidance. Perfect for couples, families, or groups looking for an unforgettable Australian experience.",
        shortDescription: "Sail Sydney Harbour in luxury with premium service and breathtaking views.",
        price: "530",
        duration: 4,
        location: "Sydney, Australia",
        destinationId: australia?.id,
        imageUrl: sailingImage,
        activityType: "tours",
        maxGroupSize: 12,
        featured: true,
        badge: "Best Seller",
        included: [
          "Professional sailing crew",
          "Premium beverages and champagne",
          "Gourmet cheese and charcuterie platter",
          "Safety equipment and briefing",
          "Complimentary photos",
          "Hotel pickup and drop-off",
        ],
        excluded: [
          "Gratuities",
          "Personal expenses",
          "Additional food items",
        ],
      },
      {
        title: "Great Ocean Road Coastal Tour",
        slug: "great-ocean-road-coastal-tour",
        description: "Drive along one of the world's most scenic coastal routes, the Great Ocean Road. Marvel at the famous Twelve Apostles, explore hidden beaches, and witness stunning ocean vistas. This full-day tour includes stops at picturesque towns, wildlife encounters, and photo opportunities at iconic landmarks. Experience the natural beauty of Australia's southern coast with our expert guides.",
        shortDescription: "Iconic coastal drive featuring the Twelve Apostles and stunning ocean views.",
        price: "530",
        duration: 1,
        location: "Great Ocean Road, Australia",
        destinationId: australia?.id,
        imageUrl: coastalRoadImage,
        activityType: "tours",
        maxGroupSize: 16,
        featured: true,
        badge: "Hot Deal",
        included: [
          "Luxury air-conditioned coach",
          "Expert guide commentary",
          "Entry to National Park",
          "Morning tea and lunch",
          "All stops and photo opportunities",
        ],
        excluded: [
          "Optional helicopter flight",
          "Dinner",
          "Accommodation",
        ],
      },
      {
        title: "Adventure Van Tour Coastal Experience",
        slug: "adventure-van-tour-coastal-experience",
        description: "Join us for an epic camper van adventure along Australia's stunning coastline. This multi-day tour combines the freedom of van life with curated experiences at the best coastal spots. Wake up to ocean views, surf pristine beaches, explore hidden coves, and camp under the stars. All camping equipment, meals, and activities included for the ultimate adventure.",
        shortDescription: "Multi-day camper van coastal adventure with surfing, camping, and sunset views.",
        price: "530",
        duration: 3,
        location: "East Coast, Australia",
        destinationId: australia?.id,
        imageUrl: vanImage,
        activityType: "car-rentals",
        maxGroupSize: 8,
        featured: true,
        badge: "Best Seller",
        included: [
          "Modern camper van rental",
          "All camping equipment",
          "Breakfast and dinner daily",
          "Surf lessons and equipment",
          "National park entry fees",
          "Fuel for the tour",
        ],
        excluded: [
          "Lunch",
          "Personal travel insurance",
          "Optional activities",
        ],
      },
      {
        title: "Milford Sound Cruise and Hike",
        slug: "milford-sound-cruise-and-hike",
        description: "Explore New Zealand's most famous fjord with this comprehensive tour combining cruising and hiking. Glide through Milford Sound's dramatic waters surrounded by towering peaks, cascading waterfalls, and abundant wildlife. The tour includes a guided nature walk through ancient rainforest and a scenic cruise with expert commentary about the fjord's geology and ecology.",
        shortDescription: "Cruise through dramatic fjords with waterfalls, peaks, and pristine nature.",
        price: "645",
        duration: 1,
        location: "Milford Sound, New Zealand",
        destinationId: newZealand?.id,
        imageUrl: newZealandImage,
        activityType: "tours",
        maxGroupSize: 20,
        featured: true,
        included: [
          "2-hour scenic cruise",
          "Guided rainforest walk",
          "Nature guide commentary",
          "Light refreshments",
          "Wildlife spotting",
        ],
        excluded: [
          "Lunch",
          "Hotel transfers",
          "Optional kayaking",
        ],
      },
      {
        title: "Fiji Island Paradise Hopping",
        slug: "fiji-island-paradise-hopping",
        description: "Discover the magic of Fiji's pristine islands on this tropical paradise tour. Visit multiple islands, each offering unique experiences from snorkeling in crystal-clear waters to relaxing on white sand beaches. Enjoy traditional Fijian hospitality, explore vibrant coral reefs, and witness breathtaking sunsets over the Pacific Ocean.",
        shortDescription: "Explore multiple Fiji islands with snorkeling, beaches, and island culture.",
        price: "780",
        duration: 5,
        location: "Fiji Islands",
        destinationId: fiji?.id,
        imageUrl: fijiImage,
        activityType: "cruises",
        maxGroupSize: 15,
        featured: true,
        badge: "Best Seller",
        included: [
          "Island transfers by boat",
          "Snorkeling equipment",
          "All meals and beverages",
          "Beach activities",
          "Cultural village visit",
          "4 nights accommodation",
        ],
        excluded: [
          "International flights",
          "Spa treatments",
          "Alcoholic beverages",
        ],
      },
      {
        title: "Temple Discovery Southeast Asia",
        slug: "temple-discovery-southeast-asia",
        description: "Embark on a cultural journey through Southeast Asia's most magnificent temples. This comprehensive tour takes you to ancient temples, bustling markets, and serene monasteries. Experience the rich spiritual heritage, stunning architecture, and vibrant cultures of Thailand, Cambodia, and Vietnam. Includes expert guides, comfortable accommodations, and authentic local experiences.",
        shortDescription: "Cultural tour of ancient temples and spiritual landmarks across SE Asia.",
        price: "1250",
        duration: 10,
        location: "Thailand, Cambodia, Vietnam",
        destinationId: seAsia?.id,
        imageUrl: seAsiaImage,
        activityType: "tours",
        maxGroupSize: 12,
        featured: false,
        included: [
          "9 nights hotel accommodation",
          "Daily breakfast and dinner",
          "All temple entry fees",
          "Professional tour guides",
          "Internal flights",
          "Cultural performances",
        ],
        excluded: [
          "International flights",
          "Lunch",
          "Travel insurance",
          "Tips and gratuities",
        ],
      },
      {
        title: "Grand Canyon Adventure Experience",
        slug: "grand-canyon-adventure-experience",
        description: "Experience the awe-inspiring beauty of the Grand Canyon with this action-packed adventure tour. Hike along rim trails, photograph stunning vistas at sunrise and sunset, and learn about the canyon's geological history. This tour combines moderate hiking, scenic viewpoints, and cultural insights about Native American heritage in the region.",
        shortDescription: "Explore America's natural wonder with hiking and breathtaking viewpoints.",
        price: "595",
        duration: 2,
        location: "Grand Canyon, Arizona, USA",
        destinationId: usa?.id,
        imageUrl: usaImage,
        activityType: "tours",
        maxGroupSize: 14,
        featured: false,
        included: [
          "Park entrance fees",
          "Expert guide",
          "Hiking equipment",
          "Breakfast and lunch",
          "1 night lodge accommodation",
          "Sunrise and sunset tours",
        ],
        excluded: [
          "Dinner",
          "Helicopter tour",
          "Personal gear",
        ],
      },
    ];

    const insertedTours = await db.insert(tours).values(tourData).returning();
    console.log(`✅ Created ${insertedTours.length} tours`);

    // Seed reviews
    console.log("⭐ Seeding reviews...");
    const reviewData: InsertReview[] = [
      {
        tourId: insertedTours[0].id,
        customerName: "Sarah Johnson",
        customerInitials: "SJ",
        customerLocation: "USA",
        rating: 5,
        comment: "Amazing experience! The tour was well organized and our guide was incredibly knowledgeable. Would definitely recommend to anyone looking for an authentic adventure.",
      },
      {
        tourId: insertedTours[0].id,
        customerName: "Michael Chen",
        customerInitials: "MC",
        customerLocation: "Australia",
        rating: 5,
        comment: "Great value for money. The itinerary was perfectly planned and we got to see so much in just a few days. The accommodation was comfortable and the food was delicious.",
      },
      {
        tourId: insertedTours[1].id,
        customerName: "Emma Wilson",
        customerInitials: "EW",
        customerLocation: "UK",
        rating: 4,
        comment: "Wonderful tour with breathtaking scenery. Our guide made the experience even better with fascinating stories and local insights. Highly recommend!",
      },
      {
        tourId: insertedTours[2].id,
        customerName: "David Martinez",
        customerInitials: "DM",
        customerLocation: "Spain",
        rating: 5,
        comment: "This was the highlight of our trip! Everything was perfect from start to finish. The guides were friendly and professional, and the activities were thrilling.",
      },
      {
        tourId: insertedTours[3].id,
        customerName: "Lisa Anderson",
        customerInitials: "LA",
        customerLocation: "Canada",
        rating: 5,
        comment: "Absolutely stunning! The natural beauty exceeded all expectations. Our guide was patient and ensured everyone had a great time. Can't wait to come back!",
      },
      {
        tourId: insertedTours[4].id,
        customerName: "James Brown",
        customerInitials: "JB",
        customerLocation: "New Zealand",
        rating: 4,
        comment: "Fantastic experience overall. The tour was well-paced and we had plenty of time at each location. The small group size made it feel personalized and intimate.",
      },
    ];

    const insertedReviews = await db.insert(reviews).values(reviewData).returning();
    console.log(`✅ Created ${insertedReviews.length} reviews`);

    // Seed Instagram posts
    console.log("📸 Seeding Instagram posts...");
    const instagramData: InsertInstagramPost[] = [
      {
        imageUrl: koalaImage,
        postUrl: "https://instagram.com/p/tramondoo",
        caption: "Meet our new friend! 🐨",
        order: 1,
        active: true,
      },
      {
        imageUrl: dogImage,
        postUrl: "https://instagram.com/p/tramondoo",
        caption: "Beach vibes 🏖️",
        order: 2,
        active: true,
      },
      {
        imageUrl: koalaImage,
        postUrl: "https://instagram.com/p/tramondoo",
        caption: "Wildlife encounters ✨",
        order: 3,
        active: true,
      },
      {
        imageUrl: dogImage,
        postUrl: "https://instagram.com/p/tramondoo",
        caption: "Paradise found 🌴",
        order: 4,
        active: true,
      },
      {
        imageUrl: koalaImage,
        postUrl: "https://instagram.com/p/tramondoo",
        caption: "Adventure awaits! 🦘",
        order: 5,
        active: true,
      },
      {
        imageUrl: dogImage,
        postUrl: "https://instagram.com/p/tramondoo",
        caption: "Living our best life 🌊",
        order: 6,
        active: true,
      },
    ];

    const insertedPosts = await db.insert(instagramPosts).values(instagramData).returning();
    console.log(`✅ Created ${insertedPosts.length} Instagram posts`);

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }

  process.exit(0);
}

seed();
