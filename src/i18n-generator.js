const fs = require('fs');
const path = require('path');

class i18nGenerator {
	constructor(options) {
		this.languages = options.languages || ['vi', 'en'];
		this.inputDir = options.inputDir;
		this.outputDir = options.outputDir;

		// Check the environment variable directly within the plugin
		this.shouldRun = process.env.npm_lifecycle_event === 'i18n-generator';
	}

/**
	 * Extract translations for a specific language from nested object
	 * Supports both flat keys (e.g., "key") and dot notation keys (e.g., "booking.summary.text")
	 */
	extractTranslations(obj, lang) {
		const result = {};

		const processObject = (source, target) => {
			Object.keys(source).forEach((key) => {
				const value = source[key];

				// Check if this is a translation object (has language keys)
				if (value && typeof value === 'object' && !Array.isArray(value)) {
					// If it has the language key, it's a translation leaf
					if (value[lang]) {
						target[key] = value[lang];
					} else {
						// It's a nested structure, recurse
						const hasLangKeys = Object.keys(value).some((k) =>
							this.languages.includes(k)
						);

						if (!hasLangKeys) {
							// This is a nested object, not a translation
							target[key] = {};
							processObject(value, target[key]);
						}
					}
				}
			});
		};

		processObject(obj, result);
		return result;
	}
	apply(compiler) {
		// If shouldRun is false, do nothing
		if (!this.shouldRun) {
			return;
		}

		compiler.hooks.beforeCompile.tapAsync('i18nGenerator', (params, callback) => {
			try {
				const inputFiles = fs
					.readdirSync(this.inputDir)
					.filter((file) => file.endsWith('.json'));

				inputFiles.forEach((inputFile) => {
					const filePath = path.join(this.inputDir, inputFile);
					const fileContent = fs.readFileSync(filePath, 'utf-8');
					const content = JSON.parse(fileContent);

					this.languages.forEach((lang) => {
						const outputContent = this.extractTranslations(content, lang);

						const outputPath = path.join(this.outputDir, lang, inputFile);

						// Ensure directory exists
						if (!fs.existsSync(path.dirname(outputPath))) {
							fs.mkdirSync(path.dirname(outputPath), { recursive: true });
						}

						fs.writeFileSync(
							outputPath,
							JSON.stringify(outputContent, null, 2)
						);
					});
				});

				callback();
			} catch (error) {
				console.error('i18nGenerator Error:', error);
				callback(error);
			}
		});
	}
}

module.exports = i18nGenerator;
