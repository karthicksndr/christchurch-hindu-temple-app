import { useEffect, useRef } from "react";
import { Modal, View, Text, Pressable, Animated, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  onDismiss: () => void;
};

export function SuccessOverlay({ visible, title, message, onDismiss }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    if (!visible) return;
    opacity.setValue(0);
    scale.setValue(0.85);
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 7, tension: 90, useNativeDriver: true }),
    ]).start();
    const timer = setTimeout(onDismiss, 2600);
    return () => clearTimeout(timer);
  }, [visible, opacity, scale, onDismiss]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onDismiss}>
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
          <View style={styles.iconRing}>
            <Check color={colors.white} size={30} strokeWidth={3} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(46,33,25,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  card: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: colors.ivory,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    gap: 10,
  },
  iconRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: { fontFamily: fonts.displayBold, fontSize: 19, color: colors.brown, textAlign: "center" },
  message: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.brownSecondary,
    textAlign: "center",
    lineHeight: 19,
  },
});
