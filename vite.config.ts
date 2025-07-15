import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": "/src/",
      "@entities/": "/src/entities/",
      "@features/": "/src/features/",
      "@widgets/": "/src/widgets/",
      "@shared/": "/src/shared/",
      "@pages/": "/src/pages/",
      "@app/": "/src/app/",
      "@config/": "/src/config/"
    }
  }
});
