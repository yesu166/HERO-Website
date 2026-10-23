import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  plugins: [react()],
  // GitHub Pages serves this project at /HERO-Website/.
  // Vercel and local builds serve from the domain root.
  base: process.env.GITHUB_ACTIONS === "true" ? "/HERO-Website/" : "/",
}));
