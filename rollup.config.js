/** @format */

import styles from "rollup-plugin-styles";
import autoprefixer from "autoprefixer";
import babel from "@rollup/plugin-babel";
import sourcemaps from "rollup-plugin-sourcemaps";
import image from "rollup-plugin-img";
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

// the entry point for the library
const input = "./index.js";

//
var MODE = [
  {
    fomart: "cjs",
  },
  {
    fomart: "esm",
  },
  {
    fomart: "umd",
  },
];

var config = [];

MODE.map((m) => {
  var conf = {
    input: input,
    output: {
      // then name of your package
      name: "@mindbowser_inc/flexi-forms-renderer",
      file: `dist/index.${m.fomart}.js`,
      format: m.fomart,
      exports: "auto",
      interop: "auto",
    },
    // this externelizes react to prevent rollup from compiling it
    external: ["react", /@babel\/runtime/],
    plugins: [
      image({
        limit: 10000,
      }),

      // these are babel comfigurations
      babel({
        exclude: "node_modules/**",
        plugins: ["@babel/transform-runtime"],
        babelHelpers: "runtime",
      }),
      // this adds sourcemaps
      sourcemaps(),
      // this adds support for styles
      styles({
        postcss: {
          plugins: [autoprefixer()],
        },
      }),
      resolve(),
			terser(),
    ],
  };
  config.push(conf);
});

export default [...config];