# Tramondoo - Travel Agency Website

## Overview
A full-featured travel agency website for browsing and booking tours, activities, and travel packages worldwide. Built with modern web technologies and featuring a beautiful ocean-themed design.

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Form Handling**: React Hook Form with Zod validation

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/          # Shadcn UI components
│   │   │   ├── Header.tsx   # Main navigation header
│   │   │   ├── Footer.tsx   # Footer with Instagram feed & subscription
│   │   │   ├── HeroSearch.tsx  # Hero section with search
│   │   │   ├── TourCard.tsx    # Tour package card component
│   │   │   ├── DestinationCard.tsx  # Destination showcase card
│   │   │   └── ReviewCarousel.tsx   # Customer reviews carousel
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx     # Landing page
│   │   │   ├── Tours.tsx    # Tour listing with filters
│   │   │   ├── TourDetail.tsx   # Individual tour detail
│   │   │   └── Destination.tsx  # Destination-specific tours
│   │   ├── lib/             # Utilities
│   │   │   ├── queryClient.ts  # TanStack Query config
│   │   │   └── utils.ts        # Helper functions
│   │   ├── hooks/           # Custom React hooks
│   │   ├── App.tsx          # Main app component with routing
│   │   ├── index.css        # Global styles & theme
│   │   └── main.tsx         # App entry point
│   └── index.html           # HTML template
├── server/
│   ├── index.ts             # Express server setup
│   ├── routes.ts            # API route definitions
│   ├── storage.ts           # Data access layer (IStorage interface)
│   └── db.ts                # Database connection
├── shared/
│   └── schema.ts            # Database schema & TypeScript types
├── attached_assets/
│   └── generated_images/    # Generated travel images
└── replit.md                # This file
```

## Database Schema

### Tables
1. **users** - User accounts
2. **destinations** - Travel destinations (Australia, NZ, Fiji, SE Asia, USA)
3. **tours** - Tour packages and activities
4. **reviews** - Customer reviews and ratings
5. **bookings** - Tour bookings and reservations
6. **emailSubscriptions** - Newsletter subscriptions
7. **instagramPosts** - Instagram feed photos

### Key Relationships
- Tours belong to Destinations
- Reviews belong to Tours
- Bookings belong to Tours and Users (optional)

## Features Implemented

### ✅ Full Stack Application (Completed)

#### Core Pages & Navigation
✅ Complete data schema with all models
✅ Beautiful travel-themed images
✅ Design tokens configured (colors, typography, spacing)
✅ Responsive navigation header with mobile menu and all functional links
✅ Professional "Coming Soon" placeholder pages for pending routes
✅ SEO meta tags and Open Graph implementation

#### Home Page
✅ Hero search section with comprehensive filters (activity type, destination, dates, locations, search)
✅ Hero search navigation to Tours page with ALL parameters preserved
✅ Destination showcase cards
✅ Customer review carousel
✅ Footer with Instagram feed connected to backend API
✅ Footer email subscription form with validation

#### Tours Page (Advanced Features)
✅ URL-driven filter state management (single source of truth architecture)
✅ Reactive filters that preserve ALL URL parameters from Hero search
✅ Search by tour name or location (with real-time filtering)
✅ Filter by activity type (tours, cruises, car rentals)
✅ Filter by destination (Australia, New Zealand, Fiji, etc.)
✅ Client-side sorting by price (low/high), rating, duration, and featured
✅ Tour cards with ratings, pricing, badges, and booking buttons
✅ Clear filters button to reset all criteria
✅ Professional loading states with skeletons
✅ No results state with helpful messaging

#### Tour Detail Page
✅ Complete tour information with images and details
✅ Booking dialog with comprehensive form (dates, guests, contact info, special requests)
✅ Review submission form with rating, title, and comment
✅ Review display with user ratings and feedback
✅ Related tours suggestions

#### Backend & Database
✅ Database implementation with PostgreSQL
✅ API endpoints for tours, destinations, reviews, bookings, Instagram
✅ Tour search and filtering with query parameters
✅ Review submission with validation
✅ Booking system with all required fields (including specialRequests)
✅ Email subscription handling
✅ Instagram feed API integration
✅ Database seeding with sample data
✅ Frontend connected to backend APIs
✅ Form submissions and validation
✅ Loading and error states
✅ Data persistence with TanStack Query

## Design Guidelines
The project follows comprehensive design guidelines in `design_guidelines.md`:
- Ocean-themed color palette (blues and teals)
- Open Sans typography
- Consistent spacing system
- Shadcn UI components
- Hover and active state elevation system
- Responsive breakpoints (mobile, tablet, desktop)

## Key User Journeys
1. **Search & Browse Tours**: Hero search (with activity type, destination, dates, locations) → Tours page (ALL parameters preserved) → Modify filters/sorting → View tour details → Submit booking
2. **Explore Destinations**: Destination cards → Destination page → Tour listing with filters
3. **Book a Tour**: Browse tours → Tour detail → Booking dialog (dates, guests, contact, special requests) → Submit booking
4. **Leave Review**: Tour detail → Review form → Submit rating and feedback
5. **Subscribe to Newsletter**: Footer email form → Validation → Confirmation
6. **Browse by Activity**: Hero search activity type (Tours/Cruises/Car Rentals) → Filtered results

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` - Database config

## Development Commands
- `npm run dev` - Start development server
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Recent Changes
- **2024-11-20**: Completed all professional features and UX improvements
  - **Hero Search Enhancement**: Fully functional search with ALL parameters (activityType, destination, search, startLocation, startDate, endDate) seamlessly navigating to Tours page
  - **Tours Page Refactor**: Implemented URL-driven filter state management (single source of truth)
    - Reactive filter updates using wouter location hooks
    - All Hero search parameters preserved through filter/sort interactions
    - Fixed infinite navigation loops by eliminating state duplication
    - updateFilters reads fresh URLSearchParams at call time to prevent stale data
  - **Client-Side Sorting**: Added professional sorting by price (low/high), rating, duration, and featured
  - **Booking Dialog**: Complete form with all fields including specialRequests sent to backend API
  - **Review System**: Fully functional review submission with rating, title, and comment
  - **Footer Integration**: Connected Instagram feed to /api/instagram backend endpoint
  - **Navigation**: All header links functional with professional Coming Soon placeholders
  - **Professional UX**: Seamless navigation, immediate filter updates, no page reloads, proper loading states
  
- **2024-11-20**: Project successfully imported and configured for Replit environment
  - Installed Node.js 20 and all dependencies
  - Provisioned PostgreSQL database and pushed schema
  - Seeded database with sample destinations, tours, reviews, and Instagram posts
  - Fixed image import paths from attached_assets directory
  - Fixed React component issues (nested anchor tags)
  - Configured development workflow on port 5000
  - Configured deployment with autoscale (build + production start)
  - All features working correctly: frontend, backend API, database

- **2024-11-19**: Initial project setup with complete frontend implementation
  - Generated professional travel images for tours and destinations
  - Implemented all core components and pages
  - Configured design system with ocean theme

## User Preferences
None specified yet.

## Next Steps
1. ✅ ~~Complete backend API implementation~~ (Done)
2. ✅ ~~Connect frontend to backend with TanStack Query~~ (Done)
3. Add authentication system (if needed)
4. Implement full booking flow with payment processing
5. Add payment integration (Stripe recommended)
6. Test and deploy to production using the Deploy button
