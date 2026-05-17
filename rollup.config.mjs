import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/ha-inkbird-irrigation-card.ts",
  output: {
    file: "dist/ha-inkbird-irrigation-card.js",
    format: "es",
  },
  plugins: [resolve(), typescript(), terser()],
};
