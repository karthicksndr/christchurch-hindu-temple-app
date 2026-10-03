import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme";
import { fonts } from "../../theme/typography";

type Props = {
  initials: string;
  background?: string;
  color?: string;
  size?: number;
};

export function Avatar({ initials, background = colors.maroon, color = colors.white, size = 36 }: Props) {
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: background },
      ]}
    >
      <Text style={[styles.text, { color, fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: "center", justifyContent: "center", flexShrink: 0 },
  text: { fontFamily: fonts.bodySemiBold },
});
