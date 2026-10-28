# NESI — Intelligence in motion

A full visual rebrand of HERO-Website into the NESI AI studio landing page. The concept pairs a moody lake-inspired atmosphere with restrained glassmorphism, editorial typography, and subtle motion.

## Stack

- React 19 + TypeScript
- Vite 7
- Lucide icons
- Responsive CSS, native smooth scrolling, and Intersection Observer reveals
- Custom CSS landscape illustration, no large background video or 3D runtime

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production bundle is written to `dist/`.

## Design notes

- Dark lake palette with deep pine, mineral teal, and pale mint.
- Glassmorphism is reserved for navigation and small surfaces, with editorial layout and high-contrast typography doing most of the work.
- Responsive mobile navigation and reduced-motion support are included.
- The ecosystem cards are clearly labelled as product directions, not released capabilities.
- The contact link currently opens an email draft at `hello@nesi.ai`; replace this address if needed.

## Deployment

The project can be deployed as a static Vite site on Vercel or another static host. Use the default `npm run build` command. The existing Vite config also retains the GitHub Pages base mode via `npm run build -- --mode github-pages`.
