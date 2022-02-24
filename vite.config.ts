import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteRsw from "vite-plugin-rsw";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
  },
  plugins: [
    react(),
    ViteRsw({
      crates: ["wasm-lib"],
    }),
  ],
});
