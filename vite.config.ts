import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This allows the code to use process.env.API_KEY in the browser
      // securely injecting it during build time or dev time.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});