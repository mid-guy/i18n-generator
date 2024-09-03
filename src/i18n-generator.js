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

	apply(compiler) {
		// If shouldRun is false, do nothing
		if (!this.shouldRun) {
			return;
		}

		compiler.hooks.emit.tapAsync('i18nGenerator', (compilation, callback) => {
			try {
				const inputFiles = fs
					.readdirSync(this.inputDir)
					.filter((file) => file.endsWith('.json'));

				inputFiles.forEach((inputFile) => {
					const filePath = path.join(this.inputDir, inputFile);
					const content = require(filePath);

					this.languages.forEach((lang) => {
						const outputContent = {};
						Object.keys(content).forEach((key) => {
							if (content[key][lang]) {
								outputContent[key] = content[key][lang];
							}
						});

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
				console.error('ERROR:', error);
				callback(error);
			}
		});
	}
}

module.exports = i18nGenerator;
