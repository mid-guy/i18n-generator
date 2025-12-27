/**
 * i18n-generator configuration
 *
 * This config works with:
 * - CLI mode (i18n-gen command)
 * - Webpack plugin
 * - Vite (via CLI in build script)
 * - Any build tool
 *
 * For ESM projects (Vite, package.json with "type": "module"):
 *   export default { ... }
 *
 * For CommonJS projects (Webpack):
 *   module.exports = { ... }
 */

// CommonJS (Webpack)
module.exports = {
	/**
	 * Array of language codes to generate
	 * @type {string[]}
	 */
	languages: ['vi', 'en', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar'],

	/**
	 * Input directory containing translation JSON files
	 * @type {string}
	 */
	inputDir: './src/translations',

	/**
	 * Output directory for generated language files
	 * @type {string}
	 */
	outputDir: './public/locales',
};

// ESM (Vite) - Uncomment and use this instead:
// export default {
// 	languages: ['vi', 'en', 'zh', 'ja', 'ko'],
// 	inputDir: './src/translations',
// 	outputDir: './public/locales',
// };
