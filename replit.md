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

### Phase 1: Frontend (Completed)
✅ Complete data schema with all models
✅ Beautiful travel-themed images generated
✅ Design tokens configured (colors, typography, spacing)
✅ Responsive navigation header with mobile menu
✅ Hero search section with activity type filters
✅ Tour cards with ratings, pricing, and badges
✅ Destination showcase cards
✅ Customer review carousel
✅ Footer with Instagram feed & email subscription
✅ Tour listing page with search and filters
✅ Tour detail page with booking information
✅ Destination pages with filtered tours
✅ SEO meta tags and Open Graph implementation

### Phase 2: Backend (In Progress)
- Database implementation with PostgreSQL
- API endpoints for CRUD operations
- Tour search and filtering
- Review submission
- Booking system
- Email subscription handling
- Database seeding with sample data

### Phase 3: Integration (Pending)
- Connect frontend to backend APIs
- Form submissions and validation
- Loading and error states
- Data persistence
- End-to-end testing

## Design Guidelines
The project follows comprehensive design guidelines in `design_guidelines.md`:
- Ocean-themed color palette (blues and teals)
- Open Sans typography
- Consistent spacing system
- Shadcn UI components
- Hover and active state elevation system
- Responsive breakpoints (mobile, tablet, desktop)

## Key User Journeys
1. **Search & Browse Tours**: Hero search → Filter results → View details → Book
2. **Explore Destinations**: Destination cards → Destination page → Tour listing
3. **Read Reviews**: Home page carousel → Tour detail reviews
4. **Subscribe**: Footer email form → Confirmation

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` - Database config

## Development Commands
- `npm run dev` - Start development server
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Recent Changes
- **2024-11-19**: Initial project setup with complete frontend implementation
- Generated 10 professional travel images for tours and destinations
- Implemented all core components and pages
- Configured design system with ocean theme

## User Preferences
None specified yet.

## Next Steps
1. Complete backend API implementation
2. Connect frontend to backend with TanStack Query
3. Add authentication system
4. Implement booking flow
5. Add payment integration
6. Deploy to production
