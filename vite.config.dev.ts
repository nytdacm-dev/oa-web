import type { UserConfigExport } from 'vite'
import { mergeConfig } from 'vite'
import baseConfig from './vite.config.base'

export default mergeConfig(
  {
    mode: 'development',
    server: {
      fs: {
        strict: true,
      },
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  } as UserConfigExport,
  baseConfig,
)
