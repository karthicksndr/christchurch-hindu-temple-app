import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { ScreenBackground } from "../../src/components/layout/ScreenBackground";
import { SectionTitle } from "../../src/components/ui/SectionTitle";
import { EventTimelineItem } from "../../src/components/feature/EventTimelineItem";
import { MonthCalendar } from "../../src/components/feature/MonthCalendar";
import { EVENTS, EventItem } from "../../src/data/events";
import { fetchEventsFromSheet } from "../../src/lib/sheetEvents";
import { scheduleEventReminders } from "../../src/lib/eventNotifications";
import { EVENTS_SHEET_URL } from "../../src/config";
import { colors } from "../../src/theme";
import { fonts } from "../../src/theme/typography";

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function monthPrefix(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export default function TempleCalendarScreen() {
  // null = still loading. Resolves to either the live sheet data, or the
  // built-in placeholders if the sheet isn't configured yet or fails to load.
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  useEffect(() => {
    let cancelled = false;
    fetchEventsFromSheet(EVENTS_SHEET_URL)
      .then((fetched) => {
        if (cancelled) return;
        setEvents(fetched.length > 0 ? fetched : EVENTS);
      })
      .catch(() => {
        if (!cancelled) setEvents(EVENTS);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Re-running this whenever `events` changes cancels and re-schedules so
    // there's never a duplicate or stale reminder sitting on the device.
    if (!events) return;
    scheduleEventReminders(events).catch(() => {
      // Permission denied, or scheduling unsupported on this device — the
      // calendar screen itself still works fine either way.
    });
  }, [events]);

  const today = todayIso();

  // Highlighting on the calendar grid considers all events, not just the
  // visible month, so navigating months always shows the right dots.
  const { upcomingDates, pastDates } = useMemo(() => {
    const upcoming = new Set<string>();
    const past = new Set<string>();
    for (const event of events ?? []) {
      (event.date >= today ? upcoming : past).add(event.date);
    }
    return { upcomingDates: upcoming, pastDates: past };
  }, [events, today]);

  const onChangeMonth = (year: number, month: number) => {
    setViewYear(year);
    setViewMonth(month);
    setSelectedDate(null);
  };

  // The list below the calendar only ever shows events for the month
  // currently on screen.
  const prefix = monthPrefix(viewYear, viewMonth);

  const upcomingEvents = useMemo(
    () =>
      (events ?? [])
        .filter((e) => e.date.startsWith(prefix) && e.date >= today && (!selectedDate || e.date === selectedDate))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events, today, selectedDate, prefix]
  );

  const pastEvents = useMemo(
    () =>
      (events ?? [])
        .filter((e) => e.date.startsWith(prefix) && e.date < today && (!selectedDate || e.date === selectedDate))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [events, today, selectedDate, prefix]
  );

  const hasAnyForSelection = upcomingEvents.length > 0 || pastEvents.length > 0;

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title="Temple calendar" subtitle="Upcoming events and celebrations" />
        {events === null ? (
          <ActivityIndicator color={colors.gold} style={styles.spinner} />
        ) : (
          <>
            <MonthCalendar
              year={viewYear}
              month={viewMonth}
              onChangeMonth={onChangeMonth}
              upcomingDates={upcomingDates}
              pastDates={pastDates}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

            {selectedDate && (
              <Pressable onPress={() => setSelectedDate(null)} style={styles.clearFilter}>
                <Text style={styles.clearFilterText}>Show all events this month</Text>
              </Pressable>
            )}

            {!hasAnyForSelection && (
              <Text style={styles.emptyText}>
                {selectedDate ? "No events on this date." : "No events this month."}
              </Text>
            )}

            {upcomingEvents.length > 0 && (
              <>
                {!selectedDate && <Text style={styles.sectionLabel}>Upcoming</Text>}
                {upcomingEvents.map((event) => (
                  <EventTimelineItem key={event.id} event={event} />
                ))}
              </>
            )}

            {pastEvents.length > 0 && (
              <>
                {!selectedDate && <Text style={styles.sectionLabel}>Completed</Text>}
                {pastEvents.map((event) => (
                  <EventTimelineItem key={event.id} event={event} completed />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 14, paddingBottom: 48 },
  spinner: { marginTop: 24 },
  sectionLabel: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.brownSecondary, marginTop: 4 },
  clearFilter: { alignSelf: "flex-start" },
  clearFilterText: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.maroon },
  emptyText: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.brownSecondary },
});
