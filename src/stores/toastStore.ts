import { create } from 'zustand';
import { Toast, ToastType } from '../types';

interface ToastState {
    toasts: Toast[];
    addToast: (type: ToastType, message: string, duration?: number) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
    toasts: [],

    addToast: (type, message, duration = 5000) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const toast: Toast = { id, type, message, duration };

        set((state) => ({
            toasts: [...state.toasts, toast],
        }));

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                get().removeToast(id);
            }, duration);
        }
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },

    clearToasts: () => {
        set({ toasts: [] });
    },
}));

// Helper functions
export const toast = {
    success: (message: string, duration?: number) =>
        useToastStore.getState().addToast('success', message, duration),
    error: (message: string, duration?: number) =>
        useToastStore.getState().addToast('error', message, duration),
    warning: (message: string, duration?: number) =>
        useToastStore.getState().addToast('warning', message, duration),
    info: (message: string, duration?: number) =>
        useToastStore.getState().addToast('info', message, duration),
};
