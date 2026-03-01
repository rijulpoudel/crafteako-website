# CRAFTEAKO PORTFOLIO — COMPLETE COPILOT BUILD PROMPT

# Copy everything below this line and paste into GitHub Copilot Chat

Act as an expert Senior Frontend Developer and UX/UI Designer specializing in luxury creative portfolios. Build a complete, production-ready photography and videography portfolio website for a business called "Crafteako" — specializing in graduation, weddings, senior portraits, events, and music videos.

═══════════════════════════════════════════════════════
TECH STACK (use exactly this)
═══════════════════════════════════════════════════════

- Next.js 14 (App Router), React, TypeScript
- Tailwind CSS (styling)
- GSAP + ScrollTrigger (scroll animations, pinned sections, warp effects, cursor physics)
- Framer Motion (preloader, page transitions, cursor label morphing)
- Cloudinary (image hosting — use next/image with Cloudinary loader)
- Web3Forms (contact form — free, no backend needed)
- next/font (Google Fonts loading)

═══════════════════════════════════════════════════════
DESIGN SYSTEM — FOLLOW STRICTLY
═══════════════════════════════════════════════════════
Colors:
--cream: #F5F2ED (primary background)
--dark: #232323 (primary text, dark elements)
--cream-dark: #E4E1DB (secondary background, borders, accents)
--white: #FFFFFF

Typography:

- Headings: "Playfair Display" (Google Font, serif) — large, editorial, luxury
- Body/UI: "Inter" (Google Font, sans-serif) — clean and minimal

Global rules:

- All images: use Next.js <Image /> with placeholder="blur", sizes prop, priority on above-fold
- Smooth scroll: html { scroll-behavior: smooth }
- Hide the native browser cursor site-wide: \* { cursor: none !important }
- Mobile-first responsive. Hide all custom cursor elements on screens < 768px (display: none in CSS)
- All pages share layout.tsx with cursor, fonts, preloader, and fixed nav

═══════════════════════════════════════════════════════
FOLDER STRUCTURE
═══════════════════════════════════════════════════════
/app
layout.tsx
page.tsx
/contact
page.tsx
/albums
/[id]
page.tsx

/components
Preloader.tsx
CustomCursor.tsx ← THE CROWN JEWEL — see full spec below
Navbar.tsx
HeroSection.tsx
VisionSection.tsx
ProjectShowcase.tsx
Footer.tsx
/ui
MagneticButton.tsx

/data
projects.ts

/lib
gsap.ts
cursorContext.tsx ← React context to broadcast cursor state globally

═══════════════════════════════════════════════════════
★★★ CUSTOM CURSOR SYSTEM — FULL SPECIFICATION ★★★
Build this as THREE layered systems working in concert.
File: /components/CustomCursor.tsx
═══════════════════════════════════════════════════════

The cursor is the SIGNATURE of this site. It must feel alive, physical, and intelligent.
Use `* { cursor: none !important }` globally. The cursor is hidden on mobile (< 768px).

────────────────────────────────────────
LAYER 1: THE TRAILING INK RIBBON
────────────────────────────────────────
Render 10 cursor dots total. Each one chases the one before it with increasing delay.

Implementation:
const TRAIL_COUNT = 10
const trailRefs = Array.from({ length: TRAIL_COUNT }, () => useRef<HTMLDivElement>(null))

- Dot 0 (the LEADER): 10px circle, border: 1.5px solid #232323, background: transparent
  → Follows mouse with GSAP quickTo(), duration: 0.1, ease: "power3.out"
  → This is the "real" cursor position

- Dots 1–9 (the RIBBON): each one uses GSAP ticker to lerp toward the position of the dot before it
  → Use a lerp factor that INCREASES with index: lerpFactor = 0.12 + (index _ 0.04)
  → So dot 1 is slightly behind dot 0, dot 9 is furthest behind
  → Size DECREASES with index: size = 10 - (index _ 0.7)px — so they taper to ~3.7px
  → Opacity DECREASES with index: opacity = 1 - (index \* 0.09) — ribbon dissolves into nothing
  → border-radius: 50% on all dots

Visual result: a ribbon of dissolving ink pearls trails behind the cursor.
On the cream background #F5F2ED this will look strikingly editorial.

Store all 10 dot positions in a ref array updated on every GSAP ticker frame:
const positions = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 })))

On mousemove:
positions.current[0] = { x: e.clientX, y: e.clientY }

On GSAP ticker (gsap.ticker.add):
for (let i = 1; i < TRAIL*COUNT; i++) {
positions.current[i].x += (positions.current[i-1].x - positions.current[i].x) * lerpFactor[i]
positions.current[i].y += (positions.current[i-1].y - positions.current[i].y) \_ lerpFactor[i]
gsap.set(trailRefs[i].current, { x: positions.current[i].x, y: positions.current[i].y })
}

────────────────────────────────────────
LAYER 2: VELOCITY STRETCH
────────────────────────────────────────
The LEADER dot (dot 0) stretches in the direction of travel proportional to movement speed.

Implementation:
Track mouse velocity by comparing current vs previous mouse position on each mousemove:
const prevPos = useRef({ x: 0, y: 0 })
const velocity = useRef({ x: 0, y: 0 })

On mousemove:
velocity.current.x = e.clientX - prevPos.current.x
velocity.current.y = e.clientY - prevPos.current.y
prevPos.current = { x: e.clientX, y: e.clientY }

    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
    const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI)
    const stretch = Math.min(speed * 0.4, 20) // cap stretch at 20px extra width

    gsap.to(leaderRef.current, {
      scaleX: 1 + stretch / 10,
      scaleY: 1 - stretch / 30,
      rotation: angle,
      duration: 0.1,
      ease: "power2.out"
    })

When mouse stops (velocity approaches 0):
gsap.to(leaderRef.current, {
scaleX: 1, scaleY: 1, rotation: 0,
duration: 0.6, ease: "elastic.out(1, 0.5)"
})
— the elastic snap-back makes it feel rubber-band physical

────────────────────────────────────────
LAYER 3: CONTEXT-AWARE CURSOR LABELS
────────────────────────────────────────
The leader dot morphs into a labeled pill shape when hovering specific elements.
Use Framer Motion for the pill expand/label fade animation.

Create a React Context in /lib/cursorContext.tsx:
type CursorState = "default" | "view" | "book" | "visit" | "drag" | "play"
export const CursorContext = createContext<{ setState: (s: CursorState) => void }>()

In CustomCursor.tsx, read the state and animate accordingly:

STATE DEFINITIONS:
┌─────────────┬──────────────────────────────────────────────────────────────┐
│ State │ Trigger │ Visual │
├─────────────┼──────────────────────────────────┼───────────────────────────┤
│ "default" │ No hover │ 10px circle, transparent │
│ "view" │ Hovering project photos │ Pill, 80px wide, "View ↗" │
│ "book" │ Hovering Check Availability btn │ Pill, 90px wide, "Book" │
│ "visit" │ Hovering social/nav links │ Pill, 80px wide, "Visit" │
│ "drag" │ Hovering pinned scroll section │ Pill, 90px wide, "Drag ←→"│
│ "play" │ Hovering any video element │ Circle, 60px, play icon ▶ │
└─────────────┴──────────────────────────────────┴───────────────────────────┘

Pill style: background #232323, white text, Playfair Display italic, font-size 0.7rem
border-radius: 999px, padding: 6px 16px

Animation (Framer Motion on the leader dot wrapper):
variants={{
      default: { width: 10, height: 10, backgroundColor: "transparent", border: "1.5px solid #232323" },
      labeled: { width: "auto", height: 28, backgroundColor: "#232323", border: "none" }
    }}
transition={{ type: "spring", stiffness: 400, damping: 28 }}

Label text fades in AFTER the pill has expanded (delay: 0.08s) using AnimatePresence.

How to wire up in components (example pattern):
const { setState } = useCursorContext()

<div
onMouseEnter={() => setState("view")}
onMouseLeave={() => setState("default")} >

Apply onMouseEnter/onMouseLeave with the correct state to: - Every project image in ProjectShowcase.tsx → "view" - Album images in /albums/[id] → "view" - "Check Availability" button in VisionSection.tsx → "book" - All nav links and social links → "visit" - The pinned ProjectShowcase section container → "drag" - Any video thumbnail → "play"

────────────────────────────────────────
LAYER 4: MAGNETIC PULL (MagneticButton.tsx)
────────────────────────────────────────
File: /components/ui/MagneticButton.tsx

This component wraps any button or link and creates a gravitational field.
When the cursor is within 80px of the element's center, the element nudges toward the cursor.
When the cursor leaves, it springs back with elastic easing.

Implementation:
const ref = useRef<HTMLDivElement>(null)

const handleMouseMove = (e: MouseEvent) => {
const rect = ref.current!.getBoundingClientRect()
const centerX = rect.left + rect.width / 2
const centerY = rect.top + rect.height / 2
const deltaX = e.clientX - centerX
const deltaY = e.clientY - centerY
const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
const FIELD_RADIUS = 80
const PULL_STRENGTH = 0.35

    if (distance < FIELD_RADIUS) {
      gsap.to(ref.current, {
        x: deltaX * PULL_STRENGTH,
        y: deltaY * PULL_STRENGTH,
        duration: 0.4,
        ease: "power2.out"
      })
    } else {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" })
    }

}

Add window mousemove listener on mount, clean up on unmount.
Wrap: "Check Availability" button, Submit button on contact page, all nav links.

════════════════════════════════════════
CURSOR SUMMARY — what the user experiences:
════════════════════════════════════════

1. A ribbon of dissolving ink pearls trails every movement (always on)
2. Fast movement stretches the leader dot like a speed blur, elastic snap-back on stop
3. Hovering interactive elements morphs cursor into labeled dark pill (Framer Motion spring)
4. Buttons and links have gravitational pull that nudges them toward the cursor

═══════════════════════════════════════════════════════
COMPONENT SPECIFICATIONS
═══════════════════════════════════════════════════════

──────────────────────────────────────

1. PRELOADER — /components/Preloader.tsx
   ──────────────────────────────────────

- Full-screen overlay, background #F5F2ED, z-index 9999
- Center: "CRAFTEAKO" in Playfair Display, letter-spacing: 0.4em, font-size: ~4rem, color #232323
- Use Framer Motion: split into individual letter spans, staggered animation:
  each letter: initial { opacity: 0, y: 40 } → animate { opacity: 1, y: 0 }
  staggerChildren: 0.07s, ease: "easeOut", duration: 0.6s per letter
- After 2.2s total, animate overlay sliding upward: y: "-100%", duration: 0.9s, ease: [0.76, 0, 0.24, 1]
- Below the word, a thin horizontal line (#232323, 1px, width: 0) animates to full width as letters appear
- Once overlay is gone, unmount from DOM (use onAnimationComplete callback)
- Shown only once per session (use sessionStorage flag)

────────────────────────────────────── 2. NAVBAR — /components/Navbar.tsx
──────────────────────────────────────

- Fixed top, full width, initially transparent
- On scroll past 60px: backdrop-blur-md + background rgba(245,242,237,0.85) — smooth transition 0.4s
- Left: "CRAFTEAKO" wordmark, Playfair Display, tracking-[0.3em], font-size 0.85rem
- Right: Links — Work / About / Contact — Inter, 0.75rem, uppercase, tracking-widest
  → Each link: hover state draws a line under from left to right (CSS width 0→100% transition)
  → Wrap each in <MagneticButton> and set cursor state "visit" on hover
- On mobile: hamburger (3 lines → X morphs with Framer Motion)
  → Clicking opens full-screen overlay nav, links stagger in from right

────────────────────────────────────── 3. HERO SECTION — /components/HeroSection.tsx
──────────────────────────────────────

- 100vh, full-bleed background image (use this Unsplash URL placeholder:
  https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=2000&q=80)
- Gradient overlay: linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)
- Centered text block (absolute center):

  Line 1: "CRAFTEAKO STUDIO" — Inter, 0.65rem, uppercase, tracking-[0.5em], white, opacity 80%
  [12px gap]
  Line 2: "Bringing your" — Playfair Display, 5.5vw, white, font-weight 400
  Line 3 (dynamic rotating word):
  → Container has fixed height = 1 line to prevent layout shift
  → Words rotate: "vision" → "moments" → "memories" every 3 seconds
  → Each word: Playfair Display italic, 5.5vw, color #E4E1DB
  → Framer Motion AnimatePresence: exit { y: -60, opacity: 0, filter: "blur(4px)" }
  enter { y: 60, opacity: 0, filter: "blur(4px)" }
  animate { y: 0, opacity: 1, filter: "blur(0px)" }
  → transition: duration 0.7s, ease [0.76, 0, 0.24, 1]
  Line 4: "to life, one pixel at a time." — Playfair Display, 5.5vw, white, font-weight 400

- Bottom center: scroll indicator
  → A vertical line (1px, #white, height 0 → 48px, animated in on load)
  → Below it: "scroll" in Inter, 0.6rem, white, tracking-widest
  → Entire group pulses with a subtle breathing opacity animation (1 → 0.4 → 1, 2s loop)

────────────────────────────────────── 4. VISION SECTION — /components/VisionSection.tsx
──────────────────────────────────────

- Position: relative, sits below hero in the DOM but overlaps via sticky/scroll behavior
- As hero exits viewport, GSAP ScrollTrigger:
  → Hero text: scale(0.88), y: -60, opacity: 0.6 — starts when hero is 70% scrolled past
  → Glassmorphism card: initial y: 120, opacity: 0 → animate to y: 0, opacity: 1

- The card:
  background: rgba(255, 255, 255, 0.72)
  backdrop-filter: blur(24px) saturate(1.8)
  -webkit-backdrop-filter: blur(24px) saturate(1.8)
  border: 1px solid rgba(255, 255, 255, 0.5)
  border-radius: 20px
  padding: 64px
  max-width: 940px
  margin: 0 auto
  box-shadow: 0 32px 80px rgba(35, 35, 35, 0.08)

- Card interior layout:
  Flex row, gap 48px
  LEFT (30%): portrait photo (vertical), rounded-lg, overflow hidden
  → Use Unsplash: https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80
  → slight rotate: -2deg, hover rotates to 0deg (Framer Motion whileHover)
  RIGHT (70%):
  Small label (Inter, 0.65rem, uppercase, tracking-[0.4em], color #232323 opacity 50%):
  "Our Philosophy"
  Large paragraph (Playfair Display, 1.25rem, line-height 1.8, color #232323):
  "At Crafteako, we believe every moment deserves to be preserved with intention.
  From the quiet glance shared before vows, to the electric energy of a graduation day —
  we approach every session as artists, not just photographers. Our work is cinematic,
  timeless, and deeply personal. We don't just capture your day. We tell your story."

      Below paragraph, a thin #E4E1DB divider line (margin: 32px 0)

      "Check Availability →" button:
        → Inter, 0.8rem, uppercase, tracking-[0.25em], color #232323
        → No background — only a 1px bottom border in #232323
        → On hover: border-color transitions to full-width underline (CSS pseudo-element trick)
        → Wrap in <MagneticButton>, set cursor state "book" on mouseEnter
        → Next.js <Link href="/contact">

────────────────────────────────────── 5. PINNED PROJECT SHOWCASE — /components/ProjectShowcase.tsx
──────────────────────────────────────

- GSAP ScrollTrigger: pin the section for (projects.length \* 100vh) of scroll distance
  scrub: 1.2, anticipatePin: 1

- Full viewport layout (position absolute children):
  FAR LEFT (x: 5vw, vertically centered): client First Name
  Playfair Display, 5vw, #232323, letter-spacing -0.02em
  CENTER: featured photo
  width: 46vw, height: 68vh, object-fit: cover, border-radius: 4px
  wrapped in Next.js <Link href={`/albums/${project.id}`}>
  Set cursor state "view" on mouseEnter
  FAR RIGHT (x: calc(100vw - 5vw), vertically centered, text-align right): Last Name / Type
  Same typography as left name

- TOP LEFT corner: small category label (Inter, 0.65rem, uppercase, tracking-widest, opacity 40%)
  e.g. "Wedding 01 / 04"
- BOTTOM CENTER: thin progress bar (width: 100%, height: 1px, background: #E4E1DB)
  An inner fill div animates width from 0→100% as scroll progresses through all projects

SCROLL TRANSITION BETWEEN PROJECTS:
Divide the total scroll distance into equal segments (one per project).
On each segment boundary:
→ Outgoing: firstName/lastName slide out (x: ±60px, opacity: 0, duration: 0.5s)
→ Incoming: new names slide in from opposite side (x: ∓60px → 0, opacity: 0 → 1)
→ Image: crossfade (opacity 0 → 1 on new image, old scales slightly: scale: 1.04)
Use ScrollTrigger onUpdate to calculate which project index should be active.
Use gsap.to with immediate render for seamless transitions.

WARP / VELOCITY DISTORTION on center image:
On ScrollTrigger's onUpdate callback:
const velocity = trigger.getVelocity() // pixels/sec
const normalizedVelocity = velocity / 1000
const skewAmount = Math.max(-8, Math.min(8, normalizedVelocity _ -0.3))
gsap.to(imageWrapperRef.current, {
skewY: skewAmount,
scaleY: 1 - Math.abs(normalizedVelocity) _ 0.015,
duration: 0.4,
ease: "power2.out"
})
When scrolling stops (velocity → 0):
gsap.to(imageWrapperRef.current, {
skewY: 0, scaleY: 1,
duration: 0.8, ease: "elastic.out(1, 0.5)"
})
Effect: the photo warps like liquid as you scroll, snaps back elastically when you stop.

────────────────────────────────────── 6. DYNAMIC ALBUM PAGE — /app/albums/[id]/page.tsx
──────────────────────────────────────
Fetch project from data/projects.ts by params.id.

COVER SECTION (100vh):
Full-bleed cover image with dark overlay (rgba(0,0,0,0.35))
Centered: - Category label (Inter, 0.7rem, uppercase, tracking-[0.5em], white, opacity 70%) - Album title (Playfair Display, 7vw, white, font-weight 400, line-height 1.1)
e.g. "Sofia & James"
Bottom corners:
LEFT: "← Prev" circular button (40px, border 1px solid white/60, backdrop-blur-sm)
RIGHT: "Next →" circular button — same style
→ Use router.push() to navigate prev/next album IDs in sequence
→ Wrap both in <MagneticButton>, set cursor "visit"

EDITORIAL SECTION (below fold):
Background: #F5F2ED
Padding: 120px 0
Max-width: 700px, centered, text-align: center

Description paragraph:
Playfair Display, 1.4rem, line-height 1.85, color #232323
Sample: "A love story written in golden light. From the intimate morning preparations
to the last dance under the stars — every frame from this day captures the quiet magic
of two people choosing each other. Shot over two days in the heart of the city."

Divider: thin 1px line, width 60px, centered, color #E4E1DB, margin: 48px auto

3-column metadata:
Inter, uppercase, 0.65rem, tracking-[0.3em], color #232323 opacity 50%: label
Inter, 1rem, color #232323, margin-top 8px: value
Columns: Venue | Location | Format

MASONRY PHOTO GRID:
CSS Columns layout:
columns: 1 (mobile) → 2 (tablet 768px+) → 3 (desktop 1200px+)
column-gap: 10px
Each image: margin-bottom: 10px, border-radius: 6px, overflow: hidden, display: block
width: 100%, height: auto (maintains natural aspect ratio — critical for masonry feel)

Each image: Next.js <Image />, width/height from data, object-fit: cover
Set cursor state "view" on mouseEnter each image

LIGHTBOX (Framer Motion AnimatePresence):
Trigger: onClick on any grid image
Overlay: fixed inset-0, background rgba(35,35,35,0.96), z-index 100
Centered image: max-height 90vh, max-width 90vw, border-radius 4px
Framer Motion: initial { opacity: 0, scale: 0.92 } → animate { opacity: 1, scale: 1 }
Close: click overlay or press Escape key
Navigate: left/right arrow keys OR chevron buttons (Playfair Display "‹" "›", white, 2rem)
Caption below image: Inter, 0.75rem, white, opacity 60% — shows image number "04 / 22"

────────────────────────────────────── 7. CONTACT PAGE — /app/contact/page.tsx
──────────────────────────────────────
Background: #F5F2ED
Layout: two columns on desktop, single column on mobile
LEFT (45%): sticky editorial copy
Large heading: "Let's Create\nSomething\nBeautiful" — Playfair Display, 4.5rem, line-height 1.05
Subtext (Inter, 0.9rem, color #232323 opacity 60%, margin-top 24px):
"Tell us about your story. We take on a limited number of sessions each season to
ensure every client receives our full creative attention."
Below: contact details (Inter, 0.8rem):
📧 hello@crafteako.com
📍 Available worldwide
RIGHT (55%): the form

Form fields — minimal line-border style (no box, only bottom border):
Each field wrapper:
border-bottom: 1px solid #E4E1DB
padding-bottom: 16px
margin-bottom: 32px
On focus: border-bottom-color transitions to #232323 (0.3s)

Fields: - Full Name (input, type text) - Email Address (input, type email) - Event Type (custom styled select — hide native arrow, add custom chevron):
Options: Wedding / Graduation / Senior Portrait / Event / Music Video / Other - Event Date (input, type date) - Message (textarea, 5 rows, resize: none)

All labels: Inter, 0.65rem, uppercase, tracking-[0.3em], color #232323 opacity 50%
All inputs: Playfair Display, 1.1rem, color #232323, background transparent, border: none, outline: none

Submit Button:
Full width, background #232323, color white
Playfair Display italic, 1rem, letter-spacing 0.05em
padding: 18px 0, border-radius: 4px
Hover: background #F5F2ED, color #232323, border: 1px solid #232323 (transition 0.4s)
Wrap in <MagneticButton>, set cursor "book"

Web3Forms integration:
POST to https://api.web3forms.com/submit
Body: { access_key: "YOUR_WEB3FORMS_KEY_HERE", name, email, eventType, date, message }
Success state: Framer Motion fade-in of "Thank you — we'll be in touch soon." (Playfair Display italic, centered)
Error state: small red Inter text below button

────────────────────────────────────── 8. FOOTER — /components/Footer.tsx
──────────────────────────────────────
Background: #232323
Padding: 100px 0 48px

TOP section (centered):
Playfair Display italic, 3.5vw (min 2rem), color #F5F2ED, line-height 1.2:
"Every frame\ntells a story."
Below (margin-top 40px): "CRAFTEAKO" wordmark, Inter, 0.75rem, tracking-[0.6em], color #E4E1DB opacity 60%

MIDDLE section (3 columns, margin-top 80px):
LEFT: Social Links
Label (Inter, 0.6rem, uppercase, tracking-[0.4em], #E4E1DB opacity 40%): "Follow"
Links (Inter, 0.85rem, #E4E1DB, margin-top 12px each):
Instagram / TikTok / YouTube
Each link: hover slides a small → arrow in from left, text shifts right slightly
Wrap in <MagneticButton>, set cursor "visit"

CENTER: Minimal decoration — a thin vertical line (#E4E1DB opacity 15%, height 80px, centered)

RIGHT: Contact Info
Label (same style as above): "Reach Out"
hello@crafteako.com (Inter, 0.85rem, #E4E1DB)
Available Worldwide (Inter, 0.75rem, #E4E1DB opacity 50%)

BOTTOM bar (margin-top 80px, border-top: 1px solid rgba(228,225,219,0.1), padding-top 32px):
Flex row, space-between:
LEFT: "© 2025 Crafteako. All rights reserved." — Inter, 0.65rem, #E4E1DB opacity 30%
RIGHT: "Made with intention." — Playfair Display italic, 0.75rem, #E4E1DB opacity 30%

═══════════════════════════════════════════════════════
SAMPLE DATA — /data/projects.ts
═══════════════════════════════════════════════════════
Generate this complete TypeScript file:

export interface Project {
id: string
firstName: string
lastName: string
type: "Wedding" | "Graduation" | "Portrait" | "Music Video" | "Event"
coverImage: string
coverImageBlur: string
description: string
venue: string
location: string
format: string
albumImages: { src: string; blur: string; width: number; height: number }[]
}

export const projects: Project[] = [
{
id: "sofia-james",
firstName: "Sofia",
lastName: "& James",
type: "Wedding",
coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85",
coverImageBlur: "data:image/jpeg;base64,/9j/...", // generate a valid tiny blur placeholder
description: "A love story written in golden light. From the intimate morning preparations to the last dance under the stars — every frame from this day holds the quiet magic of two people choosing each other.",
venue: "The Ritz-Carlton",
location: "New York City",
format: "Wedding Day (2 Days)",
albumImages: [
{ src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 1100 },
{ src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 600 },
{ src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 1200 },
{ src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 900 },
{ src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 700 },
{ src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 1050 },
]
},
{
id: "marcus-chen",
firstName: "Marcus",
lastName: "Chen",
type: "Graduation",
coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=85",
coverImageBlur: "data:image/jpeg;base64,...",
description: "Four years of late nights, early mornings, and relentless pursuit of a dream — all of it arriving at this singular moment. Marcus crossed that stage with a quiet confidence that said everything.",
venue: "Columbia University",
location: "New York City",
format: "Graduation Session",
albumImages: [
{ src: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 1000 },
{ src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 800 },
{ src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 1100 },
]
},
{
id: "aria-williams",
firstName: "Aria",
lastName: "Williams",
type: "Portrait",
coverImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=85",
coverImageBlur: "data:image/jpeg;base64,...",
description: "Portrait sessions are where the ordinary becomes extraordinary. Aria arrived with a nervous laugh and left with images that showed her exactly who she is — fearless, warm, and utterly herself.",
venue: "Private Studio",
location: "Brooklyn, NY",
format: "2-Hour Portrait Session",
albumImages: [
{ src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 1200 },
{ src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 1000 },
{ src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 900 },
]
},
{
id: "nova-mv",
firstName: "Nova",
lastName: "Scott",
type: "Music Video",
coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=85",
coverImageBlur: "data:image/jpeg;base64,...",
description: "Nova's debut single called for visuals as raw and honest as the music itself. Filmed across three locations in 14 hours, this video captured an artist stepping fully into her voice for the first time.",
venue: "Multiple Locations",
location: "Manhattan & Bronx, NY",
format: "Music Video (Director's Cut)",
albumImages: [
{ src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 900 },
{ src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", blur: "data:image/jpeg;base64,...", width: 800, height: 800 },
]
}
]

═══════════════════════════════════════════════════════
GSAP SETUP — /lib/gsap.ts
═══════════════════════════════════════════════════════
"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
gsap.registerPlugin(ScrollTrigger)
gsap.config({ nullTargetWarn: false })
}

export { gsap, ScrollTrigger }

═══════════════════════════════════════════════════════
LAYOUT & FONTS — /app/layout.tsx
═══════════════════════════════════════════════════════

- Import Playfair_Display and Inter from next/font/google
- Playfair_Display: weights [400, 500], subsets ["latin"], variable "--font-playfair", display: "swap", italic included
- Inter: weights [300, 400], subsets ["latin"], variable "--font-inter", display: "swap"
- Apply both font variables to <html> tag
- Render: <Preloader />, <CustomCursor />, <Navbar />, {children}
- Global metadata: title "Crafteako | Photography & Videography", description, openGraph

═══════════════════════════════════════════════════════
NEXT.CONFIG.JS
═══════════════════════════════════════════════════════
Generate next.config.js with:
images.remotePatterns for: images.unsplash.com, res.cloudinary.com
images.formats: ["image/avif", "image/webp"]
experimental.optimizeCss: true

═══════════════════════════════════════════════════════
TAILWIND CONFIG — tailwind.config.ts
═══════════════════════════════════════════════════════
Extend theme with:
colors: { cream: "#F5F2ED", dark: "#232323", "cream-dark": "#E4E1DB" }
fontFamily: { serif: ["var(--font-playfair)", "Georgia", "serif"], sans: ["var(--font-inter)", "system-ui", "sans-serif"] }
Add "font-serif" and "font-sans" utilities accordingly

═══════════════════════════════════════════════════════
PERFORMANCE & QUALITY RULES
═══════════════════════════════════════════════════════

- All GSAP: initialize inside useLayoutEffect, wrap in gsap.context(), clean up on unmount
- All ScrollTrigger instances: store in refs and kill() on unmount
- All images: explicit width + height, or fill + sizes, never unconstrained
- below-fold images: loading="lazy", above-fold: priority
- Import GSAP plugins only in the component that uses them
- No any types — full TypeScript throughout
- No console.log in production code
- Accessible: all interactive elements have aria labels, images have alt text, form has proper labels

═══════════════════════════════════════════════════════
OUTPUT ORDER — generate completely, no truncation
═══════════════════════════════════════════════════════

1.  next.config.js
2.  tailwind.config.ts
3.  app/globals.css ← includes: \* { cursor: none !important }, scrollbar hiding, base resets
4.  app/layout.tsx
5.  lib/gsap.ts
6.  lib/cursorContext.tsx
7.  data/projects.ts
8.  components/CustomCursor.tsx ← ALL THREE LAYERS + magnetic, complete
9.  components/ui/MagneticButton.tsx
10. components/Preloader.tsx
11. components/Navbar.tsx
12. components/HeroSection.tsx
13. components/VisionSection.tsx
14. components/ProjectShowcase.tsx
15. components/Footer.tsx
16. app/page.tsx
17. app/contact/page.tsx
18. app/albums/[id]/page.tsx

Generate every file completely. Do not truncate any file. Do not write placeholder comments like "add animation here". Every component must be fully functional, fully typed, and immediately runnable after npm install.
