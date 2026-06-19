# 🛸 KALT | Premium Streetwear Experience 🌌

**KALT** is a comprehensive digital ecosystem representing a luxury streetwear brand. The project is architected into three core segments: a creative Landing Page, a robust E-commerce engine, and an Integrated Admin Dashboard. The design philosophy centers on Brutalist aesthetics, sophisticated typography, and high-end motion design.

---

## 🏗 Project Architecture

```text
kalt-project/
├── prisma/                 # Database schema (User, Product, Category, etc.)
├── public/                 # Static assets (Images, Fonts, Textures)
├── src/
│   ├── app/                # Next.js 15 App Router (Route Groups)
│   │   ├── admin/          # Admin Management Dashboard
│   │   ├── (landing)/      # Creative Landing Page Experience
│   │   └── shop/           # E-commerce Store Engine
│   ├── components/         # Atomic component structure
│   ├── providers/          # Context Providers (Lenis, SmoothScroll)
│   └── globals.css         # Tailwind CSS v4 & Base Styles
```

---

## 🛠 Tech Stack

### Framework & Language

- **Framework:** [Next.js](https://nextjs.org/) (v16)
- **Library:** [React](https://react.dev/) (v19)
- **Language:** TypeScript

### UI & Styling

- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.site/) & [React Hot Toast](https://react-hot-toast.com/)
- **Charts:** [Recharts](https://recharts.org/)

### Backend & Database

- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Auth:** [NextAuth.js](https://next-auth.js.org/) & [bcrypt](https://www.npmjs.com/package/bcrypt)

### State Management & Data

- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Global State:** [Zustand](https://zustand.docs.pmnd.rs/)

### Forms & Validation

- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Validation:** [Zod](https://zod.dev/)

### Utilities & Infrastructure

- **Images:** [Next Cloudinary](https://next-cloudinary.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)

---

## ✨ Key Features

- **Modern Editorial UI:** Inspired by Awwwards-winning websites, focusing on negative space and structured grids.
- **Smart Navigation:** Interactive navbar that intelligently hides on scroll and reappears upon top-viewport hover.
- **Visual Depth:** Multi-layered background architecture utilizing grain textures and a curated minimalist palette.
- **Fluid Animations:** Advanced scroll-linked interactions engineered for a premium user experience.

---

## 🧠 Dev Log: Challenges & Senior Solutions

### 1. Sidebar Interaction & Layout Shift Mitigation

- **The Issue:** The sidebar menu conflicted with global scroll logic, causing a "jump" (Layout Shift) upon activation as the scrollbar vanished. Additionally, **Hydration** mismatches occurred when attempting to render Portals before the browser DOM was fully initialized.
- **The Solution:** 1. **React Portals & Mounted Guard:** Implemented `createPortal` to inject the menu directly into the `body`, wrapped in a "Mounted Guard" (`if (!mounted) return null`) to ensure client-side readiness. 2. **Scrollbar Compensation:** Programmatically calculated the scrollbar width and applied it as padding to the body to maintain layout stability during overflow locks.
- **The Logic:**

```javascript
// 1. Mounted Guard: Ensure DOM is ready to prevent hydration errors
if (!mounted) return null;

// 2. Open State: Calculate scrollbar width & prevent layout shift
const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
document.body.style.paddingRight = `${scrollBarWidth}px`;
document.body.style.overflow = "hidden";

// 3. Close State: Reset padding and restore scroll
document.body.style.paddingRight = "0px";
document.body.style.overflow = "auto";
```

### 2. Next.js 15 Image Optimization

- **The Issue:** Terminal warnings regarding "missing sizes" for responsive images using the `fill` property.
- **The Solution:** Implemented a precise `sizes` strategy tailored to viewport breakpoints to optimize LCP.
- **Implementation:** `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`

### 3. Hero Section: Fluid Responsiveness vs. Hardcoded Breakpoints

- **The Issue:** The Hero section's design was "snapping" abruptly between standard breakpoints. Managing multiple `@media` queries resulted in bloated, non-scalable CSS.
- **The Solution:** Replaced rigid breakpoints with the CSS `clamp()` function. This enabled "Fluid Typography and Spacing" that scales linearly with the viewport width (`vw`).
- **The Logic:**

```tsx
// Clean & Fluid scaling using clamp() via Tailwind
<h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-none font-bold">KALT</h1>
```

### 4. Category Section: Brutalist Masking & Nested Scroll Isolation

- **The Issue:** 1. Manually calculating complex geometric `clip-path` values was inefficient. 2. The **Lenis** smooth scroll hijacked native scrolling within internal category menus.
- **The Solution:** 1. Utilized **"Clippy"** (CSS clip-path maker) to generate high-precision polygon paths. 2. Applied the `data-lenis-prevent` attribute to nested containers to allow isolated native scrolling.
- **The Logic:**

```tsx
// 1. Precise clip-path generated via Clippy
<div className="[clip-path:polygon(10%_0,100%_0,100%_90%,90%_100%,0_100%,0_10%)]">
  <Image alt="Category" fill src="/category.jpg"/>
</div>

// 2. Isolating nested scroll from Lenis globally
<ul className="overflow-y-auto max-h-[50vh]" data-lenis-prevent>
  {/* Scrollable category items here */}
</ul>
```

### 5. Typography Animation: Absolute Positioning Bug

- **The Issue:** Applying `absolute` positioning directly to animated typography elements caused layout glitches during Framer Motion transitions.
- **The Solution:** Decoupled layout logic from typography. Positioning (`absolute`, `z-index`) was moved to a parent `<motion.div>` wrapper, allowing the child `<h2 />` to handle text formatting without interference.
- **The Logic:**

```tsx
// 1. Parent Wrapper handling layout, position, and animation
<motion.div className="shrink-0 lg:absolute lg:top-10 lg:left-20 z-30">
  // 2. Child Element handling pure typography
  <h2 className="text-[clamp(2rem,4vw,3.5rem)] uppercase tracking-tighter leading-none text-black wrap-break-word mb-3 lg:mb-0 font-light">
    Category Title
  </h2>
</motion.div>
```

### 6. Collection Section: Asymmetric Infinite Horizontal Scroll

- **The Issue:** 1. Breaking grid monotony with asymmetric positioning. 2. Implementing a smooth, infinite horizontal loop without exceeding state bounds or causing re-render conflicts.
- **The Solution:** 1. **Dynamic Styling:** Developed a wrapper utilizing the `cn` utility to merge shared styles with position-based classes. 2. **Infinite Engine:** Leveraged the modulo operator (`%`) and lap-based `uniqueKey` generation to ensure seamless React reconciliation.
- **The Logic:**

```tsx
// 1. Scroll Safety Valve (Guard Condition)
if (newStart !== startIndex && newStart >= 0 && newStart <= TOTAL_STEPS) {
  setStartIndex(newStart);
}

// 2. Infinite Loop Logic using Modulo operator
const actualItem = MOCK_COLLECTION[absoluteIndex % MOCK_COLLECTION.length];

// 3. Unique Key Generation to separate laps
return {
  ...actualItem,
  uniqueKey: `${actualItem.id}-lap${lap}`,
};
```

### 7. Product Anatomy: Animation Sync & Dynamic Responsive Scaling

- **The Issue:** 1. Synchronization desync between Next.js SSR and Framer Motion’s scroll-progress. 2. Engineering a "Zoom-in" effect that remains contained within viewport boundaries across varying screen sizes.
- **The Solution:** 1. **Hydration Guard:** Utilized `useEffect` + `useState` to force client-side initialization, preventing SSR mismatches. 2. **Adaptive Scaling Engine:** Integrated a conditional `maxScale` logic based on `screenWidth` to ensure the product zooms proportionally—optimizing for 4K displays (2.4x) while restraining for mobile (1.2x).
- **The Logic:**

```tsx
// 1. Adaptive Scaling Logic for different viewports
const maxScale =
  screenWidth >= 1536
    ? 2.4
    : screenWidth >= 1024
      ? 1.6
      : screenWidth >= 768
        ? 1.4
        : 1.2;

// 2. Mapping the scale bound to scroll progress
const scale = useTransform(
  progress,
  [0, 0.05, 0.2, 0.85, 0.98, 1],
  [1, 1, maxScale, maxScale, 1, 1],
);

// 3. Forced Client Mounting & Safety Guard
useEffect(() => {
  setMounted(true);
  const handleResize = () => setScreenWidth(window.innerWidth);
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

if (!mounted) return null;
```

### 8. E-commerce Store: Scroll Hijacking & Animation Abort (Lenis Conflict)

- **The Issue:** During product catalog pagination, the smooth scroll back to the top of the section would sporadically freeze or instantly abort. Relying on the native `window.scrollTo({ behavior: "smooth" })` created a direct engine conflict with the **Lenis** smooth-scroll library, which hijacked the scroll event and aborted the animation.
- **The Wrong Paths Taken:**
  - Fixing heights via `min-height` (compromised the premium layout).
  - Delaying React state with `requestAnimationFrame` and `setTimeout` (inconsistent across browsers and devices).
  - Locking buttons via `isScrolling` state (slowed down UX and negated cache speed).
- **The Solution:** Abandoned native DOM scrolling entirely for this section. Interfaced directly with the Lenis API via the `useLenis` hook to delegate the scrolling task, ensuring buttery-smooth transitions without React state conflicts or aborted animations.
- **The Logic:**

```tsx
// 1. Hook into Lenis instance
import { useLenis } from "@studio-freight/react-lenis";

export default function CatalogSection() {
  // 2. Initialize Lenis inside the component
  const lenis = useLenis();

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setCurrentPage(newPage);

    // 3. Delegate scroll command to Lenis API instead of Native DOM
    if (lenis) {
      lenis.scrollTo("#shop-catalog", {
        offset: -100, // Compensate for fixed navbar
        duration: 1.2, // Premium cinematic easing duration
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  // ... rest of the component
}
```

### 9. Multi-Collection Filtering & Cross-Platform Prisma Database Sync

- **The Issue:** 1. **Cross-Component Filter Coupling:** Linking the immersive horizontal `BridgeSection` to the e-commerce `CatalogSection` required a seamless dynamic state. Passing standard React state up to a shared parent would trigger massive re-renders across the whole landing layout. 2. **TypeScript Layout Constraints:** Restructuring the `CatalogHeader` dynamically based on URL params caused standard string manipulation functions like `.replace()` to crash on initial render due to `undefined` states before client hydration. 3. **Windows Database Desync:** Running direct Prisma commands (`npx prisma db push` / `migrate`) locally on Windows environment terminals consistently failed to map the PostgreSQL connection strings stored within `.env` configurations, throwing critical `datasource.url property is required` exceptions.
- **The Solution:** 1. **URL Search Params Sync:** Architected a single source of truth via URL params (`?category=slug`). Modified the `BridgeCard` navigation triggers to inject specific category slugs directly into the address bar, prompting an isolated, smooth Lenis-assisted scroll down to the automatically-refetched `CatalogGrid`. 2. **Defensive Structural Guarding:** Refactored the typography formatting logic inside the headers using conditional optional chaining and nullish fallbacks to guarantee robust Type Safety and prevent runtime crashes on early mount cycles. 3. **Cross-Platform Environment Injection:** Decoupled environmental variable management from raw terminal interpreters by integrating `dotenv-cli`. Engineered custom scripts inside `package.json` to load configuration flags cross-platform before initiating the database synchronization layer.

### 10. Admin Demo Security & Client-Side Interception

- **The Issue:** Exposing a live admin dashboard for portfolio showcases risks unauthorized database mutations. Relying solely on server-side rejections creates a poor UX, as the user waits for a failed network request.
- **The Solution:** Utilized NextAuth's `useSession` to identify the demo account gracefully. Intercepted `onSubmit` and `onClick` events directly on the frontend UI, blocking the mutation completely and triggering an immediate `toast.error` notification to provide clear feedback without unnecessary server roundtrips.

### 11. Transparent Product Image Styling & Backgrounds

- **The Issue:** Applying background CSS gradients to product cards obscured the intricate details and distinct aesthetic of transparent, cut-out product images.
- **The Solution:** Stripped away underlying gradient layers that interfered with the alpha channels of the `.png` product assets. Adjusted the container logic to ensure transparent cut-outs maintained their clean, distinct visual presence without color bleeding.

### 12. Prisma Database Connection Resolution

- **The Issue:** Database connection strings failing to map correctly upon deployment due to older, redundant explicit schema assignments.
- **The Solution:** Adapted the configuration to reflect modern Prisma updates. Allowed the engine to read the connection URL directly from the database rather than explicitly defining or forcing the link within the schema layout, preventing redundant configuration errors.

### 13. Global Scale & Responsiveness Post-Mortem

- **The Issue:** The entire interface (layouts, typography bounding boxes, and complex vector-clipped components) was unconsciously designed and fine-tuned at an **80% browser zoom level**. Upon resetting to the standard **100% viewport scale**, the UI suffered from severe layout contraction, compressed containers, and broken visual proportions due to rigid `max-w` constraints and fixed padding limits.
- **The Solution:** Applied a reverse-engineering mathematical approach to seamlessly transition the design blueprint to standard scale without altering the structural grid or rewriting micro-components.
- **The Logic:**
  1. **Inverse Scaling Factor (×1.25 Rule):** Multiplied all restricted dimensions, absolute `clamp()` parameters, and static `rem` layout offsets by `1.25` (since 1 / 0.8 = 1.25) to perfectly restore the exact original optical weights and proportions.
  2. **Component-Level Fluid Boundaries:** Expanded rigid `max-w` constraints on text wrappers and promotional grids to reintroduce necessary negative space (the "Airy Feel") that was lost during the contraction.
  3. **Aspect Ratio Anchoring (Mobile Hero):** Swapped height-dependent viewport bounds (`vh`) for aspect-ratio locks (`aspect-[4/5]`) on mobile elements. This ensured that overlapping elements (like absolute positioning buttons) scaled proportionally with the viewport width rather than drifting out of alignment on devices with taller aspect ratios.

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/DevHamdy123/kalt-project.git](https://github.com/DevHamdy123/kalt-project.git)
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🛒 Future Roadmap

- [ ] **Phase 2:** E-commerce Engine & Prisma Schema Design.
- [ ] **Phase 3:** Admin Dashboard (Inventory Management & Analytics).
