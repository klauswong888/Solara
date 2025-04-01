import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    AutoImport({
      imports: [
        'react', //auto import useState, useEffect
        'react-router-dom',
        {
          'zustand': ['useStore'], // zustand
        },
        {
          'react-redux': ['useSelector', 'useDispatch'],
        },
        {
          'axios': [['default', 'axios']]
        },
        {
          'clsx': [['default', 'clsx']] 
        }
      ],
      dts: './auto-imports.d.ts', // auto genrate import hooks type
    }),
  ],
})
