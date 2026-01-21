// ============================================
// ReminderFlow - TypeScript Types
// ============================================

// User & Business
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Business {
  id: string;
  user_id: string;
  name: string;
  logo_url?: string;
  timezone: string;
  language: 'en' | 'ru';
  created_at: string;
}

// Reminder Settings
export interface ReminderInterval {
  hours: number;
  channel: 'sms' | 'email' | 'whatsapp';
}

export interface ReminderSettings {
  id: string;
  business_id: string;
  intervals: ReminderInterval[];
  sms_enabled: boolean;
  email_enabled: boolean;
  whatsapp_enabled: boolean;
  default_message_template?: string;
  created_at: string;
}

// Calendar Integration
export interface CalendarIntegration {
  id: string;
  business_id: string;
  provider: 'google' | 'calendly' | 'outlook';
  access_token?: string;
  refresh_token?: string;
  calendar_id?: string;
  sync_enabled: boolean;
  last_sync_at?: string;
  created_at: string;
}

// Appointments
export type AppointmentStatus = 
  | 'scheduled' 
  | 'confirmed' 
  | 'cancelled' 
  | 'completed' 
  | 'no_show';

export interface Appointment {
  id: string;
  business_id: string;
  external_id?: string;
  client_name: string;
  client_phone?: string;
  client_email?: string;
  service_name?: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
}

// Reminders
export type ReminderChannel = 'sms' | 'email' | 'whatsapp';
export type ReminderStatus = 'pending' | 'sent' | 'delivered' | 'failed';

export interface Reminder {
  id: string;
  appointment_id: string;
  channel: ReminderChannel;
  status: ReminderStatus;
  scheduled_for: string;
  sent_at?: string;
  message_content?: string;
  external_id?: string;
  error_message?: string;
  created_at: string;
}

// Reminder Responses
export type ResponseType = 'confirmed' | 'cancelled' | 'rescheduled';

export interface ReminderResponse {
  id: string;
  reminder_id: string;
  response_type: ResponseType;
  raw_response?: string;
  received_at: string;
}

// Subscriptions & Billing
export type SubscriptionPlan = 'free' | 'starter' | 'business' | 'enterprise';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'trialing';

export interface Subscription {
  id: string;
  business_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan: SubscriptionPlan;
  sms_limit: number;
  sms_used: number;
  status: SubscriptionStatus;
  current_period_start?: string;
  current_period_end?: string;
  created_at: string;
}

// Analytics
export interface DailyAnalytics {
  id: string;
  business_id: string;
  date: string;
  reminders_sent: number;
  reminders_delivered: number;
  confirmations: number;
  cancellations: number;
  no_shows: number;
  sms_cost: number;
}

// Dashboard Stats
export interface DashboardStats {
  totalAppointments: number;
  upcomingAppointments: number;
  remindersSent: number;
  confirmationRate: number;
  noShowRate: number;
  smsUsed: number;
  smsLimit: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  businessName: string;
}

export interface ReminderSettingsForm {
  intervals: ReminderInterval[];
  smsEnabled: boolean;
  emailEnabled: boolean;
  whatsappEnabled: boolean;
  messageTemplate: string;
}

// Plan Details
export interface PlanDetails {
  id: SubscriptionPlan;
  name: string;
  price: number;
  smsLimit: number;
  features: string[];
}

export const PLANS: PlanDetails[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    smsLimit: 20,
    features: [
      '20 SMS per month',
      'Unlimited emails',
      'Google Calendar sync',
      'Basic analytics',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    smsLimit: 100,
    features: [
      '100 SMS per month',
      'Unlimited emails & WhatsApp',
      'Google Calendar sync',
      'Advanced analytics',
      'Custom message templates',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: 39,
    smsLimit: 500,
    features: [
      '500 SMS per month',
      'Unlimited emails & WhatsApp',
      'Multiple calendar sync',
      'Priority support',
      'Team access (3 users)',
      'API access',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 79,
    smsLimit: 2000,
    features: [
      '2000 SMS per month',
      'Everything in Business',
      'Unlimited team members',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
  },
];

// Theme
export type Theme = 'light' | 'dark' | 'system';

// Toast
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
