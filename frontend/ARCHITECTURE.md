# AutoJobFlow Architecture

## Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     User Visits Site                         │
│                          ↓                                    │
│                   app/page.tsx                               │
│                  (Auto redirect)                             │
│                          ↓                                    │
│               /landing (Public Route)                        │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Landing Page Features:                            │    │
│  │  • Hero section with CTA                          │    │
│  │  • How it works (3 steps)                         │    │
│  │  • Why AutoJobFlow (4 benefits)                   │    │
│  │  • Sign up / Start swiping CTAs                   │    │
│  └────────────────────────────────────────────────────┘    │
│                          ↓                                    │
│                  User clicks "Start Swiping"                 │
│                          ↓                                    │
│                   /jobs (Dashboard)                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Jobs Swipe Interface:                            │    │
│  │  • JobSwiper component (Swiper.js)                │    │
│  │  • JobCard components (stack of cards)            │    │
│  │  • Like/Dislike buttons                           │    │
│  │  • Stats panel (toggle)                           │    │
│  │  • Progress counter                               │    │
│  └────────────────────────────────────────────────────┘    │
│                          ↓                                    │
│              User swipes left/right                          │
│                          ↓                                    │
│            Zustand Store (Persistent)                        │
│           Records decision in localStorage                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
app/layout.tsx (Root Layout)
├── Header
│   ├── Logo (AutoJobFlow)
│   ├── Navigation (Home, Browse Jobs, About)
│   ├── Theme Toggle
│   └── Auth Actions
│
├── Main Content (varies by route)
│   │
│   ├── /landing (Landing Page)
│   │   ├── Hero Section
│   │   ├── How It Works Section
│   │   ├── Why AutoJobFlow Section
│   │   └── CTA Section
│   │
│   ├── /signin (Sign In Page)
│   │   ├── Sign In Form
│   │   │   ├── Email Input
│   │   │   ├── Password Input
│   │   │   └── Submit Button
│   │   └── OAuth Buttons (Google, GitHub)
│   │
│   └── /jobs (Jobs Dashboard)
│       ├── Header (Title + Stats Toggle)
│       ├── Stats Panel (conditional)
│       │   ├── Liked Count
│       │   ├── Disliked Count
│       │   └── Action Buttons
│       ├── JobSwiper
│       │   ├── Swiper Container
│       │   │   └── SwiperSlide (for each job)
│       │   │       └── JobCard
│       │   │           ├── Company Logo
│       │   │           ├── Job Title
│       │   │           ├── Company Name
│       │   │           ├── Tags (Location, Type, Salary)
│       │   │           ├── Description
│       │   │           ├── Requirements List
│       │   │           └── Benefits List
│       │   └── Action Buttons (Like/Dislike)
│       └── Pro Tip Banner
│
└── Footer
    └── Copyright Notice
```

## Data Flow

```
┌──────────────────┐
│   Mock Data      │
│  (jobs.ts)       │
│  8 sample jobs   │
└────────┬─────────┘
         │
         ↓
┌──────────────────────────────┐
│   JobSwiper Component        │
│                              │
│  • Filters out swiped jobs  │
│  • Manages card stack        │
│  • Handles swipe events      │
└────────┬─────────────────────┘
         │
         ↓ (on swipe)
┌──────────────────────────────┐
│   Zustand Store              │
│   (swipe-store.ts)           │
│                              │
│  State:                      │
│  • swipes: SwipeRecord[]     │
│  • likedJobs: string[]       │
│  • dislikedJobs: string[]    │
│  • superlikedJobs: string[]  │
│                              │
│  Actions:                    │
│  • addSwipe()                │
│  • removeSwipe()             │
│  • clearAllSwipes()          │
│  • hasSwipedOn()             │
└────────┬─────────────────────┘
         │
         ↓ (persist)
┌──────────────────────────────┐
│   localStorage               │
│   "autojobflow-swipes"       │
│                              │
│  Survives page refresh       │
└──────────────────────────────┘
```

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│                  Zustand Store Structure                     │
│                                                              │
│  interface SwipeState {                                      │
│    swipes: SwipeRecord[]        // All swipe history        │
│    likedJobs: string[]          // IDs of liked jobs        │
│    dislikedJobs: string[]       // IDs of disliked jobs     │
│    superlikedJobs: string[]     // IDs of superliked jobs   │
│                                                              │
│    addSwipe(jobId, decision)    // Record a swipe           │
│    removeSwipe(jobId)           // Undo a swipe             │
│    clearAllSwipes()             // Reset all history        │
│    hasSwipedOn(jobId)           // Check if job was swiped  │
│    getSwipeDecision(jobId)      // Get decision for job     │
│  }                                                           │
│                                                              │
│  Persistence: localStorage via zustand/middleware           │
│  Key: "autojobflow-swipes"                                  │
└─────────────────────────────────────────────────────────────┘
```

## Swiper.js Integration

```
┌─────────────────────────────────────────────────────────────┐
│                  Swiper Configuration                        │
│                                                              │
│  Effect: "cards"                    // Card stack animation │
│  Modules: [EffectCards, Keyboard]  // Features enabled      │
│  Grab Cursor: true                  // Visual feedback      │
│  Keyboard: enabled                  // Arrow key support    │
│                                                              │
│  Card Effect Settings:                                       │
│  • perSlideOffset: 8px              // Card spacing         │
│  • perSlideRotate: 2deg             // Rotation effect      │
│  • rotate: true                     // Enable rotation      │
│  • slideShadows: false              // No shadows           │
│                                                              │
│  Events:                                                     │
│  • onSlideNextTransitionEnd → handleSwipe("left")           │
│  • onSlidePrevTransitionEnd → handleSwipe("right")          │
│  • onSlideChange → update currentIndex                      │
└─────────────────────────────────────────────────────────────┘
```

## Styling Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Design System Layers                        │
│                                                              │
│  1. CSS Custom Properties (globals.css)                     │
│     • --background, --foreground                            │
│     • --brand, --brand-hover                                │
│     • --card, --muted, --border                             │
│     • --destructive, --success, --warning                   │
│     • --radius                                              │
│                                                              │
│  2. Tailwind Configuration (tailwind.config.ts)             │
│     • Maps custom properties to Tailwind utilities          │
│     • Extends default theme with semantic tokens            │
│     • Responsive breakpoints (sm, md, lg, xl)               │
│                                                              │
│  3. Component Styles                                         │
│     • Tailwind utility classes                              │
│     • Responsive modifiers (md:, lg:)                       │
│     • State variants (hover:, active:)                      │
│     • Dark mode variants (dark:)                            │
│                                                              │
│  Color Scheme:                                               │
│  • Light mode: White bg, dark text, green brand             │
│  • Dark mode: Near-black bg, light text, green brand        │
│  • Brand color: #10b981 (Emerald green - consistent)        │
└─────────────────────────────────────────────────────────────┘
```

## Routing Structure

```
app/
├── layout.tsx                      # Root layout with nav/footer
├── page.tsx                        # Redirects to /landing
│
├── (public)/                       # Public routes (no auth)
│   └── landing/
│       └── page.tsx                # Marketing landing page
│
├── (auth)/                         # Authentication routes
│   └── signin/
│       └── page.tsx                # Sign-in page
│
├── (dashboard)/                    # Protected routes (future auth)
│   └── jobs/
│       └── page.tsx                # Job swipe interface
│
├── dashboard/                      # Legacy routes (from Pathwise)
│   ├── page.tsx                    # Generic dashboard
│   ├── recruiter/page.tsx          # Recruiter dashboard
│   └── student/page.tsx            # Student dashboard
│
└── api/
    └── auth/
        └── [...nextauth]/
            └── route.ts            # NextAuth.js API route
```

## Future Backend Integration Points

```
┌─────────────────────────────────────────────────────────────┐
│              Backend API Integration (Planned)               │
│                                                              │
│  Current: Mock data (lib/fixtures/jobs.ts)                  │
│  Future:  FastAPI backend endpoints                         │
│                                                              │
│  Endpoints to implement:                                     │
│  • GET  /api/jobs                 // Fetch job listings     │
│  • POST /api/swipes               // Record swipe decision  │
│  • GET  /api/swipes/history       // Get user's history     │
│  • GET  /api/matches              // Get matched jobs       │
│  • POST /api/applications         // Apply to job           │
│  • GET  /api/user/profile         // User profile data      │
│                                                              │
│  State sync flow:                                            │
│  1. User swipes → Update Zustand store                      │
│  2. Debounce (500ms)                                        │
│  3. POST to /api/swipes                                     │
│  4. On success, confirm persistence                         │
│  5. On failure, show retry UI                               │
└─────────────────────────────────────────────────────────────┘
```

## Performance Optimizations

```
┌─────────────────────────────────────────────────────────────┐
│              Performance Considerations                      │
│                                                              │
│  Implemented:                                                │
│  ✓ Next.js 14 App Router (automatic code splitting)         │
│  ✓ Static generation for landing page                       │
│  ✓ Lazy loading of Swiper.js (only on /jobs)                │
│  ✓ Optimized bundle size (87.1 kB shared)                   │
│  ✓ CSS custom properties (no runtime computation)           │
│  ✓ Efficient re-renders (React hooks optimization)          │
│                                                              │
│  Recommended:                                                │
│  ○ Image optimization with next/image                       │
│  ○ Virtual scrolling for 100+ jobs                          │
│  ○ Prefetching next job data                                │
│  ○ Service worker for offline support                       │
│  ○ CDN for static assets                                    │
└─────────────────────────────────────────────────────────────┘
```

## Security Considerations

```
┌─────────────────────────────────────────────────────────────┐
│                  Security Measures                           │
│                                                              │
│  Implemented:                                                │
│  ✓ NextAuth.js for authentication                           │
│  ✓ JWT session strategy                                     │
│  ✓ NEXTAUTH_SECRET environment variable                     │
│  ✓ No sensitive data in client-side storage                 │
│  ✓ HTTPS-only in production (Netlify)                       │
│                                                              │
│  Recommended:                                                │
│  ○ Rate limiting on API routes                              │
│  ○ CSRF protection                                           │
│  ○ Input validation on all forms                            │
│  ○ Content Security Policy headers                          │
│  ○ Regular dependency audits                                │
└─────────────────────────────────────────────────────────────┘
```

---

**Note**: This architecture is designed for scalability. As the application grows, consider:
- Splitting components into smaller, reusable pieces
- Implementing a proper API client layer
- Adding error boundaries and loading states
- Implementing analytics and monitoring
- Setting up automated testing
