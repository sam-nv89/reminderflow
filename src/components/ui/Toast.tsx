import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, LucideIcon } from 'lucide-react';
import { useToastStore } from '../../stores';
import { ToastType } from '../../types';

const iconMap: Record<ToastType, LucideIcon> = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

export const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToastStore();

    if (toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map((toast) => {
                const IconComponent = iconMap[toast.type];
                return (
                    <div key={toast.id} className={`toast toast-${toast.type}`}>
                        <IconComponent size={20} />
                        <span className="flex-1">{toast.message}</span>
                        <button
                            className="btn-ghost p-xs rounded-md"
                            onClick={() => removeToast(toast.id)}
                            aria-label="Dismiss"
                        >
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
