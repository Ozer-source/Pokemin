import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Pokemin/', // exact je repo-naam
  plugins: [react()],
});
