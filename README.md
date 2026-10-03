# Christchurch Hindu Temple

The official mobile app for the Christchurch Hindu Temple & Culture Centre — built with [Expo](https://expo.dev) and React Native.

## Features

- **Home** — temple branding, photo carousel, address, opening hours, and quick links
- **Services** — browse poojas/sevas with pricing, and submit a booking request
- **Payments** — paid bookings receive a Stripe payment link by email, with payment status tracked back to the temple's records
- **Temple calendar** — upcoming and past events for the current month, sourced from a Google Sheet (falls back to built-in sample events if unset)
- **Event reminders** — local notifications the morning of an upcoming event
- **Contact** — address, hours, WhatsApp/Facebook group links, contact people, and an enquiry form
- **Gallery** — photos of the temple and deities

## Tech stack

- [Expo](https://expo.dev) (SDK 57) + [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation
- React Native 0.86, React 19, TypeScript
- [EAS Update](https://docs.expo.dev/eas-update/introduction/) for over-the-air JS updates
- A companion backend ([`temple-app-notify-server`](#backend)) handles email, Stripe, and sheet logging

## Project structure

```
app/                   Screens and navigation (expo-router file-based routes)
src/components/        UI, layout, and feature components
src/data/              Static content: services, temple info
src/lib/               Notification/API client, Google Sheet CSV parsing
src/theme/             Colors, typography, spacing, image registry
assets/                Images and app icons
```

## Getting started

### Prerequisites

- Node.js 20+
- An [Expo Go](https://expo.dev/go) app on your phone, or an iOS Simulator / Android Emulator

### Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env` with real values (see comments in `.env.example`). All three variables have safe fallbacks — the app runs with placeholder/sample content if left blank.

### Run locally

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `i` / `a` to launch a simulator.

### Other scripts

```bash
npm run typecheck   # tsc --noEmit
```

## Deployment

This project uses [EAS Update](https://docs.expo.dev/eas-update/introduction/) to ship JS changes over the air to the `preview` branch without an app store release:

```bash
npx eas-cli update --branch preview --message "Your message" --platform all
```

A full native build (new app icon, splash screen, or native dependency changes) requires `eas build` instead — OTA updates only affect JS-level changes.

## Backend

Bookings, enquiries, email (via [Resend](https://resend.com)), Stripe Checkout, and Google Sheet logging are handled by a separate backend project, `temple-app-notify-server`, deployed on [Vercel](https://vercel.com). It is not included in this repository. Its `/api/notify` endpoint URL is configured via `EXPO_PUBLIC_NOTIFY_API_URL` in `.env`.

## Environment variables

See `.env.example` for the full list. None of these are required for the app to run — each has a safe fallback — but without them, calendar events fall back to sample data and bookings won't trigger a backend email/payment flow.

**Never commit `.env`** — it's gitignored for a reason. If you rotate the Google Sheet or shared secret, update `.env` locally and in your deployment's build/CI environment; nothing in source control needs to change.
