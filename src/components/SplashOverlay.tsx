import { useEffect, useRef } from "react";
import { Animated, Image, Modal, StyleSheet, Text, View } from "react-native";
import { colors, images } from "../theme";
import { fonts } from "../theme/typography";
import { TEMPLE } from "../data/temple";

// Custom animated splash shown for ~3s after fonts are ready. The native
// splash (app.json) covers the brief gap before this mounts. Rendered in a
// Modal (its own native presentation layer) rather than an absolutely
// positioned View, since a plain sibling View could end up shorter than the
// full screen and leave the tab bar peeking out underneath.
export function SplashOverlay() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, [opacity]);

  return (
    <Modal visible animationType="none">
      <View style={styles.fill}>
        <Image source={images.splashBackground} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.splashOverlay }]} />
        <Animated.View style={[styles.center, { opacity }]}>
          <View style={styles.ring}>
            <Image source={images.ganeshaMark} style={styles.mark} />
          </View>
          <Text style={styles.eyebrow}>CHRISTCHURCH</Text>
          <Text style={styles.title}>Hindu Temple</Text>
          <Text style={styles.sub}>& Culture Centre</Text>
          <View style={styles.rule} />
          <Text style={styles.tagline}>{TEMPLE.slogan}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: colors.brown },
  // Anchored toward the bottom third, over the calmer marble facade in the
  // background photo, rather than dead-center where it would sit on top of
  // the temple's own ornate gold roofline.
  center: { flex: 1, alignItems: "center", justifyContent: "flex-end", gap: 6, paddingHorizontal: 40, paddingBottom: "16%" },
  ring: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: colors.gold,
    overflow: "hidden",
    marginBottom: 16,
  },
  mark: { width: "100%", height: "100%" },
  eyebrow: { fontFamily: fonts.bodySemiBold, fontSize: 12, letterSpacing: 4, color: colors.gold },
  title: { fontFamily: fonts.displayBold, fontSize: 32, color: colors.ivory, marginTop: 4 },
  sub: { fontFamily: fonts.displaySemiBold, fontSize: 15, color: colors.gold },
  rule: { width: 40, height: 1, backgroundColor: colors.gold, opacity: 0.6, marginVertical: 16 },
  tagline: {
    fontFamily: fonts.bodyRegular,
    fontStyle: "italic",
    fontSize: 13,
    color: "#D8CFC3",
    textAlign: "center",
  },
});
