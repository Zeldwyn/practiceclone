import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react"; // <-- Import the integration, not react itself

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()], 
});
