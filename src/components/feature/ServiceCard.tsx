import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Flower2, Car, Lamp, Droplet, Moon, Sunset, Home, Heart, ExternalLink } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { IconChip } from "../ui/IconChip";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";
import { Service, ServiceIcon } from "../../data/services";

const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  flower: Flower2,
  car: Car,
  lamp: Lamp,
  droplet: Droplet,
  moon: Moon,
  sunset: Sunset,
  home: Home,
  heart: Heart,
};

export function ServiceCard({ service }: { service: Service }) {
  const router = useRouter();
  const Icon = SERVICE_ICONS[service.icon];
  const isExternal = Boolean(service.externalUrl);

  const onPress = () => {
    if (service.externalUrl) {
      WebBrowser.openBrowserAsync(service.externalUrl);
    } else if (service.formFields) {
      router.push(`/book/${service.id}` as never);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={service.title}
    >
      {isExternal && (
        <View style={styles.externalBadge}>
          <ExternalLink color={colors.brownSecondary} size={13} />
        </View>
      )}
      <IconChip background={colors.gold} icon={<Icon color={colors.white} size={22} />} size={48} />
      <Text style={styles.title} numberOfLines={2}>
        {service.title}
      </Text>
      {service.price !== undefined && <Text style={styles.price}>${service.price} NZD</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47.5%",
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: "center",
    gap: 8,
    minHeight: 116,
    justifyContent: "center",
  },
  pressed: { opacity: 0.9 },
  title: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.brown, textAlign: "center" },
  price: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.goldDeep },
  externalBadge: { position: "absolute", top: 10, right: 10 },
});
