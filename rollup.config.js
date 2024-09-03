const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const babel = require('@rollup/plugin-babel');

module.exports = {
	input: 'src/index.js', // Entry point
	output: [
		{
			file: 'dist/index.cjs.js', // Output file
			format: 'cjs', // CommonJS format for Node.js compatibility
			sourcemap: true, // Include source maps for debugging
		},
		{
			file: 'dist/index.esm.js', // ES Module format
			format: 'esm',
			sourcemap: true,
		},
	],
	plugins: [
		resolve(), // Resolve Node.js modules
		commonjs(), // Convert CommonJS modules to ES6
		babel({
			exclude: 'node_modules/**', // Only transpile our source code
			babelHelpers: 'bundled',
		}),
		terser(), // Minify the output for production
	],
	external: ['fs', 'path'], // Mark these Node.js built-ins as external
};
