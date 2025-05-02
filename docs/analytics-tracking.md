# Website Analytics Tracking Guide for RenewAlert

## Overview

This document explains how visitor tracking is implemented in RenewAlert using Google Analytics 4.

## Implementation Details

The tracking functionality is implemented using the `react-ga4` package, which provides a React-friendly wrapper for Google Analytics 4.

The core tracking functionality is in:
- `client/src/lib/analytics.ts`: Main tracking utility
- `client/src/App.tsx`: GA initialization and page view tracking
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
   - Open `client/src/App.tsx`
   - Replace the placeholder Measurement ID:
   ```jsx
   if (window.location.hostname !== 'localhost') {
     initGA('G-XXXXXXXXXX'); // ← Replace this with your Measurement ID
   }
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