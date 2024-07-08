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
        entry: path.resolve(__dirname, './src/main.ts'),
        name: 'AdminLteVue3',
        formats: ['umd', 'es'],
        fileName: (format) => `adminlte-vue3.${format}.min.js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          }
        }
      },
    }
  }
})
