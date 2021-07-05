import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                        return `element-plus/lib/theme-chalk/${name}.css`;
                    },
                    resolveComponent: (name) => {
                        return `element-plus/lib/${name}`;
                    },
                }
            ]
        })
    ],
    build: {
        outDir: "dist",
        assetsDir: "assets"
    },
    base: './',
    server: {
        host: "0.0.0.0",
        port: 8080,
        open: false,
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3333/',
                changeOrigin: true,
                ws: true,
                rewrite: (pathStr) => pathStr.replace('/api', '')
            },
        },
    }
})
