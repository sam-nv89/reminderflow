import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Globe, Sun, Moon, Monitor, Building, Clock } from 'lucide-react';
import { Card, CardHeader, Button, Toggle } from '../components/ui';
import { useAuthStore, toast } from '../stores';

export const Settings: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { business, theme, setTheme, reminderSettings } = useAuthStore();

    const [formData, setFormData] = useState({
        businessName: business?.name || '',
        timezone: business?.timezone || 'UTC',
        language: i18n.language,
    });

    const [reminderData, setReminderData] = useState({
        smsEnabled: reminderSettings?.sms_enabled ?? true,
        emailEnabled: reminderSettings?.email_enabled ?? true,
        whatsappEnabled: reminderSettings?.whatsapp_enabled ?? false,
        intervals: reminderSettings?.intervals || [
            { hours: 24, channel: 'sms' },
            { hours: 1, channel: 'sms' },
        ],
        messageTemplate: reminderSettings?.default_message_template ||
            'Hi {{client_name}}, this is a reminder about your {{service}} appointment on {{date}} at {{time}}. Reply 1 to confirm or 2 to cancel.',
    });

    const timezones = [
        'UTC',
        'America/New_York',
        'America/Los_Angeles',
        'America/Chicago',
        'Europe/London',
        'Europe/Paris',
        'Europe/Moscow',
        'Asia/Tokyo',
        'Asia/Singapore',
        'Australia/Sydney',
    ];

    const handleSave = () => {
        toast.success(t('settings.saved'));
    };

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        setFormData({ ...formData, language: lang });
    };

    const addInterval = () => {
        setReminderData({
            ...reminderData,
            intervals: [...reminderData.intervals, { hours: 2, channel: 'sms' }],
        });
    };

    const removeInterval = (index: number) => {
        setReminderData({
            ...reminderData,
            intervals: reminderData.intervals.filter((_, i) => i !== index),
        });
    };

    const updateInterval = (index: number, field: 'hours' | 'channel', value: string | number) => {
        const newIntervals = [...reminderData.intervals];
        newIntervals[index] = { ...newIntervals[index], [field]: value };
        setReminderData({ ...reminderData, intervals: newIntervals });
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-xl">
                <div>
                    <h2 className="text-2xl font-bold mb-sm">{t('settings.title')}</h2>
                    <p className="text-secondary">Manage your account and preferences</p>
                </div>
                <Button variant="primary" icon={Save} onClick={handleSave}>
                    {t('common.save')}
                </Button>
            </div>

            <div className="flex flex-col gap-lg">
                {/* General Settings */}
                <Card>
                    <CardHeader
                        title={t('settings.general')}
                        subtitle="Basic business information"
                    />

                    <div className="flex flex-col gap-lg">
                        <div className="input-group">
                            <label className="input-label flex items-center gap-sm">
                                <Building size={16} />
                                {t('settings.businessName')}
                            </label>
                            <input
                                type="text"
                                className="input"
                                value={formData.businessName}
                                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label flex items-center gap-sm">
                                <Clock size={16} />
                                {t('settings.timezone')}
                            </label>
                            <select
                                className="input"
                                value={formData.timezone}
                                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                            >
                                {timezones.map((tz) => (
                                    <option key={tz} value={tz}>{tz}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-label flex items-center gap-sm">
                                <Globe size={16} />
                                {t('settings.language')}
                            </label>
                            <div className="flex gap-sm">
                                <button
                                    className={`btn ${formData.language === 'en' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => handleLanguageChange('en')}
                                >
                                    English
                                </button>
                                <button
                                    className={`btn ${formData.language === 'ru' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => handleLanguageChange('ru')}
                                >
                                    Русский
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label flex items-center gap-sm">
                                {theme === 'light' ? <Sun size={16} /> : theme === 'dark' ? <Moon size={16} /> : <Monitor size={16} />}
                                {t('settings.theme')}
                            </label>
                            <div className="flex gap-sm">
                                <button
                                    className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => setTheme('light')}
                                >
                                    <Sun size={16} />
                                    {t('settings.themes.light')}
                                </button>
                                <button
                                    className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => setTheme('dark')}
                                >
                                    <Moon size={16} />
                                    {t('settings.themes.dark')}
                                </button>
                                <button
                                    className={`btn ${theme === 'system' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => setTheme('system')}
                                >
                                    <Monitor size={16} />
                                    {t('settings.themes.system')}
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Reminder Settings */}
                <Card>
                    <CardHeader
                        title={t('settings.reminderSettings.title')}
                        subtitle="Configure when and how to send reminders"
                    />

                    <div className="flex flex-col gap-lg">
                        {/* Notification Channels */}
                        <div>
                            <label className="input-label mb-md">{t('settings.reminderSettings.channels')}</label>
                            <div className="flex flex-col gap-md">
                                <Toggle
                                    checked={reminderData.smsEnabled}
                                    onChange={(checked) => setReminderData({ ...reminderData, smsEnabled: checked })}
                                    label={t('settings.reminderSettings.enableSms')}
                                />
                                <Toggle
                                    checked={reminderData.emailEnabled}
                                    onChange={(checked) => setReminderData({ ...reminderData, emailEnabled: checked })}
                                    label={t('settings.reminderSettings.enableEmail')}
                                />
                                <Toggle
                                    checked={reminderData.whatsappEnabled}
                                    onChange={(checked) => setReminderData({ ...reminderData, whatsappEnabled: checked })}
                                    label={t('settings.reminderSettings.enableWhatsapp')}
                                />
                            </div>
                        </div>

                        {/* Reminder Intervals */}
                        <div>
                            <label className="input-label mb-md">{t('settings.reminderSettings.intervals')}</label>
                            <div className="flex flex-col gap-sm">
                                {reminderData.intervals.map((interval, index) => (
                                    <div key={index} className="flex items-center gap-md p-md rounded-lg" style={{ background: 'var(--color-bg-secondary)' }}>
                                        <input
                                            type="number"
                                            className="input"
                                            style={{ width: 80 }}
                                            value={interval.hours}
                                            onChange={(e) => updateInterval(index, 'hours', parseInt(e.target.value) || 0)}
                                            min={1}
                                        />
                                        <span className="text-sm text-secondary">{t('settings.reminderSettings.hoursLabel')}</span>
                                        <select
                                            className="input"
                                            style={{ width: 120 }}
                                            value={interval.channel}
                                            onChange={(e) => updateInterval(index, 'channel', e.target.value)}
                                        >
                                            <option value="sms">SMS</option>
                                            <option value="email">Email</option>
                                            <option value="whatsapp">WhatsApp</option>
                                        </select>
                                        {reminderData.intervals.length > 1 && (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => removeInterval(index)}
                                            >
                                                {t('common.delete')}
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button variant="secondary" onClick={addInterval}>
                                    {t('settings.reminderSettings.addInterval')}
                                </Button>
                            </div>
                        </div>

                        {/* Message Template */}
                        <div className="input-group">
                            <label className="input-label">{t('settings.reminderSettings.defaultTemplate')}</label>
                            <textarea
                                className="input"
                                rows={4}
                                value={reminderData.messageTemplate}
                                onChange={(e) => setReminderData({ ...reminderData, messageTemplate: e.target.value })}
                            />
                            <span className="input-hint">{t('settings.reminderSettings.templateHint')}</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
