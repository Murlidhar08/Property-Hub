import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import * as path from 'path';
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    port: 4000
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,png,svg,ico,jpg,json}"],
      },
      includeAssets: [
        "favicon.ico",
        "images/favicon-16x16.png",
        "images/favicon-32x32.png"
      ],
      manifest: {
        name: "Property Hub",
        short_name: "PropertyHub",
        description: "Organize, Track, and Manage Your Property with Ease.",
        theme_color: "#ff69b4",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/images/logo/maskable_icon_x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/logo/maskable_icon_x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/logo/maskable_icon_x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/logo/maskable_icon_x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/logo/maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/logo/maskable_icon_x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/logo/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/images/logo/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/images/logo/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "/images/logo/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/images/logo/favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
          }
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(path.dirname(), 'src') },
    ],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
