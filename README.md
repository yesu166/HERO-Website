# HERO Website

A cinematic portfolio with a scroll-controlled hero film, restrained glass UI, and a custom glasswing butterfly cursor.

## Included now

- React + TypeScript + Vite portfolio shell.
- 8-second H.264 hero video committed under `public/media/`.
- Native video playback scrubbed from scroll progress.
- Black fallback if video metadata cannot load.
- Warm cream-gold light around the butterfly cursor, soft wing motion, smooth tracking, click-to-land and take-off.
- Glass navigation, subtle atmospheric grain, process, selected work, experiments, and footer sections.
- Responsive layouts and reduced-motion handling.

## Hero video

The current clip is stored at:

`public/media/Character_animation_for_digital_…_20261023075818_2K_upscaled.mp4`

It is loaded by the hero as a background layer. Its 8-second timeline maps to the hero's scroll progress; scrolling back scrubs the clip in reverse. The video remains separate from the website typography and UI. We do not need to isolate the character from the landscape for this first version because the source clip already composites them together.

For a future replacement, preserve the existing filename or update the `src` in `src/main.tsx`. Recommended export: H.264 MP4, 16:9, 24–30 fps, muted, frequent keyframes for smooth seeking, and optimized for web delivery.

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

GitHub Pages build:

```bash
npm run build -- --mode github-pages
```

GitHub Pages deployment is configured in `.github/workflows/deploy-pages.yml`. The first deployment requires Pages to be enabled for this repository with **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow cannot enable that repository setting because the connected GitHub Actions token lacks the required repository administration permission.
