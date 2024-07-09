import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { format } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode }) => {
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@store': path.resolve(__dirname, './src/store'),
        '@modules': path.resolve(__dirname, './src/modules'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages')
      }
    },
    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, './src/components/index.ts'),
        name: 'AdminLteVue3',        
        fileName: (format) => {
          if (format === 'es') {
            return `adminlte-vue3.esm-browser.js`;
          }
          if (format === 'umd') {
            return `adminlte-vue3.umd.min.js`;
          }
          return `adminlte-vue3.${format}.js`
        },
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          }
        }
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.ts',
    },
  }
})
