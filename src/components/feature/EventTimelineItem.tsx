import { View, Text, StyleSheet } from "react-native";
import { Clock, MapPin, Check } from "lucide-react-native";
import { Card } from "../ui/Card";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";
import { EventItem } from "../../data/events";

function formatDateParts(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-NZ", { day: "2-digit" }),
    month: d.toLocaleDateString("en-NZ", { month: "short" }).toUpperCase(),
  };
}

type Props = { event: EventItem; completed?: boolean };

export function EventTimelineItem({ event, completed = false }: Props) {
  const { day, month } = formatDateParts(event.date);

  return (
    <View style={[styles.row, completed && styles.rowCompleted]}>
      <View style={[styles.dateBadge, completed && styles.dateBadgeCompleted]}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.month}>{month}</Text>
      </View>
      <Card style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, completed && styles.mutedText]}>{event.title}</Text>
          {completed && (
            <View style={styles.completedBadge}>
              <Check size={11} color={colors.white} />
              <Text style={styles.completedBadgeText}>Completed</Text>
            </View>
          )}
        </View>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Clock size={13} color={colors.brownSecondary} />
            <Text style={styles.metaText}>{event.time}</Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={13} color={colors.brownSecondary} />
            <Text style={styles.metaText}>{event.location}</Text>
          </View>
        </View>
        <Text style={[styles.desc, completed && styles.mutedText]}>{event.description}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: spacing.sm },
  rowCompleted: { opacity: 0.7 },
  dateBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  dateBadgeCompleted: { backgroundColor: colors.brownSecondary },
  day: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.white, lineHeight: 18 },
  month: { fontFamily: fonts.bodyMedium, fontSize: 11, color: colors.white, lineHeight: 13 },
  card: { flex: 1 },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm },
  title: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.brown, flexShrink: 1 },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: colors.brownSecondary,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  completedBadgeText: { fontFamily: fonts.bodySemiBold, fontSize: 10, color: colors.white },
  mutedText: { color: colors.brownSecondary },
  metaRow: { flexDirection: "row", gap: spacing.md, marginTop: 6, marginBottom: 6 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.brownSecondary },
  desc: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.brown, lineHeight: 17 },
});
