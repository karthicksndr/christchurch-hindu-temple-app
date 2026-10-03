import { ScrollView, StyleSheet } from "react-native";
import { ScreenBackground } from "../../src/components/layout/ScreenBackground";
import { ScreenHeader } from "../../src/components/layout/ScreenHeader";
import { OmSlogan } from "../../src/components/feature/OmSlogan";
import { ImageCarousel } from "../../src/components/feature/ImageCarousel";
import { AddressCard } from "../../src/components/feature/AddressCard";
import { HoursCard } from "../../src/components/feature/HoursCard";
import { MenuGrid } from "../../src/components/feature/MenuGrid";
import { DonateCard } from "../../src/components/feature/DonateCard";
import { VideoFooter } from "../../src/components/feature/VideoFooter";
import { SectionTitle } from "../../src/components/ui/SectionTitle";

export default function HomeScreen() {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader />
        <OmSlogan />
        <ImageCarousel />
        <AddressCard />
        <HoursCard />
        <SectionTitle title="Explore" />
        <MenuGrid />
        <DonateCard />
        <VideoFooter />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 14, paddingBottom: 48 },
});
