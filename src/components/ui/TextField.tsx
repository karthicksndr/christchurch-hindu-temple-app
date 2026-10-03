import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";

type Props = TextInputProps & {
  label: string;
};

export function TextField({ label, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.brownSecondary}
        accessibilityLabel={label}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.brown },
  input: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    color: colors.brown,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
});
