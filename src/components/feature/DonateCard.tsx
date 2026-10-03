import { View, Text, Pressable, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Heart, ExternalLink } from "lucide-react-native";
import { IconChip } from "../ui/IconChip";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";
import { TEMPLE } from "../../data/temple";

export function DonateCard() {
  return (
    <Pressable
      onPress={() => WebBrowser.openBrowserAsync(TEMPLE.donateUrl)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel="Donate now, opens the temple donation page"
    >
      <IconChip background={colors.gold} icon={<Heart color={colors.maroon} size={18} />} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>Donate now</Text>
        <Text style={styles.sub}>Support the temple project</Text>
      </View>
      <ExternalLink color={colors.white} size={18} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.maroon,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  pressed: { opacity: 0.92 },
  textWrap: { flex: 1 },
  title: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.white },
  sub: { fontFamily: fonts.bodyRegular, fontSize: 12, color: "#F0D9C9" },
});
