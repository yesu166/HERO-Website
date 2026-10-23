import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this project at /HERO-Website/, while local Vite uses /.
  base: command === "build" ? "/HERO-Website/" : "/",
}));
