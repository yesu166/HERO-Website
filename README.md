# NESI — The signal beneath the surface

A story-led, lake-inspired home for NESI, an independent AI studio. The page unfolds from **the noise**, through **the descent**, to **the emergence**. The lake is a visual metaphor for an idea that stayed beneath the surface while AI got louder.

## Stack
React 19, TypeScript, Vite 7, Lucide, Vitest, React Testing Library and jsdom. The lake art is a local SVG; motion is CSS and Intersection Observer.

## Run locally
```bash
npm install
npm run dev
```

## Quality checks
```bash
npm test
npm run build
npm run preview
```
The production bundle is written to `dist/`. GitHub Actions runs component/navigation tests and a production build on pushes.

## Design and status
- Deep lake greens, mineral-green light, restrained glassmorphism, and editorial typography.
- Responsive menu, focus states, semantic landmarks, and reduced-motion support.
- Product status is explicit: NESI Agent is in development; other directions are concepts.
- Project links point to `https://github.com/yesu166/NESI-Agentic-AI`.

## GitHub Pages
The build and tests run independently on every push. To publish with GitHub Pages, first open **Repository Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. Then open **Actions → Deploy portfolio to GitHub Pages → Run workflow**. This one-time repository setting must be enabled by a repository admin; the connected workflow cannot create the Pages site through the current GitHub integration permissions.
