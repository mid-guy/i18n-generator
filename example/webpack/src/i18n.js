import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import commonVi from '../public/locales/vi/common.json';
import commonEn from '../public/locales/en/common.json';
import commonZh from '../public/locales/zh/common.json';
import commonJa from '../public/locales/ja/common.json';
import commonKo from '../public/locales/ko/common.json';
import commonFr from '../public/locales/fr/common.json';
import commonDe from '../public/locales/de/common.json';
import commonEs from '../public/locales/es/common.json';
import commonRu from '../public/locales/ru/common.json';
import commonAr from '../public/locales/ar/common.json';

import homeVi from '../public/locales/vi/home.json';
import homeEn from '../public/locales/en/home.json';
import homeZh from '../public/locales/zh/home.json';
import homeJa from '../public/locales/ja/home.json';
import homeKo from '../public/locales/ko/home.json';
import homeFr from '../public/locales/fr/home.json';
import homeDe from '../public/locales/de/home.json';
import homeEs from '../public/locales/es/home.json';
import homeRu from '../public/locales/ru/home.json';
import homeAr from '../public/locales/ar/home.json';

import authVi from '../public/locales/vi/auth.json';
import authEn from '../public/locales/en/auth.json';
import authZh from '../public/locales/zh/auth.json';
import authJa from '../public/locales/ja/auth.json';
import authKo from '../public/locales/ko/auth.json';
import authFr from '../public/locales/fr/auth.json';
import authDe from '../public/locales/de/auth.json';
import authEs from '../public/locales/es/auth.json';
import authRu from '../public/locales/ru/auth.json';
import authAr from '../public/locales/ar/auth.json';

import bookingVi from '../public/locales/vi/booking.json';
import bookingEn from '../public/locales/en/booking.json';
import bookingZh from '../public/locales/zh/booking.json';
import bookingJa from '../public/locales/ja/booking.json';
import bookingKo from '../public/locales/ko/booking.json';
import bookingFr from '../public/locales/fr/booking.json';
import bookingDe from '../public/locales/de/booking.json';
import bookingEs from '../public/locales/es/booking.json';
import bookingRu from '../public/locales/ru/booking.json';
import bookingAr from '../public/locales/ar/booking.json';

import errorsVi from '../public/locales/vi/errors.json';
import errorsEn from '../public/locales/en/errors.json';
import errorsZh from '../public/locales/zh/errors.json';
import errorsJa from '../public/locales/ja/errors.json';
import errorsKo from '../public/locales/ko/errors.json';
import errorsFr from '../public/locales/fr/errors.json';
import errorsDe from '../public/locales/de/errors.json';
import errorsEs from '../public/locales/es/errors.json';
import errorsRu from '../public/locales/ru/errors.json';
import errorsAr from '../public/locales/ar/errors.json';

const resources = {
	vi: {
		common: commonVi,
		home: homeVi,
		auth: authVi,
		booking: bookingVi,
		errors: errorsVi,
	},
	en: {
		common: commonEn,
		home: homeEn,
		auth: authEn,
		booking: bookingEn,
		errors: errorsEn,
	},
	zh: {
		common: commonZh,
		home: homeZh,
		auth: authZh,
		booking: bookingZh,
		errors: errorsZh,
	},
	ja: {
		common: commonJa,
		home: homeJa,
		auth: authJa,
		booking: bookingJa,
		errors: errorsJa,
	},
	ko: {
		common: commonKo,
		home: homeKo,
		auth: authKo,
		booking: bookingKo,
		errors: errorsKo,
	},
	fr: {
		common: commonFr,
		home: homeFr,
		auth: authFr,
		booking: bookingFr,
		errors: errorsFr,
	},
	de: {
		common: commonDe,
		home: homeDe,
		auth: authDe,
		booking: bookingDe,
		errors: errorsDe,
	},
	es: {
		common: commonEs,
		home: homeEs,
		auth: authEs,
		booking: bookingEs,
		errors: errorsEs,
	},
	ru: {
		common: commonRu,
		home: homeRu,
		auth: authRu,
		booking: bookingRu,
		errors: errorsRu,
	},
	ar: {
		common: commonAr,
		home: homeAr,
		auth: authAr,
		booking: bookingAr,
		errors: errorsAr,
	},
};

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: 'vi', // Default language
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
