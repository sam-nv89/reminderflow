import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ToastContainer } from '../ui';

// Map routes to title keys
const routeTitles: Record<string, string> = {
    '/dashboard': 'nav.dashboard',
    '/appointments': 'nav.appointments',
    '/reminders': 'nav.reminders',
    '/templates': 'nav.templates',
    '/integrations': 'nav.integrations',
    '/settings': 'nav.settings',
    '/billing': 'nav.billing',
    '/help': 'nav.help',
};

export const Layout: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const titleKey = routeTitles[location.pathname] || 'nav.dashboard';

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Header
                    title={t(titleKey)}
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="page-content">
                    <Outlet />
                </div>
            </main>

            <ToastContainer />
        </div>
    );
};
