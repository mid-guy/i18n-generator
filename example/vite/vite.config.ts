import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No i18n plugin needed! Use CLI instead
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3001,
	},
});
