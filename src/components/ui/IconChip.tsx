import { View, StyleSheet } from "react-native";
import { colors } from "../../theme";

type Props = {
  icon: React.ReactNode;
  background?: string;
  size?: number;
};

export function IconChip({ icon, background = colors.cream, size = 36 }: Props) {
  return (
    <View
      style={[
        styles.chip,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: background },
      ]}
    >
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
});
