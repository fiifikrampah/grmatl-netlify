# Great Redemption Ministries

This is a modern, responsive website for Great Redemption Ministries built with Next.js 15, TypeScript, and Tailwind CSS, featuring shadcn/ui components.

## Features

- **Modern Design**: Clean, professional design with responsive layout
- **Mobile-First**: Optimized for all screen sizes
- **Fast Performance**: Built with Next.js for optimal performance
- **Accessible**: Proper semantic HTML and ARIA labels
- **SEO Optimized**: Comprehensive metadata and structured data
- **Live Streaming**: Integrated YouTube live streaming with automatic updates

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Ready for Netlify

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── give/              # Giving page
│   ├── live/              # Live streaming page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── Layout.tsx        # Page layout wrapper
│   ├── HomePage.tsx      # Home page content
│   ├── AboutPage.tsx     # About page content
│   ├── LivePage.tsx      # Live page content
│   └── LiveVideo.tsx     # Live video embed component
└── lib/                  # Utility functions
    └── utils.ts          # shadcn/ui utilities
```

## Live Video Integration

The site includes automatic live video updates through GitHub Actions:

### How It Works

1. **GitHub Actions Workflow** (`.github/workflows/stream-embedder.yml`):
   - Runs twice weekly (Sundays at 11:15 AM and 11:25 AM EST)
   - Fetches latest YouTube live video from the church's channel
   - Updates the embed URL in `src/components/LiveVideo.tsx`
   - Adjusts cron schedules based on DST status

2. **LiveVideo Component** (`src/components/LiveVideo.tsx`):
   - Contains the YouTube embed with placeholder URL
   - GitHub Actions updates the URL automatically
   - Displays live stream with service information

### YouTube API Setup

To enable automatic live video updates:

1. Get a YouTube Data API v3 key
2. Add it as a GitHub repository secret named `YOUTUBE_API_KEY`
3. The workflow will automatically fetch and update the latest live video

### Channel Configuration

The workflow is configured for channel ID: `UCaWvM15oR08RL5DYKxQ4TzA`
Update this in the workflow file if the channel ID changes.

## Development

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Pages

- **Home** (`/`): Welcome page with hero section, about, services, and location
- **About** (`/about`): Church history, founder information, and ministries
- **Live** (`/live`): Live streaming and sermon archive
- **Contact** (`/contact`): Contact information and location map
- **Give** (`/give`): Online giving options and information

## Styling

The site uses a modern color scheme:
- Primary: Blue (#1B5299)
- Secondary: Light Blue (#4a7bc8)
- Text: Dark Gray (#333)
- Background: White (#fff)

## Event Registration Email Notifications

When someone completes an event registration form, an email with the form details is sent to `grmmedia16@gmail.com`. This uses [Resend](https://resend.com).

### Setup

1. Create a [Resend](https://resend.com) account and get an API key.
2. Add these environment variables in Netlify (Site settings → Environment variables) and locally in `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Your Resend API key |
| `RESEND_FROM_EMAIL` | No | Sender email (default: `onboarding@resend.dev` for testing) |
| `RESEND_FROM_NAME` | No | Sender name (default: `GRM Events`) |

3. For production, verify your domain in Resend and set `RESEND_FROM_EMAIL` to something like `noreply@yourdomain.com`.

If `RESEND_API_KEY` is not set, registrations still succeed and are saved to the database; only the email notification is skipped.

## License

Copyright © Great Redemption Ministries Inc. All rights reserved.