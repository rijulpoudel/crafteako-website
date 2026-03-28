# Crafteako Website — Fixes & Improvements

## Issues to Fix

### 1. Hero Background Image — Mobile Zoom/Crop
**Problem:** On narrow screens the photo is zoomed in and the person's face (right side) is cropped out.
**Fix:** Shift `objectPosition` to the right (`70% center`) on mobile via a CSS class.
**Note:** If the image is still blurry after this fix, a higher-resolution photo optimized for portrait screens should be uploaded to Cloudinary.

### 2. Rotating Words Not Visible
**Problem:** "vision / moments / celebrations" not appearing in the hero text.
**Root cause:** The outer `motion.div` has both `animate={{ opacity: 1 }}` (Framer Motion animation) AND `style={{ opacity: middleTextOpacity }}` (a MotionValue). These two compete — the initial `opacity: 0` from `initial={}` can lock the element invisible.
**Fix:** Remove `initial`, `animate`, `transition` from the outer wrapper so only the MotionValue controls opacity.

### 3. Wrong Rotating Word List
**Problem:** Words are `["vision", "moments", "memories"]` — "celebrations" is missing.
**Fix:** Update to `["vision", "moments", "celebrations"]`.

### 4. Hero Caption — Wrong Theme
**Problem:** "Capturing your love's legacy with an elegant, editorial, and Italian flair." is wedding-focused.
**Fix:** Replace with a graduation-focused line.

### 5. "Check Availability" Button — Doesn't Match Minimalism
**Problem:** White pill button feels too standard.
**Fix:** Restyle as a bordered transparent button with wider letter-spacing (editorial feel).

### 6. Scroll — Feels Sticky/Laggy
**Problem:** Scrolling requires 2-3 attempts; feels stuck especially in the pinned album showcase section.
**Root causes:**
  - Lenis `lerp: 0.08` is too gentle (scroll feels unresponsive)
  - GSAP ScrollTrigger is not synchronized with Lenis (causes stutter in pinned section)
**Fix:** Increase lerp to 0.12, reduce duration, and add Lenis → ScrollTrigger sync.

### 7. ProjectShowcase — No UX Hint for Album
**Problem:** Users don't know that clicking a photo opens an album.
**Fix:** Add "Click to explore album" label below the cover image.

### 8. ProjectShowcase — Too Plain, Just Album Covers
**Problem:** Only one album cover visible — looks bland.
**Fix:** Add 2 scattered photos from each project's album behind the cover, with slight rotations for an editorial, organic feel.

### 9. New Grads 2026 Page — No Photos After Pricing
**Problem:** Page ends abruptly after packages with no photography shown.
**Fix:** Add a "Captured Moments" gallery section with photos from graduation albums between pricing and the CTA block.

---

## Files Changed

- `app/globals.css` — hero image responsive objectPosition
- `lib/gsap.ts` — add `lagSmoothing(0)` for Lenis compat
- `components/SmoothScroll.tsx` — tune Lenis settings + sync ScrollTrigger
- `components/HeroSection.tsx` — words fix, caption, button, image position
- `components/ProjectShowcase.tsx` — scattered photos + click hint
- `app/new-grads-2026/page.tsx` — add photo gallery section
