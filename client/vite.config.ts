import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  console.log("Proxy Target:", env.VITE_API_URL);
  return {
    plugins: [react()],
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: env.VITE_API_URL,
    //       changeOrigin: true,
    //       secure: false,
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //   },
    // },
    resolve: {
      alias: {
        '/api': env.VITE_API_URL,
      },
    },
  };
});
