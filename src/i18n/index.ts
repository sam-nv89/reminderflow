import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import ru from './ru.json';

// Get saved language from localStorage or default to browser language
const getSavedLanguage = (): string => {
    const saved = localStorage.getItem('language');
    if (saved && ['en', 'ru'].includes(saved)) {
        return saved;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (['en', 'ru'].includes(browserLang)) {
        return browserLang;
    }

    return 'en';
};

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ru: { translation: ru },
        },
        lng: getSavedLanguage(),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

// Save language preference when changed
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
    document.documentElement.lang = lng;
});

export default i18n;
