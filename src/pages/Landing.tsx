import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Zap,
    MessageSquare,
    Calendar,
    Palette,
    BarChart3,
    CheckCircle,
    DollarSign,
    ArrowRight,
    Star,
    Check,
} from 'lucide-react';
import { Button } from '../components/ui';
import { PLANS } from '../types';

export const Landing: React.FC = () => {
    const { t, i18n } = useTranslation();

    const features = [
        { icon: MessageSquare, titleKey: 'landing.features.multiChannel', descKey: 'landing.features.multiChannel.description' },
        { icon: Calendar, titleKey: 'landing.features.calendarSync', descKey: 'landing.features.calendarSync.description' },
        { icon: Palette, titleKey: 'landing.features.customizable', descKey: 'landing.features.customizable.description' },
        { icon: BarChart3, titleKey: 'landing.features.analytics', descKey: 'landing.features.analytics.description' },
        { icon: CheckCircle, titleKey: 'landing.features.confirmation', descKey: 'landing.features.confirmation.description' },
        { icon: DollarSign, titleKey: 'landing.features.affordable', descKey: 'landing.features.affordable.description' },
    ];

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ru' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Navbar */}
            <nav
                className="flex items-center justify-between p-lg"
                style={{ maxWidth: 1200, margin: '0 auto' }}
            >
                <div className="flex items-center gap-sm">
                    <div className="sidebar-logo-icon">
                        <Zap size={24} />
                    </div>
                    <span className="sidebar-logo-text">{t('common.appName')}</span>
                </div>

                <div className="flex items-center gap-md">
                    <button
                        onClick={toggleLanguage}
                        className="btn btn-ghost text-sm"
                    >
                        {i18n.language === 'en' ? 'RU' : 'EN'}
                    </button>
                    <Link to="/login">
                        <Button variant="ghost">{t('auth.login')}</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="primary">{t('landing.hero.cta')}</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="landing-hero-content">
                    <div
                        className="badge badge-primary mb-lg"
                        style={{ display: 'inline-flex' }}
                    >
                        <Star size={14} />
                        <span>Trusted by 1,000+ businesses</span>
                    </div>

                    <h1 className="landing-hero-title">
                        {t('landing.hero.title')}
                    </h1>

                    <p className="landing-hero-subtitle">
                        {t('landing.hero.subtitle')}
                    </p>

                    <div className="flex items-center justify-center gap-md">
                        <Link to="/register">
                            <Button variant="primary" size="lg">
                                {t('landing.hero.cta')}
                                <ArrowRight size={18} />
                            </Button>
                        </Link>
                        <Button variant="secondary" size="lg">
                            {t('landing.hero.secondaryCta')}
                        </Button>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center justify-center gap-lg mt-2xl">
                        <div className="flex items-center gap-xs">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                            ))}
                            <span className="text-sm text-secondary ml-sm">4.9/5 from 500+ reviews</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="landing-section landing-section-alt">
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div className="text-center mb-2xl">
                        <h2 className="text-3xl font-bold mb-md">{t('landing.features.title')}</h2>
                        <p className="text-lg text-secondary">{t('landing.features.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-lg">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-card-icon">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="feature-card-title">
                                    {t(`${feature.titleKey}.title`)}
                                </h3>
                                <p className="feature-card-description">
                                    {t(`${feature.titleKey}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="landing-section">
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div className="text-center mb-2xl">
                        <h2 className="text-3xl font-bold mb-md">{t('landing.pricing.title')}</h2>
                        <p className="text-lg text-secondary">{t('landing.pricing.subtitle')}</p>
                    </div>

                    <div className="pricing-grid">
                        {PLANS.map((plan, index) => (
                            <div
                                key={plan.id}
                                className={`pricing-card ${index === 2 ? 'pricing-card-featured' : ''}`}
                            >
                                {index === 2 && (
                                    <span className="pricing-card-badge">
                                        {t('billing.mostPopular')}
                                    </span>
                                )}

                                <h3 className="pricing-card-name">{plan.name}</h3>

                                <div className="pricing-card-price">
                                    <span className="pricing-card-price-value">${plan.price}</span>
                                    <span className="pricing-card-price-period">{t('landing.pricing.perMonth')}</span>
                                </div>

                                <ul className="pricing-card-features">
                                    {plan.features.map((feature, i) => (
                                        <li key={i}>
                                            <Check size={16} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/register">
                                    <Button
                                        variant={index === 2 ? 'primary' : 'secondary'}
                                        fullWidth
                                    >
                                        {t('billing.selectPlan')}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="landing-cta">
                <div className="landing-cta-content">
                    <h2 className="landing-cta-title">
                        {t('landing.cta.title')}
                    </h2>
                    <p className="landing-cta-subtitle">
                        {t('landing.cta.subtitle')}
                    </p>
                    <Link to="/register">
                        <button className="landing-cta-btn">
                            {t('landing.cta.button')}
                            <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-footer-content">
                    <div className="flex items-center gap-sm">
                        <div className="sidebar-logo-icon" style={{ width: 32, height: 32 }}>
                            <Zap size={18} />
                        </div>
                        <span className="font-semibold">{t('common.appName')}</span>
                    </div>

                    <p className="text-sm text-secondary">
                        {t('landing.footer.copyright')}
                    </p>

                    <div className="landing-footer-links">
                        <a href="#">{t('landing.footer.privacy')}</a>
                        <a href="#">{t('landing.footer.terms')}</a>
                        <a href="#">{t('landing.footer.contact')}</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
