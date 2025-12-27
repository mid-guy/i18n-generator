# TypeScript Support

i18n-generator includes full TypeScript support with type definitions and examples.

## Installation

```bash
npm install i18n-generator --save-dev
# or
pnpm add -D i18n-generator
```

## Webpack Configuration

### webpack.config.ts

```typescript
import path from 'path';
import i18nGenerator from 'i18n-generator';
import type { Configuration } from 'webpack';

const config: Configuration = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	plugins: [
		new i18nGenerator({
			languages: ['vi', 'en', 'zh', 'ja'],
			inputDir: path.resolve(__dirname, 'src/translations'),
			outputDir: path.resolve(__dirname, 'public/locales'),
		}),
	],
};

export default config;
```

## Translation Types

### Define Your Translation Structure

```typescript
// src/types/translations.ts

export interface CommonTranslations {
	welcome: string;
	hello: string;
	goodbye: string;
	thank_you: string;
}

export interface AuthTranslations {
	login: {
		title: string;
		email: {
			label: string;
			placeholder: string;
		};
		password: {
			label: string;
			placeholder: string;
		};
		button: {
			submit: string;
			forgot_password: string;
		};
	};
	register: {
		title: string;
		button: {
			submit: string;
		};
	};
}

export interface BookingTranslations {
	'booking.title': string;
	'booking.summary.text': string;
	'booking.summary.total': string;
	'booking.dates.checkin': string;
	'booking.dates.checkout': string;
	'booking.guests.adults': string;
	'booking.guests.children': string;
	'booking.payment.method': string;
	'booking.payment.card': string;
	'booking.confirmation.success': string;
	'booking.confirmation.message': string;
}

export interface Translations {
	common: CommonTranslations;
	auth: AuthTranslations;
	booking: BookingTranslations;
}
```

## React i18next Integration

### i18n.ts

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { Resource } from 'i18next';

// Import generated translation files
import commonVi from '../public/locales/vi/common.json';
import commonEn from '../public/locales/en/common.json';
import authVi from '../public/locales/vi/auth.json';
import authEn from '../public/locales/en/auth.json';

const resources: Resource = {
	vi: {
		common: commonVi,
		auth: authVi,
	},
	en: {
		common: commonEn,
		auth: authEn,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'vi',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
```

### Type-Safe Usage in Components

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

function LoginForm() {
	const { t } = useTranslation(['common', 'auth']);

	return (
		<div>
			<h1>{t('auth:login.title')}</h1>

			<div>
				<label>{t('auth:login.email.label')}</label>
				<input
					type="email"
					placeholder={t('auth:login.email.placeholder')}
				/>
			</div>

			<div>
				<label>{t('auth:login.password.label')}</label>
				<input
					type="password"
					placeholder={t('auth:login.password.placeholder')}
				/>
			</div>

			<button>{t('auth:login.button.submit')}</button>
			<button>{t('auth:login.button.forgot_password')}</button>
		</div>
	);
}

export default LoginForm;
```

## Advanced: Type-Safe Translation Keys

For full type safety with autocomplete:

```typescript
// src/types/i18n.d.ts
import 'react-i18next';
import type { Translations } from './translations';

declare module 'react-i18next' {
	interface CustomTypeOptions {
		defaultNS: 'common';
		resources: Translations;
	}
}
```

Now you'll get full autocomplete:

```typescript
function App() {
	const { t } = useTranslation();

	// ✅ Type-safe! Autocomplete works
	t('common:welcome');
	t('auth:login.email.label');
	t('booking:booking.summary.text');

	// ❌ TypeScript error - key doesn't exist
	// t('common:invalid_key');
}
```

## Input Translation Format

### Nested Objects (auth.json)

```typescript
{
	"login": {
		"title": {
			"vi": "Đăng nhập",
			"en": "Login"
		},
		"email": {
			"label": {
				"vi": "Email",
				"en": "Email"
			}
		}
	}
}
```

### Dot Notation (booking.json)

```typescript
{
	"booking.title": {
		"vi": "Đặt phòng",
		"en": "Booking"
	},
	"booking.summary.text": {
		"vi": "Tóm tắt đặt phòng",
		"en": "Booking Summary"
	}
}
```

## Plugin Options Type

```typescript
import type { I18nGeneratorOptions } from 'i18n-generator';

const options: I18nGeneratorOptions = {
	languages: ['vi', 'en', 'zh', 'ja'],
	inputDir: path.resolve(__dirname, 'src/translations'),
	outputDir: path.resolve(__dirname, 'public/locales'),
};
```

## Best Practices

1. **Define translation types** - Create interfaces for your translations
2. **Use strict mode** - Enable `strict: true` in tsconfig.json
3. **Type your resources** - Use `Resource` type from i18next
4. **Extend react-i18next** - Add custom type definitions for autocomplete
5. **Organize by namespace** - Keep related translations together

## Example Project Structure

```
my-app/
├── src/
│   ├── types/
│   │   ├── translations.ts      # Translation interfaces
│   │   └── i18n.d.ts            # react-i18next augmentation
│   ├── translations/
│   │   ├── common.json          # Input translations
│   │   ├── auth.json
│   │   └── booking.json
│   ├── i18n.ts                  # i18next configuration
│   └── App.tsx
├── public/
│   └── locales/                 # Generated by plugin
│       ├── vi/
│       │   ├── common.json
│       │   ├── auth.json
│       │   └── booking.json
│       └── en/
│           └── ...
├── webpack.config.ts
└── tsconfig.json
```

## tsconfig.json

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"module": "ESNext",
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"jsx": "react-jsx",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"resolveJsonModule": true,
		"moduleResolution": "node",
		"allowSyntheticDefaultImports": true,
		"forceConsistentCasingInFileNames": true
	},
	"include": ["src"],
	"exclude": ["node_modules", "dist"]
}
```

## Need Help?

- Check the [main README](./README.md) for general usage
- See the [example](./example) directory for a working React app
- Report issues on [GitHub](https://github.com/yourusername/i18n-generator/issues)
