import { mergeConfig, type UserConfigExport } from "vite";
import baseConfig from "./vite.config.base";

export default mergeConfig(
  {
    mode: "production",
  } as UserConfigExport,
  baseConfig
);
