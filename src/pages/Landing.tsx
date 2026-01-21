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
            <section
                className="p-3xl"
                style={{ background: 'var(--color-bg-secondary)' }}
            >
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div className="text-center mb-2xl">
                        <h2 className="text-3xl font-bold mb-md">{t('landing.features.title')}</h2>
                        <p className="text-lg text-secondary">{t('landing.features.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-lg">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="card card-hover p-xl text-center"
                            >
                                <div
                                    className="flex items-center justify-center mx-auto mb-lg"
                                    style={{
                                        width: 64,
                                        height: 64,
                                        background: 'var(--color-primary-light)',
                                        borderRadius: 'var(--radius-xl)',
                                        color: 'var(--color-primary)'
                                    }}
                                >
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-lg font-semibold mb-sm">
                                    {t(`${feature.titleKey}.title`)}
                                </h3>
                                <p className="text-secondary">
                                    {t(`${feature.titleKey}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="p-3xl">
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div className="text-center mb-2xl">
                        <h2 className="text-3xl font-bold mb-md">{t('landing.pricing.title')}</h2>
                        <p className="text-lg text-secondary">{t('landing.pricing.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-lg">
                        {PLANS.map((plan, index) => (
                            <div
                                key={plan.id}
                                className={`card p-xl ${index === 2 ? 'border-2' : ''}`}
                                style={index === 2 ? { borderColor: 'var(--color-primary)' } : {}}
                            >
                                {index === 2 && (
                                    <div
                                        className="badge badge-primary mb-md"
                                        style={{ display: 'inline-flex' }}
                                    >
                                        {t('billing.mostPopular')}
                                    </div>
                                )}

                                <h3 className="text-xl font-semibold mb-sm">{plan.name}</h3>

                                <div className="flex items-baseline gap-xs mb-lg">
                                    <span className="text-4xl font-bold">${plan.price}</span>
                                    <span className="text-secondary">{t('landing.pricing.perMonth')}</span>
                                </div>

                                <ul className="flex flex-col gap-sm mb-xl">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-sm text-sm">
                                            <Check size={16} className="text-success" />
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
            <section
                className="p-3xl text-center"
                style={{
                    background: 'var(--color-primary-gradient)',
                    color: 'white'
                }}
            >
                <div style={{ maxWidth: 600, margin: '0 auto' }}>
                    <h2 className="text-3xl font-bold mb-md" style={{ color: 'white' }}>
                        {t('landing.cta.title')}
                    </h2>
                    <p className="text-lg mb-xl" style={{ opacity: 0.9 }}>
                        {t('landing.cta.subtitle')}
                    </p>
                    <Link to="/register">
                        <Button
                            variant="secondary"
                            size="lg"
                            style={{
                                background: 'white',
                                color: 'var(--color-primary)'
                            }}
                        >
                            {t('landing.cta.button')}
                            <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="p-xl"
                style={{
                    background: 'var(--color-bg-secondary)',
                    borderTop: '1px solid var(--color-border)'
                }}
            >
                <div
                    className="flex justify-between items-center"
                    style={{ maxWidth: 1200, margin: '0 auto' }}
                >
                    <div className="flex items-center gap-sm">
                        <div className="sidebar-logo-icon" style={{ width: 32, height: 32 }}>
                            <Zap size={18} />
                        </div>
                        <span className="font-semibold">{t('common.appName')}</span>
                    </div>

                    <p className="text-sm text-secondary">
                        {t('landing.footer.copyright')}
                    </p>

                    <div className="flex gap-lg text-sm">
                        <a href="#" className="text-secondary">{t('landing.footer.privacy')}</a>
                        <a href="#" className="text-secondary">{t('landing.footer.terms')}</a>
                        <a href="#" className="text-secondary">{t('landing.footer.contact')}</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
