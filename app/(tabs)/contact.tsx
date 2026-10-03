import { View, Text, Pressable, Linking, ScrollView, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { MapPin, Clock, Navigation, Mail, Globe, MessageCircle, Users } from "lucide-react-native";
import { ScreenBackground } from "../../src/components/layout/ScreenBackground";
import { SectionTitle } from "../../src/components/ui/SectionTitle";
import { Card } from "../../src/components/ui/Card";
import { IconChip } from "../../src/components/ui/IconChip";
import { ContactPersonCard } from "../../src/components/feature/ContactPersonCard";
import { EnquiryForm } from "../../src/components/feature/EnquiryForm";
import { colors, spacing, radius } from "../../src/theme";
import { fonts } from "../../src/theme/typography";
import { TEMPLE } from "../../src/data/temple";

export default function ContactScreen() {
  const openMaps = () => Linking.openURL(TEMPLE.mapsUrl);
  const openEmail = () => Linking.openURL(`mailto:${TEMPLE.email}`);
  const openWebsite = () => WebBrowser.openBrowserAsync(TEMPLE.websiteUrl);
  const openWhatsapp = () => Linking.openURL(TEMPLE.whatsappGroupUrl);
  const openFacebook = () => Linking.openURL(TEMPLE.facebookGroupUrl);

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title="Contact us" />

        <Card style={styles.row}>
          <IconChip icon={<MapPin color={colors.goldDeep} size={16} />} />
          <Text style={styles.text}>
            {TEMPLE.address.line1}, {TEMPLE.address.line2}, {TEMPLE.address.line3}
          </Text>
          <Pressable onPress={openMaps} hitSlop={8} accessibilityRole="button" accessibilityLabel="Get directions">
            <Navigation color={colors.goldDeep} size={16} />
          </Pressable>
        </Card>

        <Card style={styles.row}>
          <IconChip icon={<Clock color={colors.goldDeep} size={16} />} />
          <Text style={styles.text}>
            {TEMPLE.contactHours.label}: {TEMPLE.contactHours.value}
          </Text>
        </Card>

        {TEMPLE.contacts.map((contact) => (
          <ContactPersonCard key={contact.name} contact={contact} />
        ))}

        <View style={styles.actionsGrid}>
          <View style={styles.actionsRow}>
            <Pressable onPress={openEmail} style={styles.actionCard} accessibilityRole="button" accessibilityLabel="Email the temple">
              <Mail color={colors.goldDeep} size={18} />
              <Text style={styles.actionText}>Email</Text>
            </Pressable>
            <Pressable onPress={openWebsite} style={styles.actionCard} accessibilityRole="button" accessibilityLabel="Open temple website">
              <Globe color={colors.goldDeep} size={18} />
              <Text style={styles.actionText}>Website</Text>
            </Pressable>
          </View>
          <View style={styles.actionsRow}>
            <Pressable onPress={openWhatsapp} style={styles.actionCard} accessibilityRole="button" accessibilityLabel="Join the WhatsApp group">
              <MessageCircle color={colors.goldDeep} size={18} />
              <Text style={styles.actionText}>WhatsApp</Text>
            </Pressable>
            <Pressable onPress={openFacebook} style={styles.actionCard} accessibilityRole="button" accessibilityLabel="Join the Facebook group">
              <Users color={colors.goldDeep} size={18} />
              <Text style={styles.actionText}>Facebook</Text>
            </Pressable>
          </View>
        </View>

        <SectionTitle title="Send an enquiry" subtitle="We'll get back to you by email" />
        <Card>
          <EnquiryForm />
        </Card>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 12, paddingBottom: 48 },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  text: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.brown },
  actionsGrid: { gap: spacing.sm },
  actionsRow: { flexDirection: "row", gap: spacing.sm },
  actionCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
  },
  actionText: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.brown },
});
