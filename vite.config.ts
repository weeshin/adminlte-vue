import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
      
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true
    }),
    viteStaticCopy({
      targets: [
        { src: 'src/assets/scss', dest: "dist/assets" }
      ]
    })
  ],
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
    // outDir: 'dist/component',
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'AdminLteVue3',     
      fileName: "adminlte-vue3"
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/components/main.ts"),
      },
      external: ['vue'],      
      output: {
        exports: "named",
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
  
})
