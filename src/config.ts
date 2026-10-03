// Values here come from environment variables (set in a local, gitignored
// .env file — see .env.example for the full list and setup instructions in
// the README) rather than being hardcoded, so the real Google Sheet URL and
// any shared secret never end up committed to source control.

// Deployed URL of /temple-app-notify-server, e.g.
// "https://temple-app-notify-server.vercel.app/api/notify".
export const NOTIFY_API_URL: string =
  process.env.EXPO_PUBLIC_NOTIFY_API_URL ?? "https://temple-app-notify-server.vercel.app/api/notify";

// Optional: must match APP_SHARED_SECRET set on the server. Leave blank to skip.
export const APP_SHARED_SECRET: string = process.env.EXPO_PUBLIC_APP_SHARED_SECRET ?? "";

// Share URL of the published Google Sheet used for calendar events (File >
// Share > "Anyone with the link" is enough — no need to "publish to web").
// Use Temple-Calendar-Template.xlsx as the column format. Leave unset to
// fall back to the built-in sample events.
export const EVENTS_SHEET_URL: string = process.env.EXPO_PUBLIC_EVENTS_SHEET_URL ?? "";
