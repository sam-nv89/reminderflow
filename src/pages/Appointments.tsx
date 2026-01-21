import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Plus,
    Search,
    Filter,
    Calendar as CalendarIcon,
    Phone,
    Mail,
    Clock,
    MoreVertical,
    MessageSquare
} from 'lucide-react';
import { Card, Button, Badge, EmptyState, Modal, Input } from '../components/ui';

// Mock data
const mockAppointments = [
    {
        id: '1',
        clientName: 'Sarah Johnson',
        clientPhone: '+1 234 567 8901',
        clientEmail: 'sarah@example.com',
        service: 'Hair Cut & Style',
        startTime: '2024-01-22T10:00:00',
        endTime: '2024-01-22T11:00:00',
        status: 'confirmed',
    },
    {
        id: '2',
        clientName: 'Michael Brown',
        clientPhone: '+1 234 567 8902',
        clientEmail: 'michael@example.com',
        service: 'Beard Trim',
        startTime: '2024-01-22T11:30:00',
        endTime: '2024-01-22T12:00:00',
        status: 'scheduled',
    },
    {
        id: '3',
        clientName: 'Emily Davis',
        clientPhone: '+1 234 567 8903',
        clientEmail: 'emily@example.com',
        service: 'Color Treatment',
        startTime: '2024-01-22T14:00:00',
        endTime: '2024-01-22T16:00:00',
        status: 'confirmed',
    },
    {
        id: '4',
        clientName: 'James Wilson',
        clientPhone: '+1 234 567 8904',
        clientEmail: 'james@example.com',
        service: 'Full Service',
        startTime: '2024-01-23T09:00:00',
        endTime: '2024-01-23T10:30:00',
        status: 'scheduled',
    },
    {
        id: '5',
        clientName: 'Lisa Anderson',
        clientPhone: '+1 234 567 8905',
        clientEmail: 'lisa@example.com',
        service: 'Manicure',
        startTime: '2024-01-21T15:00:00',
        endTime: '2024-01-21T16:00:00',
        status: 'completed',
    },
    {
        id: '6',
        clientName: 'Robert Taylor',
        clientPhone: '+1 234 567 8906',
        clientEmail: 'robert@example.com',
        service: 'Consultation',
        startTime: '2024-01-20T11:00:00',
        endTime: '2024-01-20T11:30:00',
        status: 'no_show',
    },
];

type TabType = 'upcoming' | 'past' | 'all';

export const Appointments: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<TabType>('upcoming');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'confirmed': return 'success';
            case 'scheduled': return 'primary';
            case 'cancelled': return 'error';
            case 'completed': return 'info';
            case 'no_show': return 'warning';
            default: return 'primary';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const filteredAppointments = mockAppointments.filter(apt => {
        const matchesSearch = apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.service.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        const now = new Date();
        const aptDate = new Date(apt.startTime);

        if (activeTab === 'upcoming') {
            return aptDate >= now && apt.status !== 'cancelled';
        } else if (activeTab === 'past') {
            return aptDate < now || apt.status === 'completed' || apt.status === 'no_show';
        }
        return true;
    });

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-xl">
                <div>
                    <h2 className="text-2xl font-bold mb-sm">{t('appointments.title')}</h2>
                    <p className="text-secondary">
                        {filteredAppointments.length} appointments
                    </p>
                </div>
                <Button
                    variant="primary"
                    icon={Plus}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    {t('appointments.addNew')}
                </Button>
            </div>

            {/* Tabs & Search */}
            <div className="flex justify-between items-center mb-lg">
                <div className="flex gap-sm">
                    {(['upcoming', 'past', 'all'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {t(`appointments.${tab}`)}
                        </button>
                    ))}
                </div>

                <div className="flex gap-md">
                    <div
                        className="flex items-center gap-sm"
                        style={{
                            background: 'var(--color-surface)',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border)',
                            minWidth: 250
                        }}
                    >
                        <Search size={18} style={{ color: 'var(--color-text-tertiary)' }} />
                        <input
                            type="text"
                            placeholder={t('common.search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                    <Button variant="secondary" icon={Filter}>
                        {t('common.filter')}
                    </Button>
                </div>
            </div>

            {/* Appointments List */}
            {filteredAppointments.length > 0 ? (
                <div className="flex flex-col gap-md">
                    {filteredAppointments.map((apt) => (
                        <Card key={apt.id} hoverable padding="md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-lg">
                                    <div className="avatar avatar-lg">
                                        {apt.clientName.charAt(0)}
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-xs">{apt.clientName}</h4>
                                        <p className="text-sm text-secondary">{apt.service}</p>
                                        <div className="flex items-center gap-lg mt-sm text-sm text-tertiary">
                                            <span className="flex items-center gap-xs">
                                                <Phone size={14} />
                                                {apt.clientPhone}
                                            </span>
                                            <span className="flex items-center gap-xs">
                                                <Mail size={14} />
                                                {apt.clientEmail}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-lg">
                                    <div className="text-right">
                                        <div className="flex items-center gap-xs text-sm font-medium">
                                            <CalendarIcon size={14} />
                                            {formatDate(apt.startTime)}
                                        </div>
                                        <div className="flex items-center gap-xs text-sm text-secondary mt-xs">
                                            <Clock size={14} />
                                            {formatTime(apt.startTime)} - {formatTime(apt.endTime)}
                                        </div>
                                    </div>

                                    <Badge variant={getStatusVariant(apt.status)}>
                                        {t(`appointments.status.${apt.status === 'no_show' ? 'noShow' : apt.status}`)}
                                    </Badge>

                                    <div className="flex gap-xs">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={MessageSquare}
                                            title={t('appointments.actions.sendReminder')}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={MoreVertical}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <EmptyState
                        icon={CalendarIcon}
                        title={t('appointments.empty.title')}
                        description={t('appointments.empty.description')}
                        action={
                            <Button variant="primary" icon={Plus}>
                                {t('appointments.addNew')}
                            </Button>
                        }
                    />
                </Card>
            )}

            {/* Add Appointment Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title={t('appointments.addNew')}
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
                            {t('common.cancel')}
                        </Button>
                        <Button variant="primary">
                            {t('common.save')}
                        </Button>
                    </>
                }
            >
                <div className="flex flex-col gap-md">
                    <Input
                        label={t('appointments.clientName')}
                        placeholder="John Doe"
                    />
                    <Input
                        label={t('appointments.clientPhone')}
                        placeholder="+1 234 567 8900"
                    />
                    <Input
                        label={t('appointments.clientEmail')}
                        type="email"
                        placeholder="john@example.com"
                    />
                    <Input
                        label={t('appointments.service')}
                        placeholder="Service name"
                    />
                    <div className="grid grid-cols-2 gap-md">
                        <Input
                            label={t('appointments.dateTime')}
                            type="datetime-local"
                        />
                        <Input
                            label={t('appointments.duration')}
                            type="number"
                            placeholder="60"
                            hint="minutes"
                        />
                    </div>
                    <Input
                        label={t('appointments.notes')}
                        placeholder="Optional notes..."
                    />
                </div>
            </Modal>
        </div>
    );
};
