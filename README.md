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

The live page resolves the current YouTube live broadcast at request time:

### How It Works

1. **Live Video API route** (`src/app/api/live-video/route.ts`):
   - Calls the YouTube Data API for the channel's current live broadcast
   - Falls back to the most recent completed livestream when nothing is live
   - Returns a 404 response only when the channel has no live or archived broadcast to show

2. **LiveVideo Component** (`src/components/LiveVideo.tsx`):
   - Fetches `/api/live-video` on load
   - Embeds the returned live stream when one is available
   - Displays live stream with service information

### YouTube API Setup

To enable live video lookup:

1. Get a YouTube Data API v3 key
2. Add it as an environment variable named `YOUTUBE_API_KEY`
3. Optionally set `YOUTUBE_CHANNEL_ID` if the channel changes
4. The live page will always request the current live broadcast before showing the player
5. When nothing is live, the page shows the most recent livestream recording

### Channel Configuration

Default channel ID: `UCaWvM15oR08RL5DYKxQ4TzA`
Set `YOUTUBE_CHANNEL_ID` if the channel changes.

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
