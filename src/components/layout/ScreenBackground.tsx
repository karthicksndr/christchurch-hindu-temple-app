import { View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, images } from "../../theme";

type Props = {
  children: React.ReactNode;
  variant?: "light" | "dark";
};

// Wraps every screen with the blurred temple wallpaper. The overlay is tinted
// almost fully opaque so the photo reads as texture, not a distraction, while
// still satisfying "the wallpaper appears consistently throughout the app".
export function ScreenBackground({ children, variant = "light" }: Props) {
  const overlay = variant === "dark" ? colors.overlayDark : colors.overlayLight;
  const base = variant === "dark" ? colors.brown : colors.ivory;

  return (
    <View style={[styles.root, { backgroundColor: base }]}>
      <Image source={images.wallpaper} style={StyleSheet.absoluteFill} blurRadius={30} resizeMode="cover" />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: overlay }]} />
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
});
