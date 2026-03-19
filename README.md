# Crafteako

A cinematic, editorial photography portfolio I built to showcase stories with motion, mood, and detail.

This project is personal to me: every section is designed to feel intentional, from the custom cursor behavior to the album storytelling flow. It highlights graduation sessions, portraits, and events with a luxury visual language and a smooth interactive experience.

## What This Site Includes

- A full-screen animated preloader shown once per session.
- A signature custom cursor system with:
  - trailing dots
  - velocity stretch
  - context-aware labels (`view`, `book`, `visit`, `drag`, `play`)
- Magnetic hover interaction for links and key actions.
- Scroll-pinned project showcase with GSAP `ScrollTrigger` and image crossfades.
- Dynamic album pages using route params (`/albums/[id]`).
- Lightbox-ready gallery interaction with keyboard navigation.
- Contact page integrated with Web3Forms.
- Cloudinary image delivery via `next-cloudinary`.
- Responsive design for desktop and mobile.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP + ScrollTrigger
- next-cloudinary

## Project Structure

```text
app/
	page.tsx                # Home page (hero, showcase, vision, footer)
	contact/page.tsx        # Contact form + Web3Forms submission
	albums/[id]/page.tsx    # Dynamic album detail pages
	layout.tsx              # Global fonts, preloader, cursor, navbar

components/
	CustomCursor.tsx
	Preloader.tsx
	Navbar.tsx
	HeroSection.tsx
	ProjectShowcase.tsx
	VisionSection.tsx
	Footer.tsx
	ui/MagneticButton.tsx

data/
	projects.ts             # Portfolio content source

lib/
	cursorContext.tsx
	gsap.ts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
```

### 3. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev      # Start local dev server
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## Content Editing

Most portfolio content is data-driven.

- Edit `data/projects.ts` to update names, descriptions, venues, image IDs, and alt text.
- Add a new album by adding a new project object with a unique `id`.
- Album pages are automatically routed by `id` at `/albums/{id}`.

## Design Notes

The visual direction is based on a cream and charcoal palette with serif-led editorial typography:

- `--cream: #F5F2ED`
- `--dark: #232323`
- `--cream-dark: #E4E1DB`

Fonts are loaded with `next/font` and applied globally in `app/layout.tsx`.

## Deployment

This app can be deployed on Vercel or any platform that supports Next.js.

For Vercel:

1. Import the repository.
2. Add the same environment variables from `.env.local`.
3. Deploy.

## Final Note

Crafteako is more than a portfolio site for me. It is a creative system I can keep evolving as my work grows.
