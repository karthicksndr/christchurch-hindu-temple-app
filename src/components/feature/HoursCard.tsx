import { View, Text, StyleSheet } from "react-native";
import { Clock, Sun, Moon } from "lucide-react-native";
import { Card } from "../ui/Card";
import { IconChip } from "../ui/IconChip";
import { colors, spacing } from "../../theme";
import { fonts } from "../../theme/typography";
import { TEMPLE } from "../../data/temple";

function HoursGroup({ label, morning, evening }: { label: string; morning: string; evening: string }) {
  return (
    <View>
      <Text style={styles.groupLabel}>{label.toUpperCase()}</Text>
      <View style={styles.timeRow}>
        <Sun color={colors.gold} size={15} />
        <Text style={styles.timeText}>{morning}</Text>
      </View>
      <View style={styles.timeRow}>
        <Moon color={colors.gold} size={15} />
        <Text style={styles.timeText}>{evening}</Text>
      </View>
    </View>
  );
}

export function HoursCard() {
  return (
    <Card>
      <View style={styles.header}>
        <IconChip icon={<Clock color={colors.goldDeep} size={16} />} />
        <Text style={styles.title}>Temple hours</Text>
      </View>
      <HoursGroup
        label={TEMPLE.hours.weekday.label}
        morning={TEMPLE.hours.weekday.morning}
        evening={TEMPLE.hours.weekday.evening}
      />
      <View style={styles.divider} />
      <HoursGroup
        label={TEMPLE.hours.weekend.label}
        morning={TEMPLE.hours.weekend.morning}
        evening={TEMPLE.hours.weekend.evening}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md },
  title: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.brown },
  groupLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.goldDeep,
    marginBottom: 6,
  },
  timeRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: 5 },
  timeText: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.brown },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 10 },
});
