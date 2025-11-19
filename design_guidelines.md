# Travel Agency Website - Design Guidelines

## Design Approach
**Reference-Based Design**: Drawing inspiration from established travel platforms (Airbnb, Booking.com, Expedia) with an ocean-themed aesthetic to evoke wanderlust and trust.

## Core Design Principles
- **Visual storytelling** through destination imagery
- **Trust-building** through social proof (reviews, ratings, certifications)
- **Conversion-focused** layout with clear CTAs and search functionality
- **Information hierarchy** that balances inspiration with practical booking details

---

## Typography System

**Font Families**:
- Primary: Clean sans-serif (system font stack)
- Headings: Medium to bold weights (500-700)
- Body: Regular weight (400)

**Type Scale**:
- Hero headlines: text-5xl to text-6xl
- Section headers: text-3xl to text-4xl
- Card titles: text-xl to text-2xl
- Body text: text-base
- Metadata/labels: text-sm to text-xs

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16, py-24
- Card gaps: gap-4, gap-6, gap-8

**Grid Structures**:
- Tour cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Destination showcase: grid-cols-1 md:grid-cols-2 lg:grid-cols-5
- Instagram feed: grid-cols-3 md:grid-cols-6
- Review cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

**Container Widths**:
- Max content width: max-w-7xl
- Centered with mx-auto
- Full-width sections with inner containers

---

## Component Library

### Navigation Header
- Fixed/sticky navigation with logo left, menu center, auth/cart right
- Menu items: What We Offer, Sale, Blog, About Us, Get In Touch
- Shopping cart icon with badge counter
- Login/Signup buttons with subtle styling
- Mobile hamburger menu for responsive design

### Hero Search Section
- Large hero image with overlay
- Prominent search form with:
  - Start location dropdown/input
  - End location dropdown/input
  - Date range picker (check-in/check-out)
  - Activity type selector (Tours, Car Rentals, Cruises, Hotels)
  - Primary search CTA button
- Search form on blurred/semi-transparent card overlay
- Hero height: min-h-[600px] to min-h-[700px]

### Tour Package Cards
- Card structure: image, content area, pricing footer
- Image aspect ratio: 16:9 or 4:3
- Content includes:
  - Tour title (bold, text-lg)
  - Location with pin icon
  - Star rating (5-star display)
  - Duration badge
  - Brief description (2-3 lines)
- Pricing footer: From $XXX per person, "Book Now" CTA
- Hover effect: subtle shadow lift

### Destination Cards
- Large image cards with destination name overlay
- Gradient overlay for text readability
- Grid layout: 5 columns on desktop, stacked on mobile
- Destinations: Australia, New Zealand, Fiji, South East Asia, USA

### Review/Testimonial Cards
- Customer photo (circular avatar)
- Star rating display
- Review text (2-4 lines)
- Customer name and location
- Carousel/slider implementation for multiple reviews

### Footer
- Multi-column layout: 4-5 columns on desktop
- Instagram feed section: 6 recent photos in grid
- Email subscription: Input field + Subscribe button
- Navigation columns:
  - Quick Links (What We Offer, Sale, Blog, About Us)
  - Destinations (Australia, NZ, Fiji, SE Asia, USA)
  - Account (Login, My Bookings, Profile)
- Certification badges/trust symbols
- Social media icons
- Copyright and legal links at bottom

### Filter Bar
- Horizontal tabs/pills for activity types
- Active state highlighting
- Filter options: All Tours, Car Rentals, Cruises, Hotels
- Optional price range slider and additional filters

---

## Images

**Hero Section**:
- Large panoramic travel image (beach, mountains, or iconic destination)
- Optimized for web, high resolution
- Image aspect: Wide landscape covering full viewport width
- Overlay: Dark gradient (40-60% opacity) for text readability

**Tour Cards** (3-6 images needed per card):
- Destination-specific imagery
- Mixed content: landscapes, activities, accommodations
- Size: 800x600px minimum
- Diverse representation of each tour offering

**Destination Showcase** (5 hero images):
- Australia: Sydney Opera House/Great Barrier Reef
- New Zealand: Milford Sound/mountains
- Fiji: Beach/resort imagery
- South East Asia: Temples/beaches/cultural sites
- USA: Mix of cities/national parks

**Instagram Feed** (6+ square images):
- 1:1 aspect ratio
- Travel moments, customer photos, destinations
- Curated aesthetic matching brand

**Review Section**:
- Customer headshots/avatars (circular)
- Optional: Background destination images with reviews overlaid

---

## Interaction Patterns

- **Minimal animations**: Smooth transitions only (0.3s ease)
- **Hover states**: Subtle shadow lifts, scale transforms (scale-105)
- **Loading states**: Skeleton screens for tour cards
- **Form validation**: Inline error messages in red
- **CTAs**: Primary buttons with clear hover states
- **Carousel controls**: Arrow buttons + dot indicators for reviews

---

## Responsive Behavior

**Mobile** (<768px):
- Stack all multi-column grids to single column
- Simplify navigation to hamburger menu
- Hero search form: vertical stack of inputs
- Touch-friendly button sizes (min 44px height)

**Tablet** (768px-1024px):
- 2-column grids for tour cards
- Condensed navigation
- Reduced hero height

**Desktop** (>1024px):
- Full multi-column layouts
- Enhanced spacing and imagery
- Sticky navigation header