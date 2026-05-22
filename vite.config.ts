import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

function vitePluginOgImage() {
  return {
    name: 'vite-plugin-og-image',
    async buildStart() {
      const svgPath = path.resolve('public/og-image.svg');
      const pngPath = path.resolve('public/og-image.png');
      if (fs.existsSync(svgPath)) {
        try {
          await sharp(svgPath).png().toFile(pngPath);
          console.log('✅ Generated og-image.png from SVG');
        } catch (err) {
          console.error('❌ Error generating og-image.png:', err);
        }
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), vitePluginOgImage()],
  base: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/',
})
