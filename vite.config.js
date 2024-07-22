import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        alias: {
            "@": fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    build: {
        lib: {
            // the entry file that is loaded whenever someone imports
            // your plugin in their app
            entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),

            // the exposed global variable
            // is required when formats includes 'umd' or 'iife'
            name: 'TipTapEditor',

            // the proper extensions will be added, ie:
            // name.js (es module)
            // name.umd.cjs) (common js module)
            // default fileName is the name option of package.json
            fileName: 'tip-tap-editor'
        },
        rollupOptions: {

            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue'
                }
            }
        },
        commonjsOptions: {
            include: []
        }
    }
})