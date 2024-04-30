import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import auth from "auth-astro";
import zeabur from '@zeabur/astro-adapter/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth()],
  output: 'server',
  adapter: zeabur()
});