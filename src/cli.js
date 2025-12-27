#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * CLI tool for i18n-generator
 * Works with any build tool: Webpack, Vite, Rollup, etc.
 */

function extractTranslations(obj, languages, lang) {
	const result = {};

	const processObject = (source, target) => {
		Object.keys(source).forEach((key) => {
			const value = source[key];

			if (value && typeof value === 'object' && !Array.isArray(value)) {
				if (value[lang]) {
					target[key] = value[lang];
				} else {
					const hasLangKeys = Object.keys(value).some((k) =>
						languages.includes(k)
					);

					if (!hasLangKeys) {
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

function generateTranslations(config) {
	const { languages = ['vi', 'en'], inputDir, outputDir } = config;

	console.log('🌍 i18n-generator CLI');
	console.log(`📁 Input: ${inputDir}`);
	console.log(`📁 Output: ${outputDir}`);
	console.log(`🗣️  Languages: ${languages.join(', ')}\n`);

	if (!fs.existsSync(inputDir)) {
		console.error(`❌ Error: Input directory not found: ${inputDir}`);
		process.exit(1);
	}

	const inputFiles = fs
		.readdirSync(inputDir)
		.filter((file) => file.endsWith('.json'));

	if (inputFiles.length === 0) {
		console.warn(`⚠️  Warning: No JSON files found in ${inputDir}`);
		return;
	}

	let totalGenerated = 0;

	inputFiles.forEach((inputFile) => {
		const filePath = path.join(inputDir, inputFile);
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const content = JSON.parse(fileContent);

		languages.forEach((lang) => {
			const outputContent = extractTranslations(content, languages, lang);
			const outputPath = path.join(outputDir, lang, inputFile);

			if (!fs.existsSync(path.dirname(outputPath))) {
				fs.mkdirSync(path.dirname(outputPath), { recursive: true });
			}

			fs.writeFileSync(outputPath, JSON.stringify(outputContent, null, 2));
			totalGenerated++;
			console.log(`✓ Generated: ${lang}/${inputFile}`);
		});
	});

	console.log(`\n✨ Success! Generated ${totalGenerated} files`);
}

// Load config
async function loadConfig() {
	const configPath = path.join(process.cwd(), 'i18n.config.js');

	if (fs.existsSync(configPath)) {
		console.log('📋 Loading config from i18n.config.js\n');

		// Try ESM import first, fallback to CJS require
		try {
			const configUrl = new URL(`file://${configPath}`);
			const module = await import(configUrl.href);
			return module.default || module;
		} catch (esmError) {
			// If ESM fails, try CJS require
			try {
				return require(configPath);
			} catch (cjsError) {
				throw new Error(`Failed to load config: ${esmError.message}`);
			}
		}
	}

	// Try package.json
	const pkgPath = path.join(process.cwd(), 'package.json');
	if (fs.existsSync(pkgPath)) {
		const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
		if (pkg.i18nGenerator) {
			console.log('📋 Loading config from package.json\n');
			return pkg.i18nGenerator;
		}
	}

	console.error('❌ Error: No configuration found!');
	console.error('\nCreate i18n.config.js with:');
	console.error(`
		module.exports = {
			languages: ['vi', 'en'],
			inputDir: './src/translations',
			outputDir: './public/locales',
		};
	`);
	process.exit(1);
}

// Parse CLI arguments
const args = process.argv.slice(2);
const flags = {};
args.forEach((arg) => {
	if (arg.startsWith('--')) {
		const [key, value] = arg.slice(2).split('=');
		flags[key] = value || true;
	}
});

// Show help
if (flags.help || flags.h) {
	console.log(`
i18n-generator CLI

Usage:
  i18n-gen                   Generate translations using config file
  i18n-gen --help           Show this help message
  i18n-gen --version        Show version
  i18n-gen --watch          Watch mode (coming soon)

Config file (i18n.config.js):
  module.exports = {
    languages: ['vi', 'en', 'zh'],
    inputDir: './src/translations',
    outputDir: './public/locales',
  };

Or add to package.json:
  {
    "i18nGenerator": {
      "languages": ["vi", "en"],
      "inputDir": "./src/translations",
      "outputDir": "./public/locales"
    }
  }

Example:
  npm run i18n-gen
  pnpm i18n-gen
	`);
	process.exit(0);
}

// Show version
if (flags.version || flags.v) {
	const pkg = require('../package.json');
	console.log(pkg.version);
	process.exit(0);
}

// Run generator
(async () => {
	try {
		const config = await loadConfig();
		generateTranslations(config);
	} catch (error) {
		console.error('❌ Error:', error.message);
		process.exit(1);
	}
})();
