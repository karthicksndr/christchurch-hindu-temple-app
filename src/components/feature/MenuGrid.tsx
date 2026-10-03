import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { CalendarDays, Hand, Sun, Image as ImageIcon, ChevronRight, ExternalLink } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { IconChip } from "../ui/IconChip";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";
import { MENU_ITEMS, MenuIcon, MenuItem } from "../../data/menu";

const MENU_ICONS: Record<MenuIcon, LucideIcon> = {
  "calendar-days": CalendarDays,
  hand: Hand,
  sun: Sun,
  image: ImageIcon,
};

function MenuRow({ item }: { item: MenuItem }) {
  const router = useRouter();
  const Icon = MENU_ICONS[item.icon];
  const isExternal = Boolean(item.externalUrl);

  const onPress = () => {
    if (item.externalUrl) {
      WebBrowser.openBrowserAsync(item.externalUrl);
    } else if (item.route) {
      router.push(item.route as never);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      <IconChip background={colors.gold} icon={<Icon color={colors.white} size={20} />} size={44} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
      {isExternal ? (
        <ExternalLink color={colors.brownSecondary} size={18} />
      ) : (
        <ChevronRight color={colors.brownSecondary} size={18} />
      )}
    </Pressable>
  );
}

export function MenuGrid() {
  return (
    <View style={styles.column}>
      {MENU_ITEMS.map((item) => (
        <MenuRow key={item.id} item={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.sm },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  pressed: { opacity: 0.9 },
  textWrap: { flex: 1 },
  title: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.brown },
  desc: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.brownSecondary, marginTop: 2 },
});
