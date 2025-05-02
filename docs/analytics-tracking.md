# Website Analytics Tracking Guide for RenewAlert

## Overview

This document explains how visitor tracking is implemented in RenewAlert using Google Analytics 4.

## Implementation Details

The tracking functionality is implemented using the standard Google Analytics 4 gtag.js script directly inserted in the HTML.

The core tracking functionality is in:
- `client/index.html`: Contains the Google Analytics script in the <head> section
- `client/src/lib/analytics.ts`: Provides wrapper functions for tracking
- `client/src/App.tsx`: Route-based page view tracking
- `client/src/components/signup-form.tsx`: Event tracking for forms and social sharing

## What's Being Tracked

1. **Page Views**
   - Every page navigation is automatically tracked
   - The current path is sent to Google Analytics

2. **Form Submissions**
   - Successful form submissions
   - Form submission method (phone or email)

3. **Social Sharing**
   - Clicks on social share buttons (WhatsApp, Facebook, Twitter, Email)
   - Each platform is tracked separately

## Setup Instructions

To start tracking real visitors:

1. **Create a GA4 Property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create a new property (GA4 type)
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Update Your Code**
   - Open `client/index.html`
   - The Google Analytics script has been added with your Measurement ID:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MG9K676V5"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-8MG9K676V5');
   </script>
   ```

3. **Verify Tracking**
   - Deploy your site
   - Visit it in a browser
   - Open the GA Real-Time reports to confirm data is flowing
   - Test each feature (page navigation, form submission, social sharing)

## Adding More Tracking

To track additional events:

1. Import the tracking function:
```jsx
import { trackEvent } from "@/lib/analytics";
```

2. Call it with your event details:
```jsx
trackEvent('Category', 'Action', 'Label', Value);
```

Examples:
```jsx
// Track button clicks
<button onClick={() => trackEvent('UI', 'ButtonClick', 'SignUp')}>
  Sign Up
</button>

// Track feature usage
trackEvent('Feature', 'Used', 'LanguageChange', 1);
```

## Viewing Analytics Data

1. Log in to Google Analytics
2. Navigate to your property
3. Use the Reports section to view:
   - Real-time activity
   - User engagement
   - Event tracking
   - Conversion data

## Troubleshooting

- **No data appearing?** Make sure your Measurement ID is correct and initialized properly
- **Missing events?** Check that event tracking calls are formatted correctly
- **Need more detailed tracking?** Consider enhancing the `trackEvent` function with additional parameters

## Privacy Considerations

- Google Analytics data collection complies with our Privacy Policy
- Users are informed through our Privacy Policy about analytics tracking
- Analytics data is anonymized and used only for improving user experience