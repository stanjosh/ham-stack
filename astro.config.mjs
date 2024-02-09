import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: "standalone"
  }),
  server: {
    host: "0.0.0.0"
  },
  integrations: [ auth()]
});