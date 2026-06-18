import { defineConfig as lovableConfig } from "@lovable.dev/vite-tanstack-config";

// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).

const baseConfig = lovableConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

// Create a final config object that explicitly has a 'plugins' property at the top level
// This is to satisfy the Cloudflare Pages automated build parser.
const finalConfig = {
  ...baseConfig,
  plugins: [...((baseConfig as any).plugins || [])]
};

export default finalConfig;
