# RenewAlert - Document Renewal Reminders

RenewAlert is a service that helps users track and manage important document renewals like passports, visas, IDs, and residency permits. The application focuses on providing timely reminders, helping users stay organized and stress-free.

## Features

- Early access sign-up form
- Support for phone or email contact preferences
- Multi-language support (English, Arabic, Hindi)
- IP-based geolocation for country detection
- Admin dashboard for managing sign-ups
- Duplicate submission prevention
- Visitor analytics tracking

## Technology Stack

- React with TypeScript
- Express backend
- PostgreSQL database with Drizzle ORM
- IP-based geolocation
- Google Analytics 4 integration
- Multi-language support
- Mobile-responsive design

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see below)
4. Start the development server: `npm run dev`

## Environment Variables

The following environment variables need to be set:

- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_API_KEY`: Secret key for accessing admin features
- `SESSION_SECRET`: Secret for Express session

## Google Analytics Setup

Google Analytics 4 is properly configured to track visitor statistics on your deployed site. The current implementation uses the standard Google Analytics script directly in the HTML head:

```html
<!-- In index.html -->
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8MG9K676V5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-8MG9K676V5');
</script>
```

The analytics integration will track:

- Page views across the site
- Form submissions (success and errors)
- Social sharing clicks (WhatsApp, Facebook, Twitter, Email)

You can view all these metrics in your Google Analytics dashboard.

## Admin Dashboard

The admin dashboard allows you to:

- View all signups
- Search/filter by name, email, phone, etc.
- Delete records
- View submission details

To access the admin dashboard:
1. Navigate to `/admin`
2. Use the admin API key in the X-API-Key header

## Deployment

The application is designed to be deployed on Replit, but can be deployed to any hosting service that supports Node.js applications.

After deployment, don't forget to:
1. Set the required environment variables
2. Update the Google Analytics Measurement ID
3. Ensure the database connection is properly configured

## License

This project is proprietary and confidential.

## Contact

For support or inquiries, please contact info@renewalert.app