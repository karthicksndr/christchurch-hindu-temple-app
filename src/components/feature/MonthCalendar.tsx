import { useMemo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Card } from "../ui/Card";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function toIso(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

type Props = {
  year: number;
  month: number; // 0-indexed
  onChangeMonth: (year: number, month: number) => void;
  // ISO dates ("YYYY-MM-DD") that have an event today or in the future.
  upcomingDates: Set<string>;
  // ISO dates that have an event that's already passed.
  pastDates: Set<string>;
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
};

export function MonthCalendar({
  year,
  month,
  onChangeMonth,
  upcomingDates,
  pastDates,
  selectedDate,
  onSelectDate,
}: Props) {
  const today = new Date();
  const todayIso = toIso(today.getFullYear(), today.getMonth(), today.getDate());

  const weeks = useMemo(() => {
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = Array(firstWeekday).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const rows: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [year, month]);

  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-NZ", { month: "long", year: "numeric" });

  const goPrev = () => {
    const d = new Date(year, month - 1, 1);
    onChangeMonth(d.getFullYear(), d.getMonth());
  };
  const goNext = () => {
    const d = new Date(year, month + 1, 1);
    onChangeMonth(d.getFullYear(), d.getMonth());
  };

  return (
    <Card style={styles.wrap}>
      <View style={styles.header}>
        <Pressable onPress={goPrev} hitSlop={8} style={styles.navButton} accessibilityRole="button" accessibilityLabel="Previous month">
          <ChevronLeft size={18} color={colors.brown} />
        </Pressable>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        <Pressable onPress={goNext} hitSlop={8} style={styles.navButton} accessibilityRole="button" accessibilityLabel="Next month">
          <ChevronRight size={18} color={colors.brown} />
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {WEEKDAY_LABELS.map((label, i) => (
          <Text key={i} style={styles.weekdayLabel}>
            {label}
          </Text>
        ))}
      </View>

      {weeks.map((week, wi) => (
        <View key={wi} style={styles.weekRow}>
          {week.map((day, di) => {
            if (day === null) return <View key={di} style={styles.dayCell} />;
            const iso = toIso(year, month, day);
            const isUpcoming = upcomingDates.has(iso);
            const isPast = pastDates.has(iso);
            const hasEvent = isUpcoming || isPast;
            const isToday = iso === todayIso;
            const isSelected = iso === selectedDate;

            return (
              <Pressable
                key={di}
                style={styles.dayCell}
                disabled={!hasEvent}
                onPress={() => onSelectDate(isSelected ? null : iso)}
                accessibilityRole={hasEvent ? "button" : undefined}
              >
                <View
                  style={[
                    styles.dayCircle,
                    isPast && styles.dayCirclePast,
                    isUpcoming && styles.dayCircleUpcoming,
                    isToday && !isSelected && styles.dayCircleToday,
                    isSelected && styles.dayCircleSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      hasEvent && styles.dayTextOnEvent,
                      isSelected && styles.dayTextSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.gold }]} />
          <Text style={styles.legendText}>Upcoming</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.brownSecondary }]} />
          <Text style={styles.legendText}>Completed</Text>
        </View>
      </View>
    </Card>
  );
}

const CELL_SIZE = 34;

const styles = StyleSheet.create({
  wrap: { gap: spacing.xs },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm },
  navButton: { padding: 4 },
  monthLabel: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.brown },
  weekRow: { flexDirection: "row" },
  weekdayLabel: {
    width: `${100 / 7}%`,
    textAlign: "center",
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.brownSecondary,
    marginBottom: 4,
  },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: "center", justifyContent: "center" },
  dayCircle: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircleUpcoming: { backgroundColor: colors.gold },
  dayCirclePast: { backgroundColor: colors.brownSecondary },
  dayCircleToday: { borderWidth: 1.5, borderColor: colors.maroon },
  dayCircleSelected: { backgroundColor: colors.maroon },
  dayText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.brown },
  dayTextOnEvent: { fontFamily: fonts.bodySemiBold, color: colors.white },
  dayTextSelected: { color: colors.white },
  legend: { flexDirection: "row", gap: spacing.lg, marginTop: spacing.sm },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.brownSecondary },
});
