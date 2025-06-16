import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/react/',
  build: {
    rollupOptions: {
      input: {
        // 显式声明所有可能的页面入口
        // home: 'src/pages/HomePage.tsx',
        // enroll: 'src/pages/EnrollPage.tsx',
        manager: 'src/pages/ManagerPage.tsx',
        order: 'src/pages/OrderPage.tsx'
      }
    }
  }
})
