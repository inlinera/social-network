import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Настройка алиасов для импортов
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Подключаем плагины
  plugins: [react()],
  // Настройки сборки
  build: {
    // Используем terser для минификации
    minify: 'terser',
    terserOptions: {
      compress: {
        // Удаляем console.log в production
        drop_console: true,
        // Удаляем debugger в production
        drop_debugger: true,
        // Удаляем неиспользуемый код
        dead_code: true,
        // Удаляем неиспользуемые функции
        unused: true,
      },
    },
    rollupOptions: {
      output: {
        // Разделяем код на чанки для оптимизации загрузки
        manualChunks: {
          // React core и routing
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // UI компоненты и иконки
          'vendor-ui': ['antd', '@ant-design/icons', 'lucide-react', 'react-toastify'],

          // State management
          'vendor-state': ['mobx', 'mobx-react-lite', 'mobx-toolbox'],

          // Firebase и утилиты
          'vendor-utils': ['uuid', '@tanstack/react-virtual', 'react-intersection-observer'],

          // i18n
          'vendor-i18n': ['i18next', 'react-i18next'],

          // Forms
          'vendor-forms': ['react-hook-form'],

          // Разделяем основные компоненты приложения
          'app-layout': ['@/widgets/layout'],
          'app-posts': ['@/widgets/posts', '@/entities/posts'],
          'app-auth': ['@/pages/auth', '@/entities/auth', '@/entities/@common/auth-modal'],
          'app-chat': ['@/pages/chats', '@/entities/chats'],
          'app-user': ['@/pages/user', '@/entities/user'],
        },
        // Оптимизация размера чанков
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
  },
})
