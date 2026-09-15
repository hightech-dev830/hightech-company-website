import path from 'path';
import { existsSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import seoRoutes from './src/data/seo-routes.json';

// Vercel resolves directory indexes at canonical, slashless URLs. Vite's
// default SPA preview fallback only tries directory indexes for trailing '/'.
function prerenderedSeoPreview(): Plugin {
  return {
    name: 'prerendered-seo-preview',
    configurePreviewServer(server) {
      server.middlewares.use((request, _response, next) => {
        if (!request.url || (request.method !== 'GET' && request.method !== 'HEAD')) return next();
        const queryStart = request.url.indexOf('?');
        const pathname = queryStart < 0 ? request.url : request.url.slice(0, queryStart);
        const query = queryStart < 0 ? '' : request.url.slice(queryStart);
        const route = seoRoutes.find((item) => item.path !== '/' && item.path === pathname);
        if (
          route &&
          existsSync(
            path.resolve(
              server.config.root,
              server.config.build.outDir,
              route.path.slice(1),
              'index.html',
            ),
          )
        ) {
          request.url = `${route.path}/index.html${query}`;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), prerenderedSeoPreview()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
