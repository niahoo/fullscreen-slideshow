import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss'

import { writeFileSync } from 'fs'

const production = !process.env.ROLLUP_WATCH;
const outputJs = production
	? 'dist/fsss.min.js'
	: 'public/fsss.js'

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'Fsss', // export in global namespace
    file: outputJs
  },
  plugins: [

    svelte({
      // opt in to v3 behaviour today
      skipIntroByDefault: true,
      nestedTransitions: true,

      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: false
    }),

		postcss({ extract: true, minimize: production }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve(),
    commonjs(),


    // If we're building for production (npm run build
    // instead of npm run dev), transpile and minify
    production && buble({
      include: ['src/**', 'node_modules/svelte/shared.js']
    }),
    production && uglify()
  ]
};
