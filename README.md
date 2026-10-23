# HERO Website

A minimal cinematic portfolio with a scroll-scrubbed hero film, restrained glass UI, and an animated glasswing butterfly cursor.

## Stack

- React + TypeScript + Vite
- CSS glass surfaces, atmospheric typography, and scroll reveals
- Pointer-smoothing with `requestAnimationFrame`
- Native HTML video seeking for scroll-controlled playback
- No AI generator UI or unrelated widgets inside the portfolio

## Add the 8-second hero video

Put the final clip here:

`public/media/hero.mp4`

The hero video is intentionally a background layer, not an embedded video player. It fills the sticky viewport, stays muted, and its playback time maps to the hero section's scroll progress. The website remains black if the video file is not present.

**Recommended export for smooth scrubbing:** MP4 (H.264), 1920×1080, 24–30 fps, muted, fast-start metadata, and frequent keyframes. Keep the clip compressed enough to load promptly. Do not add typography or UI into the video; the website renders those separately.

If the character and landscape have already been rendered together into one clip, keep them together for now. A separate character layer is only needed for truly independent character motion or compositing.

## Butterfly cursor

The custom butterfly follows the pointer with eased movement, gentle direction tilt, a warm cream-gold aura, subtle wing motion, and click-to-land / perched / take-off states. It is an inline SVG for now, so it works before the final external transparent butterfly asset is ready. The effect is restricted to the visible hero, does not intercept clicks, and respects reduced-motion preferences.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The repository began empty; the current files provide the portfolio foundation and ready-to-fill video path.
