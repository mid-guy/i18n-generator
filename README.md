# i18nGenerator

[English](#english) | [Tiếng Việt](#tiếng-việt)

## English

i18nGenerator is a webpack plugin that automatically generates language files for your multilingual application. It reads input JSON files containing translation keys for multiple languages and produces separate language files.

### Installation

To install i18nGenerator, run the following command:

```bash
npm install i18n-generator --save-dev
```

### Usage

1. Add the plugin to your webpack configuration file:

```javascript
const i18nGenerator = require('i18n-generator');

module.exports = {
	// ... other webpack configurations
	plugins: [
		new i18nGenerator({
			languages: ['vi', 'en'],
			inputDir: path.resolve(__dirname, 'src/translations'),
			outputDir: path.resolve(__dirname, 'public/locales'),
		}),
	],
};
```

2. Add a script to your `package.json`:

```json
{
	"scripts": {
		"i18n-generator": "webpack --config webpack.config.js"
	}
}
```

3. Run the generator:

```bash
npm run i18n-generator
```

### Input File Structure

The input JSON files should have the following structure:

```json
{
	"key1": {
		"vi": "Vietnamese value",
		"en": "English value"
	},
	"key2": {
		"vi": "Another value in Vietnamese",
		"en": "Another value in English"
	}
}
```

### Options

- `languages`: Array of language codes (default: `['vi', 'en']`)
- `inputDir`: Path to the directory containing input JSON files
- `outputDir`: Path to the directory where language files will be generated

### How It Works

The plugin only runs when the `i18n-generator` script is called. It will:

1. Read all JSON files in `inputDir`
2. For each file, create separate language files in `outputDir/{language}/`
3. Each language file will only contain keys and values for that specific language

### Notes

- Ensure that `inputDir` and `outputDir` exist before running the plugin
- The plugin will automatically create subdirectories in `outputDir` if they don't exist

### Contributing

If you encounter any issues or have suggestions for improvements, please create an issue or pull request on our GitHub repository.

### License

MIT

---

## Tiếng Việt

i18nGenerator là một plugin webpack để tự động tạo ra các file ngôn ngữ cho ứng dụng đa ngôn ngữ của bạn. Nó đọc các file JSON đầu vào chứa các khóa dịch cho nhiều ngôn ngữ và tạo ra các file ngôn ngữ riêng biệt.

### Cài đặt

Để cài đặt i18nGenerator, chạy lệnh sau:

```bash
npm install i18n-generator --save-dev
```

### Sử dụng

1. Thêm plugin vào file cấu hình webpack của bạn:

```javascript
const i18nGenerator = require('i18n-generator');

module.exports = {
	// ... các cấu hình webpack khác
	plugins: [
		new i18nGenerator({
			languages: ['vi', 'en'],
			inputDir: path.resolve(__dirname, 'src/translations'),
			outputDir: path.resolve(__dirname, 'public/locales'),
		}),
	],
};
```

2. Thêm script vào `package.json`:

```json
{
	"scripts": {
		"i18n-generator": "webpack --config webpack.config.js"
	}
}
```

3. Chạy generator:

```bash
npm run i18n-generator
```

### Cấu trúc file đầu vào

File JSON đầu vào nên có cấu trúc như sau:

```json
{
	"key1": {
		"vi": "Giá trị tiếng Việt",
		"en": "English value"
	},
	"key2": {
		"vi": "Một giá trị khác",
		"en": "Another value"
	}
}
```

### Tùy chọn

- `languages`: Mảng các mã ngôn ngữ (mặc định: `['vi', 'en']`)
- `inputDir`: Đường dẫn đến thư mục chứa các file JSON đầu vào
- `outputDir`: Đường dẫn đến thư mục nơi các file ngôn ngữ sẽ được tạo ra

### Cách hoạt động

Plugin sẽ chỉ chạy khi script `i18n-generator` được gọi. Nó sẽ:

1. Đọc tất cả các file JSON trong `inputDir`
2. Với mỗi file, tạo ra các file ngôn ngữ riêng biệt trong `outputDir/{language}/`
3. Mỗi file ngôn ngữ sẽ chỉ chứa các khóa và giá trị cho ngôn ngữ đó

### Lưu ý

- Đảm bảo rằng `inputDir` và `outputDir` tồn tại trước khi chạy plugin
- Plugin sẽ tự động tạo các thư mục con trong `outputDir` nếu chúng chưa tồn tại

### Đóng góp

Nếu bạn gặp bất kỳ vấn đề nào hoặc có đề xuất cải tiến, vui lòng tạo issue hoặc pull request trên repository GitHub của chúng tôi.

### Giấy phép

MIT
