import { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { X, Search } from "lucide-react-native";
import { ScreenBackground } from "../src/components/layout/ScreenBackground";
import { GalleryTile } from "../src/components/feature/GalleryTile";
import { FullscreenViewer } from "../src/components/feature/FullscreenViewer";
import { colors, spacing, images } from "../src/theme";
import { fonts } from "../src/theme/typography";

const GALLERY = images.gallery;

export default function GalleryScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const left = GALLERY.filter((_, i) => i % 2 === 0);
  const right = GALLERY.filter((_, i) => i % 2 === 1);

  return (
    <ScreenBackground>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8} accessibilityRole="button" accessibilityLabel="Close gallery">
          <X color={colors.brown} size={22} />
        </Pressable>
        <Text style={styles.title}>Gallery</Text>
        <Search color={colors.maroon} size={20} />
      </View>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        <View style={styles.col}>
          {left.map((item) => (
            <GalleryTile key={item.id} item={item} onPress={() => setActiveIndex(GALLERY.indexOf(item))} />
          ))}
        </View>
        <View style={styles.col}>
          {right.map((item) => (
            <GalleryTile key={item.id} item={item} onPress={() => setActiveIndex(GALLERY.indexOf(item))} />
          ))}
        </View>
      </ScrollView>
      {activeIndex !== null && (
        <FullscreenViewer items={GALLERY} initialIndex={activeIndex} onClose={() => setActiveIndex(null)} />
      )}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  title: { fontFamily: fonts.displayBold, fontSize: 20, color: colors.brown },
  grid: { flexDirection: "row", gap: spacing.sm, padding: 20, paddingTop: 4 },
  col: { flex: 1, gap: spacing.sm },
});
