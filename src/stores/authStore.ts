import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';
import { Business, Subscription, ReminderSettings, Theme } from '../types';
import { supabase, db } from '../services/supabase';

interface AuthState {
    user: User | null;
    business: Business | null;
    subscription: Subscription | null;
    reminderSettings: ReminderSettings | null;
    isLoading: boolean;
    isInitialized: boolean;
    theme: Theme;

    // Actions
    setUser: (user: User | null) => void;
    setBusiness: (business: Business | null) => void;
    setSubscription: (subscription: Subscription | null) => void;
    setReminderSettings: (settings: ReminderSettings | null) => void;
    setTheme: (theme: Theme) => void;
    initialize: () => Promise<void>;
    signOut: () => Promise<void>;
    refreshBusiness: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            business: null,
            subscription: null,
            reminderSettings: null,
            isLoading: true,
            isInitialized: false,
            theme: 'light',

            setUser: (user) => set({ user }),
            setBusiness: (business) => set({ business }),
            setSubscription: (subscription) => set({ subscription }),
            setReminderSettings: (settings) => set({ reminderSettings: settings }),

            setTheme: (theme) => {
                set({ theme });
                // Apply theme to document
                if (theme === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                } else {
                    document.documentElement.setAttribute('data-theme', theme);
                }
            },

            initialize: async () => {
                try {
                    set({ isLoading: true });

                    // Get current session
                    const { data: { session } } = await supabase.auth.getSession();

                    if (session?.user) {
                        set({ user: session.user });

                        // Get business data
                        const { data: business } = await db.businesses.get(session.user.id);
                        if (business) {
                            set({ business });

                            // Get subscription
                            const { data: subscription } = await db.subscriptions.get(business.id);
                            set({ subscription });

                            // Get reminder settings
                            const { data: settings } = await db.reminderSettings.get(business.id);
                            set({ reminderSettings: settings });
                        }
                    }

                    // Apply saved theme
                    const { theme } = get();
                    if (theme === 'system') {
                        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                    } else {
                        document.documentElement.setAttribute('data-theme', theme);
                    }

                    set({ isLoading: false, isInitialized: true });
                } catch (error) {
                    console.error('Failed to initialize auth:', error);
                    set({ isLoading: false, isInitialized: true });
                }
            },

            signOut: async () => {
                await supabase.auth.signOut();
                set({
                    user: null,
                    business: null,
                    subscription: null,
                    reminderSettings: null,
                });
            },

            refreshBusiness: async () => {
                const { user } = get();
                if (!user) return;

                const { data: business } = await db.businesses.get(user.id);
                if (business) {
                    set({ business });

                    const { data: subscription } = await db.subscriptions.get(business.id);
                    set({ subscription });

                    const { data: settings } = await db.reminderSettings.get(business.id);
                    set({ reminderSettings: settings });
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);

// Listen for auth changes
supabase.auth.onAuthStateChange(async (event, session) => {
    const store = useAuthStore.getState();

    if (event === 'SIGNED_IN' && session?.user) {
        store.setUser(session.user);
        await store.refreshBusiness();
    } else if (event === 'SIGNED_OUT') {
        store.setUser(null);
        store.setBusiness(null);
        store.setSubscription(null);
        store.setReminderSettings(null);
    }
});
