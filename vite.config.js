import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/Pokemin/', // dit moet exact je repo-naam zijn
  plugins: [react()],
});
