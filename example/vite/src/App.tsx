import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
	const { t, i18n } = useTranslation(['common', 'features']);
	const [count, setCount] = useState(0);

	const languages = [
		{ code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
		{ code: 'en', name: 'English', flag: '🇺🇸' },
		{ code: 'zh', name: '中文', flag: '🇨🇳' },
		{ code: 'ja', name: '日本語', flag: '🇯🇵' },
		{ code: 'ko', name: '한국어', flag: '🇰🇷' },
	];

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	return (
		<div className="app">
			<header className="app-header">
				<div className="logo">
					<span className="vite-logo">⚡</span>
					<h1>{t('common:app_title')}</h1>
				</div>
			</header>

			<main className="app-main">
				<section className="welcome-section">
					<h2>{t('common:welcome')}</h2>
					<p className="description">{t('common:description')}</p>
				</section>

				<section className="language-selector">
					<h3>{t('common:select_language')}</h3>
					<div className="language-buttons">
						{languages.map((lang) => (
							<button
								key={lang.code}
								onClick={() => changeLanguage(lang.code)}
								className={`lang-button ${i18n.language === lang.code ? 'active' : ''}`}
							>
								<span className="flag">{lang.flag}</span>
								<span className="name">{lang.name}</span>
							</button>
						))}
					</div>
				</section>

				<section className="features-section">
					<h3>{t('features:features.title')}</h3>
					<ul className="features-list">
						<li>{t('features:features.vite')}</li>
						<li>{t('features:features.typescript')}</li>
						<li>{t('features:features.cli')}</li>
						<li>{t('features:features.hmr')}</li>
					</ul>
				</section>

				<section className="demo-section">
					<h3>{t('features:demo.nested')}</h3>
					<p>{t('features:demo.example')}</p>
					<div className="counter">
						<button onClick={() => setCount((count) => count + 1)}>
							Count is {count}
						</button>
					</div>
				</section>

				<section className="info-section">
					<div className="info-card">
						<h4>📦 CLI Usage</h4>
						<code>pnpm i18n-gen</code>
					</div>
					<div className="info-card">
						<h4>🚀 Dev Server</h4>
						<code>pnpm dev</code>
					</div>
					<div className="info-card">
						<h4>🏗️ Build</h4>
						<code>pnpm build</code>
					</div>
				</section>
			</main>

			<footer className="app-footer">
				<p>
					Built with <span className="heart">❤️</span> using Vite + React +
					TypeScript + i18n-generator
				</p>
			</footer>
		</div>
	);
}

export default App;
