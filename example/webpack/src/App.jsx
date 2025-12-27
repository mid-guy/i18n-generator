import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
	const { t, i18n } = useTranslation(['common', 'home', 'auth', 'booking', 'errors']);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	const languages = [
		{ code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
		{ code: 'en', name: 'English', flag: '🇺🇸' },
		{ code: 'zh', name: '中文', flag: '🇨🇳' },
		{ code: 'ja', name: '日本語', flag: '🇯🇵' },
		{ code: 'ko', name: '한국어', flag: '🇰🇷' },
		{ code: 'fr', name: 'Français', flag: '🇫🇷' },
		{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
		{ code: 'es', name: 'Español', flag: '🇪🇸' },
		{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
		{ code: 'ar', name: 'العربية', flag: '🇸🇦' },
	];

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
			<h1>{t('home:title')}</h1>
			<p>{t('home:description')}</p>

			<div style={{ marginTop: '20px' }}>
				<h2>{t('common:welcome')}</h2>
				<p>{t('common:hello')}</p>
			</div>

			<div style={{ marginTop: '30px' }}>
				<h3 style={{ marginBottom: '15px' }}>Language Selector:</h3>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
					{languages.map((lang) => (
						<button
							key={lang.code}
							onClick={() => changeLanguage(lang.code)}
							style={{
								padding: '10px 15px',
								backgroundColor: i18n.language === lang.code ? '#007bff' : '#f0f0f0',
								color: i18n.language === lang.code ? 'white' : '#333',
								border: 'none',
								borderRadius: '5px',
								cursor: 'pointer',
								fontSize: '14px',
								fontWeight: i18n.language === lang.code ? 'bold' : 'normal',
								transition: 'all 0.3s',
							}}
						>
							{lang.flag} {lang.name}
						</button>
					))}
				</div>
			</div>

			<div style={{ marginTop: '30px' }}>
				<button style={{ padding: '15px 30px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
					{t('home:button')}
				</button>
			</div>

			<div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
				<p>{t('common:thank_you')}</p>
				<p>{t('common:goodbye')}</p>
			</div>

			{/* Nested Object Example */}
			<div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
				<h3 style={{ marginBottom: '15px', color: '#495057' }}>Nested Object Example (auth namespace)</h3>
				<div style={{ marginBottom: '10px' }}>
					<strong>{t('auth:login.title')}</strong>
				</div>
				<div style={{ marginBottom: '5px', fontSize: '14px' }}>
					<label>{t('auth:login.email.label')}: </label>
					<input type="email" placeholder={t('auth:login.email.placeholder')} style={{ padding: '5px', marginLeft: '10px' }} />
				</div>
				<div style={{ marginBottom: '10px', fontSize: '14px' }}>
					<label>{t('auth:login.password.label')}: </label>
					<input type="password" placeholder={t('auth:login.password.placeholder')} style={{ padding: '5px', marginLeft: '10px' }} />
				</div>
				<div>
					<button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' }}>
						{t('auth:login.button.submit')}
					</button>
					<button style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
						{t('auth:login.button.forgot_password')}
					</button>
				</div>
			</div>

			{/* Dot Notation Example */}
			<div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
				<h3 style={{ marginBottom: '15px', color: '#856404' }}>Dot Notation Example (booking namespace)</h3>
				<div style={{ marginBottom: '10px' }}>
					<strong>{t('booking:booking.title')}</strong>
				</div>
				<div style={{ fontSize: '14px', marginBottom: '8px' }}>
					<strong>{t('booking:booking.summary.text')}:</strong>
				</div>
				<ul style={{ fontSize: '14px', lineHeight: '1.8' }}>
					<li>{t('booking:booking.dates.checkin')}: 2025-01-01</li>
					<li>{t('booking:booking.dates.checkout')}: 2025-01-05</li>
					<li>{t('booking:booking.guests.adults')}: 2</li>
					<li>{t('booking:booking.guests.children')}: 1</li>
					<li>{t('booking:booking.payment.method')}: {t('booking:booking.payment.card')}</li>
					<li><strong>{t('booking:booking.summary.total')}: $500</strong></li>
				</ul>
				<div style={{ padding: '10px', backgroundColor: '#d4edda', borderRadius: '5px', marginTop: '10px' }}>
					<div style={{ color: '#155724', fontWeight: 'bold' }}>{t('booking:booking.confirmation.success')}</div>
					<div style={{ fontSize: '12px', color: '#155724', marginTop: '5px' }}>{t('booking:booking.confirmation.message')}</div>
				</div>
			</div>

			{/* Error Messages Example */}
			<div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8d7da', borderRadius: '8px' }}>
				<h3 style={{ marginBottom: '15px', color: '#721c24' }}>Error Messages (errors namespace - Dot Notation)</h3>
				<ul style={{ fontSize: '14px', lineHeight: '1.8', color: '#721c24' }}>
					<li>{t('errors:errors.validation.required')}</li>
					<li>{t('errors:errors.validation.email')}</li>
					<li>{t('errors:errors.validation.password.min')}</li>
					<li>{t('errors:errors.network.timeout')}</li>
					<li>{t('errors:errors.server.notfound')}</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
