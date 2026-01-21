import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    LayoutDashboard,
    Calendar,
    Bell,
    FileText,
    Link2,
    Settings,
    CreditCard,
    HelpCircle,
    LogOut,
    Zap,
    LucideIcon,
} from 'lucide-react';
import { useAuthStore } from '../../stores';

interface NavItem {
    path: string;
    labelKey: string;
    icon: LucideIcon;
}

const mainNavItems: NavItem[] = [
    { path: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { path: '/appointments', labelKey: 'nav.appointments', icon: Calendar },
    { path: '/reminders', labelKey: 'nav.reminders', icon: Bell },
    { path: '/templates', labelKey: 'nav.templates', icon: FileText },
];

const settingsNavItems: NavItem[] = [
    { path: '/integrations', labelKey: 'nav.integrations', icon: Link2 },
    { path: '/settings', labelKey: 'nav.settings', icon: Settings },
    { path: '/billing', labelKey: 'nav.billing', icon: CreditCard },
];

export const Sidebar: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { signOut, subscription } = useAuthStore();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">
                        <Zap size={24} />
                    </div>
                    <span className="sidebar-logo-text">{t('common.appName')}</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {/* Main Navigation */}
                <div className="nav-section">
                    <span className="nav-section-title">Menu</span>
                    {mainNavItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                <IconComponent size={20} />
                                <span>{t(item.labelKey)}</span>
                            </NavLink>
                        );
                    })}
                </div>

                {/* Settings Navigation */}
                <div className="nav-section">
                    <span className="nav-section-title">{t('settings.title')}</span>
                    {settingsNavItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                <IconComponent size={20} />
                                <span>{t(item.labelKey)}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                {/* SMS Usage */}
                {subscription && (
                    <div className="card p-md mb-md" style={{ background: 'var(--color-bg-secondary)' }}>
                        <div className="flex justify-between items-center mb-sm">
                            <span className="text-sm font-medium">{t('billing.smsUsage')}</span>
                            <span className="text-xs text-secondary">
                                {subscription.sms_used}/{subscription.sms_limit}
                            </span>
                        </div>
                        <div
                            style={{
                                height: 6,
                                background: 'var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-full)',
                                overflow: 'hidden'
                            }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    width: `${Math.min((subscription.sms_used / subscription.sms_limit) * 100, 100)}%`,
                                    background: 'var(--color-primary-gradient)',
                                    borderRadius: 'var(--radius-full)',
                                    transition: 'width 0.3s ease'
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Help & Sign Out */}
                <NavLink to="/help" className="nav-item">
                    <HelpCircle size={20} />
                    <span>{t('nav.help')}</span>
                </NavLink>
                <button className="nav-item w-full" onClick={handleSignOut}>
                    <LogOut size={20} />
                    <span>{t('auth.logout')}</span>
                </button>
            </div>
        </aside>
    );
};
