import { View, Text, Pressable, Linking, StyleSheet } from "react-native";
import { Phone } from "lucide-react-native";
import { Card } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";

type Contact = { name: string; phone: string; initials: string };

export function ContactPersonCard({ contact }: { contact: Contact }) {
  const call = () => Linking.openURL(`tel:${contact.phone.replace(/\s/g, "")}`);

  return (
    <Card style={styles.row}>
      <Avatar initials={contact.initials} background={colors.gold} color={colors.brown} />
      <View style={styles.textWrap}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      <Pressable
        onPress={call}
        style={({ pressed }) => [styles.callBtn, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={`Call ${contact.name}`}
      >
        <Phone color={colors.white} size={14} />
        <Text style={styles.callText}>Call</Text>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  textWrap: { flex: 1 },
  name: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.brown },
  phone: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.brownSecondary },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: { opacity: 0.85 },
  callText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.white },
});
