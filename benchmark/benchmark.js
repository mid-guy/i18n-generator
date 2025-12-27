const fs = require('fs');
const path = require('path');
const i18nGenerator = require('../src/i18n-generator');
const i18nGeneratorOptimized = require('../src/i18n-generator-optimized');

/**
 * Benchmark comparison between original and optimized versions
 */

// Generate large test file
function generateLargeTestFile(outputPath, numKeys = 10000, depth = 5) {
	console.log(`Generating test file with ~${numKeys} keys and depth ${depth}...`);

	function generateNestedObject(currentDepth, keysRemaining) {
		if (currentDepth === 0 || keysRemaining <= 0) {
			return {
				vi: `Văn bản tiếng Việt ${Math.random()}`,
				en: `English text ${Math.random()}`,
				ja: `日本語テキスト ${Math.random()}`,
				ko: `한국어 텍스트 ${Math.random()}`,
				zh: `中文文本 ${Math.random()}`
			};
		}

		const obj = {};
		const numChildren = Math.min(10, Math.ceil(keysRemaining / (currentDepth * 2)));

		for (let i = 0; i < numChildren; i++) {
			const key = `key_${currentDepth}_${i}_${Math.random().toString(36).substr(2, 9)}`;
			obj[key] = generateNestedObject(currentDepth - 1, Math.floor(keysRemaining / numChildren));
		}

		return obj;
	}

	const data = generateNestedObject(depth, numKeys);

	// Ensure directory exists
	const dir = path.dirname(outputPath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

	const stats = fs.statSync(outputPath);
	const sizeKB = (stats.size / 1024).toFixed(2);
	const lines = fs.readFileSync(outputPath, 'utf-8').split('\n').length;

	console.log(`✅ Generated: ${sizeKB} KB, ${lines.toLocaleString()} lines\n`);

	return { sizeKB, lines };
}

async function runBenchmark(name, GeneratorClass, options) {
	console.log(`\n${'='.repeat(60)}`);
	console.log(`🏃 Running: ${name}`);
	console.log('='.repeat(60));

	const generator = new GeneratorClass(options);

	const startTime = Date.now();
	const startMem = process.memoryUsage();

	await generator.run();

	const endTime = Date.now();
	const endMem = process.memoryUsage();

	const duration = (endTime - startTime) / 1000;
	const memUsed = (endMem.heapUsed - startMem.heapUsed) / 1024 / 1024;

	console.log(`\n📊 Results for ${name}:`);
	console.log(`   Duration: ${duration.toFixed(2)}s`);
	console.log(`   Memory: ${memUsed.toFixed(2)} MB`);
	console.log(`   Peak memory: ${(endMem.heapUsed / 1024 / 1024).toFixed(2)} MB`);

	return { duration, memUsed, peakMem: endMem.heapUsed / 1024 / 1024 };
}

async function main() {
	console.log('\n🎯 i18n Generator Performance Benchmark\n');

	const testDir = path.join(__dirname, 'test-data');
	const outputDir = path.join(__dirname, 'output');
	const languages = ['vi', 'en', 'ja', 'ko', 'zh', 'fr', 'de', 'es', 'it', 'pt'];

	// Clean up previous test data
	if (fs.existsSync(outputDir)) {
		fs.rmSync(outputDir, { recursive: true });
	}

	// Test scenarios
	const scenarios = [
		{ name: 'Small (1K keys)', keys: 1000, depth: 3, files: 1 },
		{ name: 'Medium (10K keys)', keys: 10000, depth: 5, files: 5 },
		{ name: 'Large (50K keys)', keys: 50000, depth: 7, files: 10 },
		{ name: 'XLarge (100K keys)', keys: 100000, depth: 8, files: 20 }
	];

	const results = {};

	for (const scenario of scenarios) {
		console.log(`\n\n${'█'.repeat(70)}`);
		console.log(`  SCENARIO: ${scenario.name}`);
		console.log('█'.repeat(70));

		// Generate test files
		const inputDir = path.join(testDir, scenario.name.replace(/\s+/g, '-').toLowerCase());
		if (!fs.existsSync(inputDir)) {
			fs.mkdirSync(inputDir, { recursive: true });
		}

		for (let i = 0; i < scenario.files; i++) {
			const filePath = path.join(inputDir, `test-${i}.json`);
			generateLargeTestFile(filePath, scenario.keys, scenario.depth);
		}

		// Run benchmarks
		const options = {
			languages,
			inputDir,
			outputDir: path.join(outputDir, scenario.name.replace(/\s+/g, '-').toLowerCase())
		};

		// Original version
		const originalResult = await runBenchmark(
			'Original (Recursive)',
			i18nGenerator,
			options
		);

		// Clean output for next test
		if (fs.existsSync(options.outputDir)) {
			fs.rmSync(options.outputDir, { recursive: true });
		}

		// Optimized version - without workers
		const optimizedNoWorkersResult = await runBenchmark(
			'Optimized (No Workers)',
			i18nGeneratorOptimized,
			{ ...options, useWorkers: false }
		);

		// Clean output for next test
		if (fs.existsSync(options.outputDir)) {
			fs.rmSync(options.outputDir, { recursive: true });
		}

		// Optimized version - with workers
		const optimizedWithWorkersResult = await runBenchmark(
			'Optimized (With Workers)',
			i18nGeneratorOptimized,
			{ ...options, useWorkers: true }
		);

		results[scenario.name] = {
			original: originalResult,
			optimizedNoWorkers: optimizedNoWorkersResult,
			optimizedWithWorkers: optimizedWithWorkersResult
		};
	}

	// Print summary
	console.log('\n\n' + '='.repeat(80));
	console.log('📈 BENCHMARK SUMMARY');
	console.log('='.repeat(80));

	for (const [scenarioName, result] of Object.entries(results)) {
		console.log(`\n${scenarioName}:`);

		const speedupNoWorkers = (result.original.duration / result.optimizedNoWorkers.duration).toFixed(2);
		const speedupWorkers = (result.original.duration / result.optimizedWithWorkers.duration).toFixed(2);
		const memSavingNoWorkers = ((1 - result.optimizedNoWorkers.memUsed / result.original.memUsed) * 100).toFixed(1);
		const memSavingWorkers = ((1 - result.optimizedWithWorkers.memUsed / result.original.memUsed) * 100).toFixed(1);

		console.log('  Original:');
		console.log(`    Time: ${result.original.duration.toFixed(2)}s | Memory: ${result.original.memUsed.toFixed(2)} MB`);

		console.log('  Optimized (No Workers):');
		console.log(`    Time: ${result.optimizedNoWorkers.duration.toFixed(2)}s (${speedupNoWorkers}x faster) | Memory: ${result.optimizedNoWorkers.memUsed.toFixed(2)} MB (${memSavingNoWorkers}% less)`);

		console.log('  Optimized (With Workers):');
		console.log(`    Time: ${result.optimizedWithWorkers.duration.toFixed(2)}s (${speedupWorkers}x faster) | Memory: ${result.optimizedWithWorkers.memUsed.toFixed(2)} MB (${memSavingWorkers}% less)`);
	}

	console.log('\n' + '='.repeat(80));
	console.log('✅ Benchmark complete!\n');
}

main().catch(console.error);
