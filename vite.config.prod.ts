import { type UserConfigExport, mergeConfig } from 'vite'
import baseConfig from './vite.config.base'

export default mergeConfig(
  {
    mode: 'production',
  } as UserConfigExport,
  baseConfig,
)
