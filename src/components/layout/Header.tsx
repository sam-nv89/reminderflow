import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bell, Sun, Moon, Globe, Menu } from 'lucide-react';
import { Button } from '../ui';
import { useAuthStore } from '../../stores';

interface HeaderProps {
    title: string;
    onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
    const { t, i18n } = useTranslation();
    const { theme, setTheme, business } = useAuthStore();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ru' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="header">
            <div className="header-left">
                {/* Mobile menu button */}
                <button className="btn btn-ghost btn-icon hidden-desktop" onClick={onMenuClick}>
                    <Menu size={20} />
                </button>

                <h1 className="header-title">{title}</h1>
            </div>

            <div className="header-right">
                {/* Search */}
                <div className="flex items-center gap-sm" style={{
                    background: 'var(--color-bg-secondary)',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    borderRadius: 'var(--radius-lg)',
                    minWidth: 200
                }}>
                    <Search size={18} style={{ color: 'var(--color-text-tertiary)' }} />
                    <input
                        type="text"
                        placeholder={t('common.search')}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-sm)',
                            width: '100%'
                        }}
                    />
                </div>

                {/* Language Toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    title={i18n.language === 'en' ? 'Русский' : 'English'}
                >
                    <Globe size={18} />
                    <span className="text-sm">{i18n.language.toUpperCase()}</span>
                </Button>

                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    icon={theme === 'light' ? Moon : Sun}
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                />

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="sm"
                    icon={Bell}
                    aria-label="Notifications"
                />

                {/* User Avatar */}
                <div className="avatar avatar-md" title={business?.name || 'User'}>
                    {business?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
            </div>
        </header>
    );
};
