# KALT Project Rules (AI AGENT GUIDE)

## 1. Tech Stack (Strict)

- Next.js 15+ (App Router)
- Tailwind CSS (For Styling)
- GSAP (For Scroll/Complex Animations)
- Framer Motion (For Micro-interactions)
- Prisma (PostgreSQL ORM)

## 2. Design Identity

- Frame: 20px White Border (#F5F5F3) around the whole screen (Fixed).
- Layers: Alternate background colors between #F5F5F3 (Off-white) and #E5E5E3 (Light Grey).
- Typography: Large, high-end editorial fonts.
- Brand Name: KALT

## 3. Directory Structure

- (site): Landing page & brand experience.
- (store): E-commerce functionality.
- (admin): Dashboard & management.

## 4. Animation Philosophy

- Always use Lenis for smooth scrolling.
- Navbar: Hidden by default, staggers in on top-hover.
- Transitions: Use GSAP Flip for moving the "Hoodie" from the model to the grid.
