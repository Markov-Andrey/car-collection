import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import pages from 'vite-plugin-pages'

export default defineConfig({
    base: '/car-collection/',
    plugins: [
        vue(),
        tailwindcss(),
        pages()
    ]
})