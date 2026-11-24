import { dirname, resolve } from "node:path";
import { URL, fileURLToPath } from "node:url";

import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";

import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://vue-i18n.intlify.dev/guide/advanced/sfc.html#configure-plugin-for-vite
    VueI18nPlugin({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./src/locales/**"
      ),
    }),
    ViteImageOptimizer({
      png: {
        quality: 85,
      },
      jpeg: {
        quality: 85,
      },
      jpg: {
        quality: 85,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // wtx gives each worktree its own port. The main checkout keeps 5173.
  server: {
    port: Number(process.env.FRONTEND_PORT) || 5173,
    strictPort: !!process.env.FRONTEND_PORT,
  },
});
