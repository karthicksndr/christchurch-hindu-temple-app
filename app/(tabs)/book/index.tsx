import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ScreenBackground } from "../../../src/components/layout/ScreenBackground";
import { SectionTitle } from "../../../src/components/ui/SectionTitle";
import { ServiceCard } from "../../../src/components/feature/ServiceCard";
import { SERVICES } from "../../../src/data/services";
import { colors, spacing } from "../../../src/theme";
import { fonts } from "../../../src/theme/typography";

export default function BookServicesScreen() {
  const router = useRouter();

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => router.navigate("/")}
          style={styles.backRow}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Back to Home"
        >
          <ChevronLeft color={colors.brown} size={20} />
          <Text style={styles.backText}>Home</Text>
        </Pressable>
        <SectionTitle title="Book a service" subtitle="Reserve poojas and ceremonies" />
        <View style={styles.grid}>
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 48 },
  backRow: { flexDirection: "row", alignItems: "center", gap: 2, marginBottom: 10, alignSelf: "flex-start" },
  backText: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.brown },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
});
