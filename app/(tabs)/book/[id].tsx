import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ScreenBackground } from "../../../src/components/layout/ScreenBackground";
import { BookingForm } from "../../../src/components/feature/BookingForm";
import { colors, spacing, radius } from "../../../src/theme";
import { fonts } from "../../../src/theme/typography";
import { SERVICES } from "../../../src/data/services";

export default function BookingFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return (
      <ScreenBackground>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={8} accessibilityRole="button" accessibilityLabel="Back">
            <ChevronLeft color={colors.brown} size={24} />
          </Pressable>
        </View>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8} accessibilityRole="button" accessibilityLabel="Back">
          <ChevronLeft color={colors.brown} size={24} />
        </Pressable>
        <Text style={styles.title} numberOfLines={2}>
          {service.title}
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>{service.description}</Text>
        {service.price !== undefined && (
          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>${service.price} NZD</Text>
          </View>
        )}
        <BookingForm service={service} />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  title: { flex: 1, fontFamily: fonts.displayBold, fontSize: 18, color: colors.brown, textAlign: "center" },
  content: { padding: 20, paddingTop: 4, gap: 16, paddingBottom: 48 },
  subtitle: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.brownSecondary },
  priceBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.cream,
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    marginTop: -8,
  },
  priceBadgeText: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.goldDeep },
});
