import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const isDev = command === 'serve';
  
  const {
    VITE_TITLE,
    VITE_KEYWORDS,
    VITE_DESCRIPTION,
    VITE_COPYRIGHT,
    VITE_URL,
  } = loadEnv('all', process.cwd());

  return {
    base: isDev ? '/' : './',
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: isDev,
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            injectScript: isDev ? 
              '' :
              `<script async src="https://www.googletagmanager.com/gtag/js?id=G-E8H9YJZQJP"></script>
              <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-E8H9YJZQJP');
              </script>`,
            meta: {
              title: VITE_TITLE,
              keywords: VITE_KEYWORDS,
              description: VITE_DESCRIPTION,
              copyright: VITE_COPYRIGHT,
              url: VITE_URL,
            },
          }
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
