import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Calendar,
    Bell,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle,
    XCircle,
    MessageSquare,
    LucideIcon
} from 'lucide-react';
import { Card, CardHeader, Badge, EmptyState, Button } from '../components/ui';
import { useAuthStore } from '../stores';

// Mock data for demonstration
const mockStats = {
    totalAppointments: 156,
    appointmentsChange: 12,
    remindersSent: 312,
    remindersChange: 8,
    confirmationRate: 78,
    confirmationChange: 5,
    noShowRate: 8,
    noShowChange: -3,
};

const mockUpcomingAppointments = [
    {
        id: '1',
        clientName: 'Sarah Johnson',
        service: 'Hair Cut & Style',
        time: '10:00 AM',
        date: 'Today',
        status: 'confirmed',
    },
    {
        id: '2',
        clientName: 'Michael Brown',
        service: 'Beard Trim',
        time: '11:30 AM',
        date: 'Today',
        status: 'scheduled',
    },
    {
        id: '3',
        clientName: 'Emily Davis',
        service: 'Color Treatment',
        time: '2:00 PM',
        date: 'Today',
        status: 'confirmed',
    },
    {
        id: '4',
        clientName: 'James Wilson',
        service: 'Full Service',
        time: '9:00 AM',
        date: 'Tomorrow',
        status: 'scheduled',
    },
];

const mockRecentActivity = [
    {
        id: '1',
        type: 'reminder_sent',
        message: 'Reminder sent to Sarah Johnson',
        channel: 'sms',
        time: '5 min ago',
    },
    {
        id: '2',
        type: 'confirmed',
        message: 'Sarah Johnson confirmed appointment',
        time: '3 min ago',
    },
    {
        id: '3',
        type: 'reminder_sent',
        message: 'Reminder sent to Michael Brown',
        channel: 'email',
        time: '15 min ago',
    },
    {
        id: '4',
        type: 'cancelled',
        message: 'John Doe cancelled appointment',
        time: '1 hour ago',
    },
];

export const Dashboard: React.FC = () => {
    const { t } = useTranslation();
    const { business } = useAuthStore();

    const StatCard = ({
        title,
        value,
        change,
        icon: Icon,
        suffix = ''
    }: {
        title: string;
        value: number;
        change: number;
        icon: LucideIcon;
        suffix?: string;
    }) => (
        <Card>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-secondary mb-sm">{title}</p>
                    <p className="text-3xl font-bold">{value}{suffix}</p>
                    <div className={`stats-change ${change >= 0 ? 'stats-change-positive' : 'stats-change-negative'}`}>
                        {change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        <span>{Math.abs(change)}% {t('dashboard.stats.vsLastMonth')}</span>
                    </div>
                </div>
                <div
                    className="flex items-center justify-center"
                    style={{
                        width: 48,
                        height: 48,
                        background: 'var(--color-primary-light)',
                        borderRadius: 'var(--radius-lg)',
                        color: 'var(--color-primary)'
                    }}
                >
                    <Icon size={24} />
                </div>
            </div>
        </Card>
    );

    return (
        <div className="animate-fade-in">
            {/* Welcome */}
            <div className="mb-xl">
                <h2 className="text-2xl font-bold mb-sm">
                    {t('dashboard.welcome', { name: business?.name || 'User' })}
                </h2>
                <p className="text-secondary">{t('dashboard.todayOverview')}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-lg mb-xl">
                <StatCard
                    title={t('dashboard.stats.totalAppointments')}
                    value={mockStats.totalAppointments}
                    change={mockStats.appointmentsChange}
                    icon={Calendar}
                />
                <StatCard
                    title={t('dashboard.stats.remindersSent')}
                    value={mockStats.remindersSent}
                    change={mockStats.remindersChange}
                    icon={Bell}
                />
                <StatCard
                    title={t('dashboard.stats.confirmationRate')}
                    value={mockStats.confirmationRate}
                    change={mockStats.confirmationChange}
                    icon={CheckCircle}
                    suffix="%"
                />
                <StatCard
                    title={t('dashboard.stats.noShowRate')}
                    value={mockStats.noShowRate}
                    change={mockStats.noShowChange}
                    icon={XCircle}
                    suffix="%"
                />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-lg">
                {/* Upcoming Appointments */}
                <Card padding="none">
                    <CardHeader
                        title={t('dashboard.upcomingAppointments')}
                        action={
                            <Button variant="ghost" size="sm">
                                {t('appointments.all')}
                            </Button>
                        }
                    />
                    <div style={{ padding: '0 var(--spacing-lg) var(--spacing-lg)' }}>
                        {mockUpcomingAppointments.length > 0 ? (
                            <div className="flex flex-col gap-sm">
                                {mockUpcomingAppointments.map((apt) => (
                                    <div
                                        key={apt.id}
                                        className="flex items-center justify-between p-md rounded-lg"
                                        style={{ background: 'var(--color-bg-secondary)' }}
                                    >
                                        <div className="flex items-center gap-md">
                                            <div className="avatar avatar-md">
                                                {apt.clientName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium">{apt.clientName}</p>
                                                <p className="text-sm text-secondary">{apt.service}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-md">
                                            <div className="text-right">
                                                <p className="text-sm font-medium">{apt.time}</p>
                                                <p className="text-xs text-tertiary">{apt.date}</p>
                                            </div>
                                            <Badge variant={apt.status === 'confirmed' ? 'success' : 'primary'}>
                                                {t(`appointments.status.${apt.status}`)}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={Calendar}
                                title={t('dashboard.noAppointments')}
                            />
                        )}
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card padding="none">
                    <CardHeader
                        title={t('dashboard.recentActivity')}
                    />
                    <div style={{ padding: '0 var(--spacing-lg) var(--spacing-lg)' }}>
                        {mockRecentActivity.length > 0 ? (
                            <div className="flex flex-col gap-sm">
                                {mockRecentActivity.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-center gap-md p-sm"
                                    >
                                        <div
                                            className="flex items-center justify-center flex-shrink-0"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: 'var(--radius-full)',
                                                background: activity.type === 'confirmed'
                                                    ? 'var(--color-success-light)'
                                                    : activity.type === 'cancelled'
                                                        ? 'var(--color-error-light)'
                                                        : 'var(--color-primary-light)',
                                                color: activity.type === 'confirmed'
                                                    ? 'var(--color-success)'
                                                    : activity.type === 'cancelled'
                                                        ? 'var(--color-error)'
                                                        : 'var(--color-primary)'
                                            }}
                                        >
                                            {activity.type === 'reminder_sent' ? (
                                                <MessageSquare size={16} />
                                            ) : activity.type === 'confirmed' ? (
                                                <CheckCircle size={16} />
                                            ) : (
                                                <XCircle size={16} />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm">{activity.message}</p>
                                            {activity.channel && (
                                                <Badge variant="info" className="mt-xs">
                                                    {activity.channel.toUpperCase()}
                                                </Badge>
                                            )}
                                        </div>
                                        <span className="text-xs text-tertiary flex items-center gap-xs">
                                            <Clock size={12} />
                                            {activity.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={Bell}
                                title={t('dashboard.noActivity')}
                            />
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};
