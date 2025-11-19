import {
  users,
  destinations,
  tours,
  reviews,
  bookings,
  emailSubscriptions,
  instagramPosts,
  type User,
  type InsertUser,
  type Destination,
  type InsertDestination,
  type Tour,
  type InsertTour,
  type Review,
  type InsertReview,
  type Booking,
  type InsertBooking,
  type EmailSubscription,
  type InsertEmailSubscription,
  type InstagramPost,
  type InsertInstagramPost,
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and, or, desc, sql, ilike } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Destination methods
  getAllDestinations(): Promise<Destination[]>;
  getDestinationBySlug(slug: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;

  // Tour methods
  getAllTours(filters?: {
    activityType?: string;
    destination?: string;
    search?: string;
  }): Promise<Tour[]>;
  getTourBySlug(slug: string): Promise<Tour | undefined>;
  getToursByDestination(destinationId: string): Promise<Tour[]>;
  createTour(tour: InsertTour): Promise<Tour>;

  // Review methods
  getReviewsByTourId(tourId: string): Promise<Review[]>;
  getAllReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Booking methods
  getBookingById(id: string): Promise<Booking | undefined>;
  getBookingsByUserId(userId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;

  // Email subscription methods
  getSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined>;
  createSubscription(
    subscription: InsertEmailSubscription,
  ): Promise<EmailSubscription>;

  // Instagram posts methods
  getActiveInstagramPosts(): Promise<InstagramPost[]>;
  createInstagramPost(post: InsertInstagramPost): Promise<InstagramPost>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Destination methods
  async getAllDestinations(): Promise<Destination[]> {
    return await db.select().from(destinations).orderBy(destinations.name);
  }

  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    const [destination] = await db
      .select()
      .from(destinations)
      .where(eq(destinations.slug, slug));
    return destination || undefined;
  }

  async createDestination(
    insertDestination: InsertDestination,
  ): Promise<Destination> {
    const [destination] = await db
      .insert(destinations)
      .values(insertDestination)
      .returning();
    return destination;
  }

  // Tour methods
  async getAllTours(filters?: {
    activityType?: string;
    destination?: string;
    search?: string;
  }): Promise<Tour[]> {
    let query = db.select().from(tours);

    const conditions = [];

    if (filters?.activityType && filters.activityType !== "all") {
      conditions.push(eq(tours.activityType, filters.activityType));
    }

    if (filters?.destination && filters.destination !== "all") {
      // Find destination by slug
      const dest = await this.getDestinationBySlug(filters.destination);
      if (dest) {
        conditions.push(eq(tours.destinationId, dest.id));
      }
    }

    if (filters?.search) {
      conditions.push(
        or(
          ilike(tours.title, `%${filters.search}%`),
          ilike(tours.location, `%${filters.search}%`),
          ilike(tours.description, `%${filters.search}%`),
        )!,
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)!) as any;
    }

    return await query.orderBy(desc(tours.featured), desc(tours.rating));
  }

  async getTourBySlug(slug: string): Promise<Tour | undefined> {
    const [tour] = await db.select().from(tours).where(eq(tours.slug, slug));
    return tour || undefined;
  }

  async getToursByDestination(destinationId: string): Promise<Tour[]> {
    return await db
      .select()
      .from(tours)
      .where(eq(tours.destinationId, destinationId))
      .orderBy(desc(tours.featured), desc(tours.rating));
  }

  async createTour(insertTour: InsertTour): Promise<Tour> {
    const [tour] = await db.insert(tours).values(insertTour).returning();
    return tour;
  }

  // Review methods
  async getReviewsByTourId(tourId: string): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.tourId, tourId))
      .orderBy(desc(reviews.createdAt));
  }

  async getAllReviews(): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .orderBy(desc(reviews.createdAt))
      .limit(12);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();

    // Update tour rating and review count
    const tourReviews = await this.getReviewsByTourId(insertReview.tourId!);
    const avgRating =
      tourReviews.reduce((sum, r) => sum + r.rating, 0) / tourReviews.length;

    await db
      .update(tours)
      .set({
        rating: avgRating.toFixed(1),
        reviewCount: tourReviews.length,
      })
      .where(eq(tours.id, insertReview.tourId!));

    return review;
  }

  // Booking methods
  async getBookingById(id: string): Promise<Booking | undefined> {
    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, id));
    return booking || undefined;
  }

  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values({
        ...insertBooking,
        startDate: new Date(insertBooking.startDate),
        endDate: insertBooking.endDate ? new Date(insertBooking.endDate) : null,
      })
      .returning();
    return booking;
  }

  // Email subscription methods
  async getSubscriptionByEmail(
    email: string,
  ): Promise<EmailSubscription | undefined> {
    const [subscription] = await db
      .select()
      .from(emailSubscriptions)
      .where(eq(emailSubscriptions.email, email));
    return subscription || undefined;
  }

  async createSubscription(
    insertSubscription: InsertEmailSubscription,
  ): Promise<EmailSubscription> {
    const [subscription] = await db
      .insert(emailSubscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  // Instagram posts methods
  async getActiveInstagramPosts(): Promise<InstagramPost[]> {
    return await db
      .select()
      .from(instagramPosts)
      .where(eq(instagramPosts.active, true))
      .orderBy(instagramPosts.order);
  }

  async createInstagramPost(
    insertPost: InsertInstagramPost,
  ): Promise<InstagramPost> {
    const [post] = await db
      .insert(instagramPosts)
      .values(insertPost)
      .returning();
    return post;
  }
}

export const storage = new DatabaseStorage();
