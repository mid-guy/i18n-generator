const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const path = require('path');

/**
 * Worker thread for processing individual files
 * Runs in separate thread to avoid blocking main event loop
 */

function extractTranslationsIterative(obj, lang, languageSet) {
	const result = {};
	const stack = [{ source: obj, target: result }];

	while (stack.length > 0) {
		const { source, target } = stack.pop();

		for (const key of Object.keys(source)) {
			const value = source[key];

			if (value === null || typeof value !== 'object' || Array.isArray(value)) {
				continue;
			}

			if (value[lang]) {
				target[key] = value[lang];
			} else {
				const hasLangKeys = Object.keys(value).some(k => languageSet.has(k));

				if (!hasLangKeys) {
					target[key] = {};
					stack.push({
						source: value,
						target: target[key]
					});
				}
			}
		}
	}

	return result;
}

async function extractTranslationsChunked(obj, lang, languageSet, chunkSize) {
	const result = {};
	const entries = Object.entries(obj);

	for (let i = 0; i < entries.length; i += chunkSize) {
		const chunk = entries.slice(i, i + chunkSize);
		const chunkObj = Object.fromEntries(chunk);

		const chunkResult = extractTranslationsIterative(chunkObj, lang, languageSet);
		Object.assign(result, chunkResult);

		// Yield to event loop
		if (i + chunkSize < entries.length) {
			await new Promise(resolve => setImmediate(resolve));
		}
	}

	return result;
}

// Main worker logic
(async () => {
	try {
		const { filePath, inputFile, outputDir, languages, chunkSize } = workerData;
		const languageSet = new Set(languages);

		// Read file
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const content = JSON.parse(fileContent);

		const results = [];

		// Process each language
		for (const lang of languages) {
			const outputContent = await extractTranslationsChunked(
				content,
				lang,
				languageSet,
				chunkSize
			);

			const outputPath = path.join(outputDir, lang, inputFile);

			results.push({
				lang,
				outputPath,
				outputContent
			});
		}

		// Send results back to main thread
		parentPort.postMessage(results);
	} catch (error) {
		parentPort.postMessage({ error: error.message, stack: error.stack });
		process.exit(1);
	}
})();
