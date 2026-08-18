import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: false,
      },
    }),
  ],
  server: {
    port: 5000,
    proxy: {
      "/media": {
        target: "https://sololearn.uz",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom") ||
              id.includes("redux") ||
              id.includes("rematch")
            ) {
              return "vendor-core";
            }
            if (id.includes("antd") || id.includes("@ant-design")) {
              return "vendor-antd";
            }
            if (id.includes("recharts")) {
              return "vendor-charts";
            }
            if (id.includes("three") || id.includes("vanta")) {
              return "vendor-3d";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
