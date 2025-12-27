const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const i18nGenerator = require('../../dist/index.cjs.js');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new i18nGenerator({
			languages: ['vi', 'en', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar'],
			inputDir: path.resolve(__dirname, 'src/translations'),
			outputDir: path.resolve(__dirname, 'public/locales'),
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		compress: true,
		port: 3000,
		hot: true,
	},
};
