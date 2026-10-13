import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// "base" must match your GitHub repository name so the site works at
// https://iuc2003.github.io/Aayushi-Portfolio/
export default defineConfig({
  plugins: [react()],
  base: "/Aayushi-Portfolio/",
});
