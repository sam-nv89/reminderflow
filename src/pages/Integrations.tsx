import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link2, RefreshCw, Check, X, Calendar } from 'lucide-react';
import { Card, CardHeader, Button, Badge } from '../components/ui';

interface Integration {
    id: string;
    provider: 'google' | 'calendly' | 'outlook';
    connected: boolean;
    lastSync?: string;
    calendarName?: string;
}

const mockIntegrations: Integration[] = [
    {
        id: '1',
        provider: 'google',
        connected: true,
        lastSync: '2024-01-21T15:30:00',
        calendarName: 'Primary Calendar',
    },
    {
        id: '2',
        provider: 'calendly',
        connected: false,
    },
    {
        id: '3',
        provider: 'outlook',
        connected: false,
    },
];

export const Integrations: React.FC = () => {
    const { t } = useTranslation();

    const getProviderLogo = (provider: string) => {
        switch (provider) {
            case 'google':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                );
            case 'calendly':
                return (
                    <div
                        style={{
                            width: 24,
                            height: 24,
                            background: '#006BFF',
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 14
                        }}
                    >
                        C
                    </div>
                );
            case 'outlook':
                return (
                    <div
                        style={{
                            width: 24,
                            height: 24,
                            background: '#0078D4',
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 14
                        }}
                    >
                        O
                    </div>
                );
            default:
                return <Calendar size={24} />;
        }
    };

    const formatLastSync = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-xl">
                <div>
                    <h2 className="text-2xl font-bold mb-sm">{t('integrations.title')}</h2>
                    <p className="text-secondary">Connect your calendars to sync appointments</p>
                </div>
            </div>

            <Card>
                <CardHeader
                    title={t('integrations.calendars')}
                    subtitle="Manage your calendar connections"
                />

                <div className="flex flex-col gap-md">
                    {mockIntegrations.map((integration) => (
                        <div
                            key={integration.id}
                            className="flex items-center justify-between p-lg rounded-lg"
                            style={{
                                background: 'var(--color-bg-secondary)',
                                border: integration.connected ? '1px solid var(--color-success)' : '1px solid var(--color-border)'
                            }}
                        >
                            <div className="flex items-center gap-lg">
                                {getProviderLogo(integration.provider)}

                                <div>
                                    <h4 className="font-semibold">
                                        {t(`integrations.${integration.provider}.title`)}
                                    </h4>
                                    <p className="text-sm text-secondary">
                                        {t(`integrations.${integration.provider}.description`)}
                                    </p>
                                    {integration.connected && integration.calendarName && (
                                        <p className="text-xs text-tertiary mt-xs">
                                            Connected to: {integration.calendarName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-md">
                                {integration.connected ? (
                                    <>
                                        <Badge variant="success">
                                            <Check size={12} />
                                            {t('integrations.connected')}
                                        </Badge>

                                        {integration.lastSync && (
                                            <span className="text-xs text-tertiary">
                                                {t('integrations.lastSync')}: {formatLastSync(integration.lastSync)}
                                            </span>
                                        )}

                                        <Button variant="secondary" size="sm" icon={RefreshCw}>
                                            {t('integrations.syncNow')}
                                        </Button>

                                        <Button variant="ghost" size="sm">
                                            {t('integrations.disconnect')}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Badge variant="warning">
                                            <X size={12} />
                                            {t('integrations.notConnected')}
                                        </Badge>

                                        <Button variant="primary" size="sm" icon={Link2}>
                                            {t('integrations.connect')}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Info Card */}
            <Card className="mt-lg">
                <div className="flex items-start gap-lg">
                    <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                            width: 48,
                            height: 48,
                            background: 'var(--color-info-light)',
                            borderRadius: 'var(--radius-lg)',
                            color: 'var(--color-info)'
                        }}
                    >
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold mb-sm">How Calendar Sync Works</h4>
                        <p className="text-sm text-secondary mb-md">
                            When you connect a calendar, we automatically import your appointments and set up reminders based on your preferences.
                            New appointments are synced every 15 minutes, or you can manually sync at any time.
                        </p>
                        <ul className="text-sm text-secondary flex flex-col gap-xs">
                            <li className="flex items-center gap-sm">
                                <Check size={14} className="text-success" />
                                Automatic appointment import
                            </li>
                            <li className="flex items-center gap-sm">
                                <Check size={14} className="text-success" />
                                Real-time sync updates
                            </li>
                            <li className="flex items-center gap-sm">
                                <Check size={14} className="text-success" />
                                Two-way status synchronization
                            </li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};
