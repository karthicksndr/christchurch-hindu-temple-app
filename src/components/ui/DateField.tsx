import { useState } from "react";
import { View, Text, Pressable, Modal, Platform, StyleSheet } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";

type Props = {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  minimumDate?: Date;
};

export function DateField({ label, value, onChange, minimumDate }: Props) {
  const [show, setShow] = useState(false);

  const displayText = value
    ? value.toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" })
    : "Pick a date";

  const handleChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") setShow(false);
    if (event.type === "dismissed" || !selected) return;
    onChange(selected);
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        onPress={() => setShow(true)}
        style={styles.field}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <Calendar size={16} color={colors.goldDeep} />
        <Text style={[styles.value, !value && styles.placeholder]}>{displayText}</Text>
      </Pressable>

      {show && Platform.OS === "android" && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="default"
          minimumDate={minimumDate}
          onChange={handleChange}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal visible={show} transparent animationType="slide" onRequestClose={() => setShow(false)}>
          <Pressable style={styles.backdrop} onPress={() => setShow(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Pressable onPress={() => setShow(false)} hitSlop={8}>
                <Text style={styles.done}>Done</Text>
              </Pressable>
            </View>
            <DateTimePicker
              value={value ?? new Date()}
              mode="date"
              display="inline"
              minimumDate={minimumDate}
              onChange={handleChange}
              accentColor={colors.gold}
              themeVariant="light"
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.brown },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  value: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.brown },
  placeholder: { color: colors.brownSecondary },
  backdrop: { flex: 1, backgroundColor: "rgba(46,33,25,0.4)" },
  sheet: { backgroundColor: colors.ivory, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  done: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.maroon },
});
