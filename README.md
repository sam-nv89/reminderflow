# ReminderFlow

Appointment reminder SaaS - Reduce no-shows by 80% with automated reminders via SMS, Email & WhatsApp.

## Features

- 📅 **Google Calendar Sync** - Automatically import appointments
- 📱 **Multi-channel Reminders** - SMS, Email, WhatsApp
- ⏰ **Customizable Intervals** - Set when to send reminders
- ✅ **Easy Confirmation** - Clients confirm with a simple reply
- 📊 **Analytics Dashboard** - Track confirmation rates and no-shows
- 🌍 **Multi-language** - English and Russian support
- 🌙 **Dark Mode** - Light and dark theme support

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: CSS Variables + Custom Design System
- **State**: Zustand
- **Routing**: React Router v6
- **i18n**: react-i18next
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **SMS**: Twilio
- **Email**: SendGrid

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Twilio account (for SMS)
- SendGrid account (for Email)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/reminderflow.git
cd reminderflow
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your API keys

5. Start development server:
```bash
npm run dev
```

## Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Calendar
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── layout/       # Layout components
├── pages/            # Page components
├── stores/           # Zustand stores
├── services/         # API services
├── i18n/             # Translations
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## Deployment

### Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

## License

MIT
