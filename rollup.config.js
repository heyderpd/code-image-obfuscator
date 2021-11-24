import { babel } from '@rollup/plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { minify } from 'uglify-es'
import uglify from 'rollup-plugin-uglify'


export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/cio.bundle.js',
    format: 'iife',
    name: 'cio',
  },
  plugins: [
    replace({
      'serverHandler': 'clientHandler',
    }),
    typescript(),
    json(),
    babel({
      babelrc: false,
      presets: [
        [
          "es2015", {
            "modules": false
          }
        ]
      ],
      exclude: ['node_modules/**', 'src/canvas/server.ts'],
    }),
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
    uglify({}, minify),
  ],
}
