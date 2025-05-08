import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode !== 'app';

  return {
    plugins: [
      react(),
      isLib && dts({
        insertTypesEntry: true,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    build: isLib ? {
      // 库模式配置
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'Pivot',
        fileName: (format) => `pivot.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    } : {
      // 应用模式配置
      outDir: 'dist',
      chunkSizeWarningLimit: 1600,
    },
  };
});
