import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});

// Auth helpers
export const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
};

export const signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    return { data, error };
};

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            scopes: 'https://www.googleapis.com/auth/calendar.readonly',
        },
    });
    return { data, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
};

export const getSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
};

// Database helpers
export const db = {
    // Businesses
    businesses: {
        async get(userId: string) {
            const { data, error } = await supabase
                .from('businesses')
                .select('*')
                .eq('user_id', userId)
                .single();
            return { data, error };
        },

        async create(business: { user_id: string; name: string; timezone?: string; language?: string }) {
            const { data, error } = await supabase
                .from('businesses')
                .insert(business)
                .select()
                .single();
            return { data, error };
        },

        async update(id: string, updates: Partial<{ name: string; logo_url: string; timezone: string; language: string }>) {
            const { data, error } = await supabase
                .from('businesses')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            return { data, error };
        },
    },

    // Reminder Settings
    reminderSettings: {
        async get(businessId: string) {
            const { data, error } = await supabase
                .from('reminder_settings')
                .select('*')
                .eq('business_id', businessId)
                .single();
            return { data, error };
        },

        async upsert(settings: {
            business_id: string;
            intervals?: { hours: number; channel: string }[];
            sms_enabled?: boolean;
            email_enabled?: boolean;
            whatsapp_enabled?: boolean;
            default_message_template?: string;
        }) {
            const { data, error } = await supabase
                .from('reminder_settings')
                .upsert(settings, { onConflict: 'business_id' })
                .select()
                .single();
            return { data, error };
        },
    },

    // Calendar Integrations
    calendarIntegrations: {
        async list(businessId: string) {
            const { data, error } = await supabase
                .from('calendar_integrations')
                .select('*')
                .eq('business_id', businessId);
            return { data, error };
        },

        async create(integration: {
            business_id: string;
            provider: string;
            access_token?: string;
            refresh_token?: string;
            calendar_id?: string;
        }) {
            const { data, error } = await supabase
                .from('calendar_integrations')
                .insert(integration)
                .select()
                .single();
            return { data, error };
        },

        async update(id: string, updates: Partial<{
            access_token: string;
            refresh_token: string;
            calendar_id: string;
            sync_enabled: boolean;
            last_sync_at: string;
        }>) {
            const { data, error } = await supabase
                .from('calendar_integrations')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            return { data, error };
        },

        async delete(id: string) {
            const { error } = await supabase
                .from('calendar_integrations')
                .delete()
                .eq('id', id);
            return { error };
        },
    },

    // Appointments
    appointments: {
        async list(businessId: string, options?: {
            status?: string;
            from?: string;
            to?: string;
            limit?: number;
        }) {
            let query = supabase
                .from('appointments')
                .select('*')
                .eq('business_id', businessId)
                .order('start_time', { ascending: true });

            if (options?.status) {
                query = query.eq('status', options.status);
            }
            if (options?.from) {
                query = query.gte('start_time', options.from);
            }
            if (options?.to) {
                query = query.lte('start_time', options.to);
            }
            if (options?.limit) {
                query = query.limit(options.limit);
            }

            const { data, error } = await query;
            return { data, error };
        },

        async get(id: string) {
            const { data, error } = await supabase
                .from('appointments')
                .select('*')
                .eq('id', id)
                .single();
            return { data, error };
        },

        async create(appointment: {
            business_id: string;
            client_name: string;
            client_phone?: string;
            client_email?: string;
            service_name?: string;
            start_time: string;
            end_time: string;
            notes?: string;
        }) {
            const { data, error } = await supabase
                .from('appointments')
                .insert(appointment)
                .select()
                .single();
            return { data, error };
        },

        async update(id: string, updates: Partial<{
            client_name: string;
            client_phone: string;
            client_email: string;
            service_name: string;
            start_time: string;
            end_time: string;
            status: string;
            notes: string;
        }>) {
            const { data, error } = await supabase
                .from('appointments')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            return { data, error };
        },

        async delete(id: string) {
            const { error } = await supabase
                .from('appointments')
                .delete()
                .eq('id', id);
            return { error };
        },
    },

    // Reminders
    reminders: {
        async list(businessId: string, options?: {
            status?: string;
            limit?: number;
        }) {
            let query = supabase
                .from('reminders')
                .select(`
          *,
          appointment:appointments(*)
        `)
                .order('scheduled_for', { ascending: false });

            if (options?.status) {
                query = query.eq('status', options.status);
            }
            if (options?.limit) {
                query = query.limit(options.limit);
            }

            const { data, error } = await query;
            return { data, error };
        },
    },

    // Subscriptions
    subscriptions: {
        async get(businessId: string) {
            const { data, error } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('business_id', businessId)
                .single();
            return { data, error };
        },

        async update(id: string, updates: Partial<{
            plan: string;
            sms_limit: number;
            sms_used: number;
            status: string;
        }>) {
            const { data, error } = await supabase
                .from('subscriptions')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            return { data, error };
        },
    },

    // Analytics
    analytics: {
        async getDailyStats(businessId: string, from: string, to: string) {
            const { data, error } = await supabase
                .from('analytics_daily')
                .select('*')
                .eq('business_id', businessId)
                .gte('date', from)
                .lte('date', to)
                .order('date', { ascending: true });
            return { data, error };
        },
    },
};
