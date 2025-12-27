declare module '@mg/i18n-generator' {
	import { Compiler } from 'webpack';

	/**
	 * Options for i18n-generator plugin
	 */
	export interface I18nGeneratorOptions {
		/**
		 * Array of language codes to generate
		 * @default ['vi', 'en']
		 * @example ['vi', 'en', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar']
		 */
		languages?: string[];

		/**
		 * Path to the directory containing input JSON files
		 * @example path.resolve(__dirname, 'src/translations')
		 */
		inputDir: string;

		/**
		 * Path to the directory where language files will be generated
		 * @example path.resolve(__dirname, 'public/locales')
		 */
		outputDir: string;
	}

	/**
	 * Translation object with nested structure
	 * @example
	 * {
	 *   "login": {
	 *     "title": { "vi": "Đăng nhập", "en": "Login" },
	 *     "email": {
	 *       "label": { "vi": "Email", "en": "Email" }
	 *     }
	 *   }
	 * }
	 */
	export type NestedTranslation = {
		[key: string]: TranslationValue | NestedTranslation;
	};

	/**
	 * Translation value with language keys
	 * @example { "vi": "Xin chào", "en": "Hello" }
	 */
	export type TranslationValue = {
		[languageCode: string]: string;
	};

	/**
	 * Flat translation with dot notation
	 * @example
	 * {
	 *   "booking.summary.text": { "vi": "Tóm tắt", "en": "Summary" }
	 * }
	 */
	export type FlatTranslation = {
		[key: string]: TranslationValue;
	};

	/**
	 * Input translation format (supports both nested and flat)
	 */
	export type InputTranslation = NestedTranslation | FlatTranslation;

	/**
	 * Webpack plugin that generates language-specific translation files from a single source
	 *
	 * @remarks
	 * This plugin supports two popular translation formats:
	 * 1. Nested Object Structure - Hierarchical organization
	 * 2. Dot Notation - Flat keys with dots (e.g., "booking.summary.text")
	 *
	 * The plugin only runs when the 'i18n-generator' npm script is executed.
	 *
	 * @example
	 * ```typescript
	 * // webpack.config.ts
	 * import path from 'path';
	 * import i18nGenerator from '@mg/i18n-generator';
	 *
	 * export default {
	 *   plugins: [
	 *     new i18nGenerator({
	 *       languages: ['vi', 'en', 'zh', 'ja'],
	 *       inputDir: path.resolve(__dirname, 'src/translations'),
	 *       outputDir: path.resolve(__dirname, 'public/locales'),
	 *     }),
	 *   ],
	 * };
	 * ```
	 */
	export default class i18nGenerator {
		constructor(options: I18nGeneratorOptions);

		/**
		 * Extract translations for a specific language from input object
		 * Supports both nested objects and dot notation
		 * @param obj - Input translation object
		 * @param lang - Target language code
		 * @returns Extracted translations for the specified language
		 */
		extractTranslations(obj: InputTranslation, lang: string): Record<string, any>;

		/**
		 * Apply the plugin to webpack compiler
		 * @param compiler - Webpack compiler instance
		 */
		apply(compiler: Compiler): void;
	}
}

/**
 * Type-safe translation keys helper
 * Use this to get autocomplete for your translation keys
 *
 * @example
 * ```typescript
 * import type { TranslationKeys } from '@mg/i18n-generator';
 *
 * // Define your translation structure
 * type MyTranslations = {
 *   common: {
 *     welcome: string;
 *     hello: string;
 *   };
 *   auth: {
 *     login: {
 *       title: string;
 *       email: {
 *         label: string;
 *       };
 *     };
 *   };
 * };
 *
 * // Use with react-i18next
 * const { t } = useTranslation<TranslationKeys<MyTranslations>>();
 * t('auth:login.title'); // Type-safe!
 * ```
 */
export type TranslationKeys<T> = {
	[K in keyof T]: T[K] extends object
		? `${K & string}:${NestedKeys<T[K]>}`
		: never;
}[keyof T];

type NestedKeys<T> = {
	[K in keyof T]: T[K] extends object
		? `${K & string}.${NestedKeys<T[K]>}` | (K & string)
		: K & string;
}[keyof T];
