import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: "autoUpdate",
      manifestFilename: "manifest.json",
      devOptions: {
        enabled: false
      },
      manifest: {
        name: "Wedemy",
        short_name: "Wedemy",
        id: "/",
        description: "An e-learning platform",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "./img/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "./img/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        theme_color: "#5943be",
        background_color: "#ffffff",
        display: "standalone"
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 2500
  }
  // server : {
  //   port: 3000  <--- CHANGE PORT HERE
  // }
});
