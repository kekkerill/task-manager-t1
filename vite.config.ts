import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "src"),
      "@entities": path.resolve(__dirname, "src/entities"),
      "@features": path.resolve(__dirname, "src/features"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@app": path.resolve(__dirname, "src/app"),
      "@config": path.resolve(__dirname, "src/config")
    }
  }
});
