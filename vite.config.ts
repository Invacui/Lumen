import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "./environments",
  envPrefix: "VITE_",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 4000,
    open: false,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: process.env["VITE_API_URL"] ?? "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
