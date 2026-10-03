import { Text, StyleSheet } from "react-native";
import { colors } from "../../theme";
import { fonts } from "../../theme/typography";
import { TEMPLE } from "../../data/temple";

export function OmSlogan() {
  return (
    <Text style={styles.text} accessibilityRole="header">
      ॐ {TEMPLE.slogan.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    letterSpacing: 1,
    color: colors.maroon,
  },
});
