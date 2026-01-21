import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Zap, CreditCard, ExternalLink } from 'lucide-react';
import { Card, CardHeader, Button, Badge } from '../components/ui';
import { useAuthStore } from '../stores';
import { PLANS } from '../types';

export const Billing: React.FC = () => {
    const { t } = useTranslation();
    const { subscription } = useAuthStore();

    const currentPlan = subscription?.plan || 'free';
    const smsUsed = subscription?.sms_used || 0;
    const smsLimit = subscription?.sms_limit || 20;
    const usagePercent = Math.min((smsUsed / smsLimit) * 100, 100);

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-xl">
                <div>
                    <h2 className="text-2xl font-bold mb-sm">{t('billing.title')}</h2>
                    <p className="text-secondary">Manage your subscription and billing</p>
                </div>
                <Button variant="secondary" icon={CreditCard}>
                    {t('billing.manageBilling')}
                </Button>
            </div>

            {/* Current Plan & Usage */}
            <div className="grid grid-cols-2 gap-lg mb-xl">
                {/* Current Plan */}
                <Card>
                    <CardHeader
                        title={t('billing.currentPlan')}
                    />
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-sm">
                                {PLANS.find(p => p.id === currentPlan)?.name || 'Free'}
                            </h3>
                            <p className="text-secondary">
                                ${PLANS.find(p => p.id === currentPlan)?.price || 0}/month
                            </p>
                        </div>
                        <div
                            className="flex items-center justify-center"
                            style={{
                                width: 64,
                                height: 64,
                                background: 'var(--color-primary-gradient)',
                                borderRadius: 'var(--radius-xl)',
                                color: 'white'
                            }}
                        >
                            <Zap size={28} />
                        </div>
                    </div>
                </Card>

                {/* SMS Usage */}
                <Card>
                    <CardHeader
                        title={t('billing.smsUsage')}
                    />
                    <div>
                        <div className="flex justify-between items-end mb-sm">
                            <span className="text-3xl font-bold">{smsUsed}</span>
                            <span className="text-secondary">
                                {t('billing.of')} {smsLimit} ({smsLimit - smsUsed} {t('billing.remaining')})
                            </span>
                        </div>
                        <div
                            style={{
                                height: 12,
                                background: 'var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-full)',
                                overflow: 'hidden'
                            }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    width: `${usagePercent}%`,
                                    background: usagePercent > 80
                                        ? 'var(--color-warning)'
                                        : 'var(--color-primary-gradient)',
                                    borderRadius: 'var(--radius-full)',
                                    transition: 'width 0.3s ease'
                                }}
                            />
                        </div>
                        {usagePercent > 80 && (
                            <p className="text-sm text-warning mt-sm">
                                You're running low on SMS. Consider upgrading your plan.
                            </p>
                        )}
                    </div>
                </Card>
            </div>

            {/* Upgrade Section */}
            <div className="mb-lg">
                <h3 className="text-xl font-semibold mb-sm">{t('billing.upgradeTitle')}</h3>
                <p className="text-secondary mb-lg">{t('billing.upgradeSubtitle')}</p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-4 gap-lg">
                {PLANS.map((plan, index) => {
                    const isCurrentPlan = plan.id === currentPlan;
                    const isPopular = index === 2;

                    return (
                        <Card
                            key={plan.id}
                            className={isPopular ? 'border-2' : ''}
                            style={isPopular ? { borderColor: 'var(--color-primary)' } : {}}
                        >
                            <div className="flex flex-col h-full">
                                <div className="mb-lg">
                                    {isPopular && (
                                        <Badge variant="primary" className="mb-md">
                                            {t('billing.mostPopular')}
                                        </Badge>
                                    )}
                                    {isCurrentPlan && (
                                        <Badge variant="success" className="mb-md">
                                            {t('billing.currentPlanLabel')}
                                        </Badge>
                                    )}

                                    <h3 className="text-xl font-semibold mb-sm">{plan.name}</h3>

                                    <div className="flex items-baseline gap-xs">
                                        <span className="text-4xl font-bold">${plan.price}</span>
                                        <span className="text-secondary">/mo</span>
                                    </div>
                                </div>

                                <ul className="flex flex-col gap-sm mb-xl flex-1">
                                    <li className="flex items-center gap-sm text-sm">
                                        <Check size={16} className="text-success flex-shrink-0" />
                                        <span>{plan.smsLimit} SMS {t('billing.features.smsPerMonth')}</span>
                                    </li>
                                    {plan.features.slice(1).map((feature, i) => (
                                        <li key={i} className="flex items-center gap-sm text-sm">
                                            <Check size={16} className="text-success flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={isCurrentPlan ? 'secondary' : isPopular ? 'primary' : 'secondary'}
                                    fullWidth
                                    disabled={isCurrentPlan}
                                >
                                    {isCurrentPlan ? t('billing.currentPlanLabel') : t('billing.selectPlan')}
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* FAQ / Help */}
            <Card className="mt-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold mb-sm">Need help choosing a plan?</h4>
                        <p className="text-sm text-secondary">
                            Contact our support team for personalized recommendations based on your business needs.
                        </p>
                    </div>
                    <Button variant="secondary" icon={ExternalLink}>
                        Contact Support
                    </Button>
                </div>
            </Card>
        </div>
    );
};
