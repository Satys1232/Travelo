import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertTourSchema,
  insertDestinationSchema,
  insertReviewSchema,
  insertBookingSchema,
  insertEmailSubscriptionSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Tours routes
  app.get("/api/tours", async (req, res) => {
    try {
      const { activityType, destination, search } = req.query;
      const tours = await storage.getAllTours({
        activityType: activityType as string,
        destination: destination as string,
        search: search as string,
      });
      res.json(tours);
    } catch (error) {
      console.error("Error fetching tours:", error);
      res.status(500).json({ error: "Failed to fetch tours" });
    }
  });

  app.get("/api/tours/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const tour = await storage.getTourBySlug(slug);
      
      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }
      
      res.json(tour);
    } catch (error) {
      console.error("Error fetching tour:", error);
      res.status(500).json({ error: "Failed to fetch tour" });
    }
  });

  app.post("/api/tours", async (req, res) => {
    try {
      const validatedData = insertTourSchema.parse(req.body);
      const tour = await storage.createTour(validatedData);
      res.status(201).json(tour);
    } catch (error) {
      console.error("Error creating tour:", error);
      res.status(400).json({ error: "Invalid tour data" });
    }
  });

  // Destinations routes
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getAllDestinations();
      res.json(destinations);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      res.status(500).json({ error: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const destination = await storage.getDestinationBySlug(slug);
      
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      
      res.json(destination);
    } catch (error) {
      console.error("Error fetching destination:", error);
      res.status(500).json({ error: "Failed to fetch destination" });
    }
  });

  app.get("/api/destinations/:slug/tours", async (req, res) => {
    try {
      const { slug } = req.params;
      const destination = await storage.getDestinationBySlug(slug);
      
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      
      const tours = await storage.getToursByDestination(destination.id);
      res.json(tours);
    } catch (error) {
      console.error("Error fetching destination tours:", error);
      res.status(500).json({ error: "Failed to fetch tours" });
    }
  });

  app.post("/api/destinations", async (req, res) => {
    try {
      const validatedData = insertDestinationSchema.parse(req.body);
      const destination = await storage.createDestination(validatedData);
      res.status(201).json(destination);
    } catch (error) {
      console.error("Error creating destination:", error);
      res.status(400).json({ error: "Invalid destination data" });
    }
  });

  // Reviews routes
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getAllReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.get("/api/tours/:slug/reviews", async (req, res) => {
    try {
      const { slug } = req.params;
      const tour = await storage.getTourBySlug(slug);
      
      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }
      
      const reviews = await storage.getReviewsByTourId(tour.id);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching tour reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  // Bookings routes
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await storage.getBookingById(id);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      res.json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  // Email subscriptions routes
  app.post("/api/subscriptions", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      
      // Check if email already subscribed
      const existing = await storage.getSubscriptionByEmail(validatedData.email);
      if (existing) {
        return res.status(400).json({ error: "Email already subscribed" });
      }
      
      const subscription = await storage.createSubscription(validatedData);
      res.status(201).json({ message: "Successfully subscribed", subscription });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(400).json({ error: "Invalid subscription data" });
    }
  });

  // Instagram posts routes
  app.get("/api/instagram", async (req, res) => {
    try {
      const posts = await storage.getActiveInstagramPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching instagram posts:", error);
      res.status(500).json({ error: "Failed to fetch instagram posts" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
