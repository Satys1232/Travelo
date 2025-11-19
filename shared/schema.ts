import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Destinations table
export const destinations = pgTable("destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  country: text("country"),
  featured: boolean("featured").default(false),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

// Tours table
export const tours = pgTable("tours", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(), // in days
  location: text("location").notNull(),
  destinationId: varchar("destination_id").references(() => destinations.id),
  imageUrl: text("image_url").notNull(),
  activityType: text("activity_type").notNull(), // tours, car-rentals, cruises, hotels
  rating: decimal("rating", { precision: 2, scale: 1 }).default('0'),
  reviewCount: integer("review_count").default(0),
  maxGroupSize: integer("max_group_size"),
  featured: boolean("featured").default(false),
  badge: text("badge"), // "Best Seller", "Hot Deal", etc.
  itinerary: text("itinerary"), // JSON string of itinerary items
  included: text("included").array(), // array of included items
  excluded: text("excluded").array(), // array of excluded items
  createdAt: timestamp("created_at").defaultNow(),
});

export const toursRelations = relations(tours, ({ one, many }) => ({
  destination: one(destinations, {
    fields: [tours.destinationId],
    references: [destinations.id],
  }),
  reviews: many(reviews),
  bookings: many(bookings),
}));

export const insertTourSchema = createInsertSchema(tours).omit({
  id: true,
  createdAt: true,
  rating: true,
  reviewCount: true,
});

export type InsertTour = z.infer<typeof insertTourSchema>;
export type Tour = typeof tours.$inferSelect;

// Reviews table
export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tourId: varchar("tour_id").references(() => tours.id),
  customerName: text("customer_name").notNull(),
  customerInitials: text("customer_initials").notNull(),
  customerLocation: text("customer_location").notNull(),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  tour: one(tours, {
    fields: [reviews.tourId],
    references: [tours.id],
  }),
}));

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

// Bookings table
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tourId: varchar("tour_id").references(() => tours.id).notNull(),
  userId: varchar("user_id").references(() => users.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  numberOfPeople: integer("number_of_people").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"), // pending, confirmed, cancelled
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookingsRelations = relations(bookings, ({ one }) => ({
  tour: one(tours, {
    fields: [bookings.tourId],
    references: [tours.id],
  }),
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
}));

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
}).extend({
  startDate: z.string(), // Allow string dates from frontend
  endDate: z.string().optional(),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Email Subscriptions table
export const emailSubscriptions = pgTable("email_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribed: boolean("subscribed").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEmailSubscriptionSchema = createInsertSchema(emailSubscriptions).omit({
  id: true,
  createdAt: true,
  subscribed: true,
});

export type InsertEmailSubscription = z.infer<typeof insertEmailSubscriptionSchema>;
export type EmailSubscription = typeof emailSubscriptions.$inferSelect;

// Instagram posts table (for the footer feed)
export const instagramPosts = pgTable("instagram_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull(),
  postUrl: text("post_url"),
  caption: text("caption"),
  order: integer("order").default(0),
  active: boolean("active").default(true),
});

export const insertInstagramPostSchema = createInsertSchema(instagramPosts).omit({
  id: true,
});

export type InsertInstagramPost = z.infer<typeof insertInstagramPostSchema>;
export type InstagramPost = typeof instagramPosts.$inferSelect;
