import { mergeConfig, UserConfigExport } from "vite";
import baseConfig from "./vite.config.base";

export default mergeConfig(
  {
    mode: "development",
    server: {
      open: true,
      fs: {
        strict: true,
      },
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
  } as UserConfigExport,
  baseConfig
);
