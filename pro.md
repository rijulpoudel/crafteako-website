# crafteako — Pro-Level Frontend Upgrade Plan

_Ordered by impact × effort ratio. Each item lists what changes, which file(s), and why._

---

## Phase 1 — Foundation & Visual Texture

### 1. Grain / Noise Overlay (globals.css)
**What:** Fixed SVG feTurbulence noise layer overlaid on the entire page at ~4% opacity via `body::after`.
**Why:** Analog grain is the single clearest signal of luxury editorial design. Removes the "flat website" feeling and makes the cream palette feel like a fine-art print. Every high-end photography portfolio (VSCO, Artifact, Moooi) uses this.
**Files:** `app/globals.css`

### 2. Easing Token System (globals.css)
**What:** Define 4 named CSS custom property easing curves: `--ease-in`, `--ease-out`, `--ease-inout`, `--ease-expo`. Use consistently across all transitions.
**Why:** Inconsistent easing makes animations feel "assembled". Named tokens make the site feel choreographed — like a single designer controlled every movement.
**Files:** `app/globals.css`

### 3. Display Headline Letter-spacing (multiple components)
**What:** Tighten all large Playfair Display headlines from `-0.01em` → `-0.04em`. Tighten hero label tracking from `0.5em` → `0.35em`.
**Why:** Tight tracking on large serif type is the most immediate typographic signal of sophistication. Default rendering looks like a student project; tight tracking looks like Vogue.
**Files:** `components/HeroSection.tsx`, `components/VisionSection.tsx`, `components/ProjectShowcase.tsx`, `components/Footer.tsx`

### 4. Focus States — Elegant Ring (globals.css)
**What:** Replace `outline: 2px solid var(--dark)` with `box-shadow: 0 0 0 2px var(--cream), 0 0 0 4px var(--dark)` — an inset cream ring + dark ring.
**Why:** The existing focus outline is accessible but ugly. The ring style is what every design-forward site (Linear, Vercel, Stripe) uses.
**Files:** `app/globals.css`

---

## Phase 2 — Motion & Transitions

### 5. Cinematic Preloader (Preloader.tsx)
**What:** Replace logo + line with a film countdown (5 → 4 → 3 → 2 → 1) in Inter monospaced, then the logo scales up and the overlay slides away. Each number flips with a short clip-path reveal.
**Why:** The current preloader does the minimum. A film countdown is a direct visual metaphor for photography — you're about to see pictures taken at 1/500s. Sets the cinematic tone before a single photo loads.
**Files:** `components/Preloader.tsx`

### 6. Page Transition Overlay (new: PageTransition.tsx + layout.tsx)
**What:** Create a `PageTransition` component that wraps `{children}` in Framer `AnimatePresence`. On every page change, a cream panel sweeps across from left-to-right (clip-path reveal), holds 150ms, then sweeps off. Uses Next.js App Router `usePathname` to detect route changes.
**Why:** Currently pages appear instantly with no transition. A sweep transition makes navigation feel like turning pages in a physical portfolio book — reinforces the editorial brand.
**Files:** `components/PageTransition.tsx` (new), `app/layout.tsx`

### 7. Split Text Reveal for Headlines (new: SplitText.tsx + HeroSection.tsx)
**What:** Create a `SplitText` component that splits a string into word spans and animates each with staggered `y: 60 → 0` + `opacity: 0 → 1` on mount or scroll entry. Apply to: hero "Bringing your" and "to life" lines, VisionSection body quote first sentence.
**Why:** Block fade-in is what everyone does. Word-by-word reveal looks like text being typeset — editorial, deliberate, professional.
**Files:** `components/ui/SplitText.tsx` (new), `components/HeroSection.tsx`, `components/VisionSection.tsx`

### 8. Image Clip-path Reveal (globals.css + portfolio/album pages)
**What:** Add a CSS class `.img-reveal` that uses a Framer Motion `whileInView` clip-path animation: `inset(100% 0 0 0)` → `inset(0% 0 0 0)` — a bottom-to-top wipe like a photo developing. Apply to VisionSection portrait, and individual images in `albums/[id]/page.tsx`.
**Why:** Fade-in is invisible. A directional wipe has direction and intention — it *reveals* the photograph the way a print emerges in a darkroom tray.
**Files:** `components/VisionSection.tsx`, `app/albums/[id]/page.tsx`

---

## Phase 3 — Component Polish

### 9. Navbar — Glass Blur on Scroll (Navbar.tsx)
**What:** Add `backdropFilter: "blur(16px)"` (and `-webkit-backdrop-filter`) to the scrolled navbar state alongside the existing `rgba(245,242,237,0.85)` background.
**Why:** Without blur, the navbar's translucent background shows text bleeding through unreadably. With blur it becomes a proper frosted-glass bar — expected on every modern portfolio site.
**Files:** `components/Navbar.tsx`

### 10. Mobile Menu — Dark Overlay with Photo Background (Navbar.tsx)
**What:** Change the mobile menu from cream `#F5F2ED` background to dark `#232323` background with white text. Add a faint blurred cover photo (the hero image) at 15% opacity behind the links. Links animate in with character-by-character stagger instead of whole-word.
**Why:** The current mobile menu is a white list — identical to every basic hamburger menu. A dark, atmospheric overlay makes it feel like the rest of the site.
**Files:** `components/Navbar.tsx`

### 11. Footer — Pre-footer CTA Section (Footer.tsx)
**What:** Above the dark `#232323` footer, add a full-width cream section with large Playfair italic text *"Let's create something timeless"* centered, an `—` em-dash divider, and a single "Book a Session →" CTA button. This is the real CTA moment before the footer.
**Why:** Currently the footer starts immediately with the quote and social links — there's no "ask" moment. The pre-footer section is where the user is asked to convert. Every luxury brand site has this.
**Files:** `components/Footer.tsx`

### 12. Image Hover Color Grade (globals.css)
**What:** Add a global CSS rule: `.img-grade { transition: filter 0.6s ease; } .img-grade:hover { filter: saturate(1.12) contrast(1.04); }` Apply class to all portfolio and album images.
**Why:** Pure scale hover feels mechanical. Color grade shift on hover feels like the image comes *alive* — from a still to a moment worth looking at. Matches how photographers see light.
**Files:** `app/globals.css`, `app/portfolio/page.tsx`, `app/albums/[id]/page.tsx`

---

## Phase 4 — Typographic & Layout Refinements

### 13. VisionSection — Break the Grid (VisionSection.tsx)
**What:** Remove the white card with border-radius and box-shadow. Let the content breathe directly on the cream background. Left-align all text. Make the portrait image taller (aspect-ratio 2/3), rotate `-3deg` initially with hover to `0deg`, and place it slightly outside the text column to overlap.
**Why:** The white card-on-cream treatment looks like a UI pattern imported from a SaaS dashboard. Editorial photography sites don't box their content. Direct on-background, broken grid, and a tilted portrait is unmistakably intentional.
**Files:** `components/VisionSection.tsx`

### 14. Hero Scroll Indicator — Refined (HeroSection.tsx)
**What:** Replace the `SCROLL` text + growing line with a more refined indicator: a thin `1px` vertical line that slowly animates a dot sliding down it (like a film strip leader), repeated infinitely. Remove the `SCROLL` label — the motion is self-explanatory.
**Why:** The current indicator is functional but generic (seen on every WordPress portfolio theme). The sliding dot reads as more considered and photographic.
**Files:** `components/HeroSection.tsx`

### 15. ProjectShowcase — "Scroll to explore" removed, replaced with counter (ProjectShowcase.tsx)
**What:** Replace the "Click cover to explore album" hint text with a styled `01 / 07` counter in the bottom-right corner (Playfair, large, faded). The progress bar at the bottom becomes slightly taller (2px) with the dark fill having a subtle glow.
**Why:** "Click to explore album" reads like instruction text from a UI spec. A large, faded counter reads as editorial — like a magazine spread page number.
**Files:** `components/ProjectShowcase.tsx`

---

## Implementation Order Summary

| # | Change | File(s) | Impact |
|---|--------|---------|--------|
| 1 | Grain texture overlay | globals.css | ★★★★★ |
| 2 | Easing token system | globals.css | ★★★☆☆ |
| 3 | Display headline letter-spacing | HeroSection, VisionSection, Showcase, Footer | ★★★★☆ |
| 4 | Focus ring style | globals.css | ★★☆☆☆ |
| 5 | Cinematic preloader countdown | Preloader.tsx | ★★★★☆ |
| 6 | Page transition sweep | PageTransition.tsx, layout.tsx | ★★★★★ |
| 7 | Split text word reveal | SplitText.tsx, HeroSection, VisionSection | ★★★★☆ |
| 8 | Clip-path image reveal | VisionSection, albums/[id]/page.tsx | ★★★★☆ |
| 9 | Navbar glass blur | Navbar.tsx | ★★★☆☆ |
| 10 | Mobile menu dark overlay | Navbar.tsx | ★★★★☆ |
| 11 | Pre-footer CTA section | Footer.tsx | ★★★★☆ |
| 12 | Image hover color grade | globals.css, portfolio, albums | ★★★☆☆ |
| 13 | VisionSection grid break | VisionSection.tsx | ★★★★☆ |
| 14 | Hero scroll indicator | HeroSection.tsx | ★★★☆☆ |
| 15 | Showcase counter | ProjectShowcase.tsx | ★★★☆☆ |

---

## What We Are NOT Changing
- The custom cursor system — it's already excellent
- The GSAP ScrollTrigger velocity distortion — best-in-class
- Lenis smooth scroll config — well-tuned
- Cloudinary image delivery — already optimal
- The Playfair + Inter type pairing — correct and timeless
- Color palette — cream + charcoal is perfect for luxury photography
