import { Text, Pressable, Linking, StyleSheet } from "react-native";
import { MapPin, Navigation } from "lucide-react-native";
import { Card } from "../ui/Card";
import { IconChip } from "../ui/IconChip";
import { colors, spacing } from "../../theme";
import { fonts } from "../../theme/typography";
import { TEMPLE } from "../../data/temple";

export function AddressCard() {
  const openMaps = () => Linking.openURL(TEMPLE.mapsUrl);

  return (
    <Card style={styles.row}>
      <IconChip icon={<MapPin color={colors.goldDeep} size={16} />} />
      <Text style={styles.text}>
        {TEMPLE.address.line1}, {TEMPLE.address.line2}, {TEMPLE.address.line3}
      </Text>
      <Pressable onPress={openMaps} hitSlop={8} accessibilityRole="button" accessibilityLabel="Get directions">
        <Navigation color={colors.goldDeep} size={16} />
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  text: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.brown },
});
