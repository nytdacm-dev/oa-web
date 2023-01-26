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
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
  } as UserConfigExport,
  baseConfig
);
