import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Zap, Mail, Lock, Eye, EyeOff, Building } from 'lucide-react';
import { Button } from '../components/ui';
import { signUpWithEmail, signInWithGoogle } from '../services/supabase';
import { toast } from '../stores';
import { db } from '../services/supabase';

export const Register: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }

        if (!email) {
            newErrors.email = t('auth.errors.invalidEmail');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = t('auth.errors.invalidEmail');
        }

        if (!password) {
            newErrors.password = t('auth.errors.passwordTooShort');
        } else if (password.length < 8) {
            newErrors.password = t('auth.errors.passwordTooShort');
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = t('auth.errors.passwordMismatch');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);

        try {
            const { data, error } = await signUpWithEmail(email, password);

            if (error) {
                if (error.message.includes('already registered')) {
                    toast.error(t('auth.errors.emailInUse'));
                } else {
                    toast.error(t('errors.generic'));
                }
                return;
            }

            if (data.user) {
                // Create business record
                await db.businesses.create({
                    user_id: data.user.id,
                    name: businessName,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    language: 'en',
                });

                toast.success('Account created! Please check your email to verify.');
                navigate('/login');
            }
        } catch (err) {
            toast.error(t('errors.generic'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await signInWithGoogle();
            if (error) {
                toast.error(t('errors.generic'));
            }
        } catch (err) {
            toast.error(t('errors.generic'));
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card animate-slide-up">
                {/* Logo */}
                <div className="auth-header">
                    <div className="flex items-center justify-center gap-sm mb-lg">
                        <div className="sidebar-logo-icon">
                            <Zap size={24} />
                        </div>
                        <span className="sidebar-logo-text">{t('common.appName')}</span>
                    </div>
                    <h1 className="auth-title">{t('auth.registerTitle')}</h1>
                    <p className="auth-subtitle">{t('auth.registerSubtitle')}</p>
                </div>

                {/* Google Sign In */}
                <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleGoogleSignIn}
                    style={{ marginBottom: 'var(--spacing-lg)' }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>{t('auth.continueWithGoogle')}</span>
                </Button>

                <div className="auth-divider">{t('common.or')}</div>

                {/* Email Form */}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">{t('auth.businessName')}</label>
                        <div style={{ position: 'relative' }}>
                            <Building
                                size={18}
                                style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-tertiary)'
                                }}
                            />
                            <input
                                type="text"
                                className={`input ${errors.businessName ? 'input-error' : ''}`}
                                style={{ paddingLeft: 40 }}
                                placeholder="Your Business Name"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                            />
                        </div>
                        {errors.businessName && <span className="input-error-message">{errors.businessName}</span>}
                    </div>

                    <div className="input-group">
                        <label className="input-label">{t('auth.email')}</label>
                        <div style={{ position: 'relative' }}>
                            <Mail
                                size={18}
                                style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-tertiary)'
                                }}
                            />
                            <input
                                type="email"
                                className={`input ${errors.email ? 'input-error' : ''}`}
                                style={{ paddingLeft: 40 }}
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {errors.email && <span className="input-error-message">{errors.email}</span>}
                    </div>

                    <div className="input-group">
                        <label className="input-label">{t('auth.password')}</label>
                        <div style={{ position: 'relative' }}>
                            <Lock
                                size={18}
                                style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-tertiary)'
                                }}
                            />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`input ${errors.password ? 'input-error' : ''}`}
                                style={{ paddingLeft: 40, paddingRight: 40 }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--color-text-tertiary)'
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <span className="input-error-message">{errors.password}</span>}
                    </div>

                    <div className="input-group">
                        <label className="input-label">{t('auth.confirmPassword')}</label>
                        <div style={{ position: 'relative' }}>
                            <Lock
                                size={18}
                                style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-tertiary)'
                                }}
                            />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                                style={{ paddingLeft: 40 }}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {errors.confirmPassword && <span className="input-error-message">{errors.confirmPassword}</span>}
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        isLoading={isLoading}
                        style={{ marginTop: 'var(--spacing-sm)' }}
                    >
                        {t('auth.register')}
                    </Button>
                </form>

                {/* Login Link */}
                <div className="auth-footer">
                    {t('auth.hasAccount')}{' '}
                    <Link to="/login" className="text-accent font-medium">
                        {t('auth.login')}
                    </Link>
                </div>
            </div>
        </div>
    );
};
