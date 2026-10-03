import { useEffect, useRef, useState } from "react";
import { View, Image, Text, Pressable, Animated, StyleSheet } from "react-native";
import { Bell } from "lucide-react-native";
import { colors, images } from "../../theme";
import { fonts } from "../../theme/typography";
import { TEMPLE } from "../../data/temple";

const TOOLTIP_VISIBLE_MS = 2200;
const FADE_MS = 150;

export function ScreenHeader() {
  const [showTooltip, setShowTooltip] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const onPressBell = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setShowTooltip(true);
    opacity.setValue(0);
    Animated.timing(opacity, { toValue: 1, duration: FADE_MS, useNativeDriver: true }).start();
    hideTimeoutRef.current = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: FADE_MS, useNativeDriver: true }).start(() => {
        setShowTooltip(false);
      });
    }, TOOLTIP_VISIBLE_MS);
  };

  return (
    <View style={styles.row}>
      <Image source={images.ganeshaMark} style={styles.logo} />
      <View style={styles.titleWrap}>
        <Text style={styles.title} numberOfLines={1}>
          {TEMPLE.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          & Culture Centre
        </Text>
      </View>
      <View>
        <Pressable onPress={onPressBell} hitSlop={10} accessibilityRole="button" accessibilityLabel="Notifications">
          <Bell color={colors.maroon} size={22} />
        </Pressable>
        {showTooltip && (
          <Animated.View style={[styles.tooltip, { opacity }]} pointerEvents="none">
            <View style={styles.tooltipNotch} />
            <Text style={styles.tooltipText}>No new notifications</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 34, height: 34, borderRadius: 17 },
  titleWrap: { flex: 1 },
  title: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.brown },
  subtitle: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.brownSecondary },
  tooltip: {
    position: "absolute",
    top: 34,
    right: -8,
    minWidth: 168,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: colors.brown,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    zIndex: 10,
  },
  tooltipNotch: {
    position: "absolute",
    top: -5,
    right: 14,
    width: 10,
    height: 10,
    backgroundColor: colors.white,
    transform: [{ rotate: "45deg" }],
  },
  tooltipText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.brown, textAlign: "center" },
});
