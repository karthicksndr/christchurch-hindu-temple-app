import * as Notifications from "expo-notifications";
import { EventItem } from "../data/events";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NOTIFICATION_PREFIX = "temple-event-";
const REMINDER_HOUR = 8;

export async function requestNotificationPermission(): Promise<boolean> {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

function buildNotificationContent(dayEvents: EventItem[]): { title: string; body: string } {
  if (dayEvents.length === 1) {
    const event = dayEvents[0];
    const parts = [event.title];
    if (event.time) parts.push(event.time);
    if (event.location) parts.push(event.location);
    return { title: "Today at the temple", body: parts.join(" · ") };
  }
  return {
    title: `${dayEvents.length} events today at the temple`,
    body: dayEvents.map((event) => event.title).join(", "),
  };
}

// Schedules one 8 AM local notification per future date that has events,
// keyed by that date so re-running this (e.g. every time the calendar screen
// loads) never creates duplicates or stale reminders. Multiple events on the
// same day are combined into a single notification rather than stacking one
// alert per event.
export async function scheduleEventReminders(events: EventItem[]): Promise<void> {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    scheduled
      .filter((n) => n.identifier.startsWith(NOTIFICATION_PREFIX))
      .map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier))
  );

  const now = new Date();
  const eventsByDate = new Map<string, EventItem[]>();
  for (const event of events) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date)) continue;
    const group = eventsByDate.get(event.date) ?? [];
    group.push(event);
    eventsByDate.set(event.date, group);
  }

  for (const [date, dayEvents] of eventsByDate) {
    const [year, month, day] = date.split("-").map(Number);
    const triggerDate = new Date(year, month - 1, day, REMINDER_HOUR, 0, 0);
    if (triggerDate.getTime() <= now.getTime()) continue;

    await Notifications.scheduleNotificationAsync({
      identifier: `${NOTIFICATION_PREFIX}${date}`,
      content: buildNotificationContent(dayEvents),
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
    });
  }
}
