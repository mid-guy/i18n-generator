# i18n-Generator Example

This is an example React application demonstrating how to use the i18n-generator webpack plugin with **10 languages** and **multiple translation formats**.

## Features

- 🌍 **10 Languages**: Vietnamese, English, Chinese, Japanese, Korean, French, German, Spanish, Russian, Arabic
- 📁 **5 Namespaces**: common, home, auth, booking, errors
- 🎨 **2 Format Styles**: Nested Objects & Dot Notation
- ⚡ **Live Demo**: Interactive language switcher

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Generate translation files:
```bash
pnpm run i18n-generator
```

This will read the translation files from `src/translations/` and generate language-specific files in `public/locales/`.

## Translation Formats Demonstrated

### 1. Flat Keys (common.json, home.json)
Simple key-value pairs:
```json
{
	"welcome": {
		"vi": "Chào mừng",
		"en": "Welcome"
	}
}
```

### 2. Nested Objects (auth.json)
Hierarchical structure:
```json
{
	"login": {
		"title": {
			"vi": "Đăng nhập",
			"en": "Login"
		},
		"email": {
			"label": { "vi": "Email", "en": "Email" }
		}
	}
}
```

### 3. Dot Notation (booking.json, errors.json)
Flat keys with dot notation:
```json
{
	"booking.summary.text": {
		"vi": "Tóm tắt đặt phòng",
		"en": "Booking Summary"
	}
}
```

## Generated Structure

Each language gets its own directory with 5 namespace files:

```
public/locales/
├── vi/
│   ├── common.json
│   ├── home.json
│   ├── auth.json      (nested object)
│   ├── booking.json   (dot notation)
│   └── errors.json    (dot notation)
├── en/
│   └── ... (same structure)
└── ... (10 languages total)
```

**Total:** 50 files (5 namespaces × 10 languages)

## Running the App

Development mode:
```bash
pnpm run dev
```

Production build:
```bash
pnpm run build
```

The app will be available at http://localhost:3000

## Demo Sections

The example app demonstrates:

1. **Language Selector** - Switch between 10 languages with flag buttons
2. **Nested Object Example** - Login form using auth namespace
3. **Dot Notation Example** - Booking summary using booking namespace
4. **Error Messages** - Various error messages using errors namespace

All translations update dynamically when you switch languages!
