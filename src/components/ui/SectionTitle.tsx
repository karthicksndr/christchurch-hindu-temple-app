import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme";
import { fonts } from "../../theme/typography";

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 4 },
  title: { fontFamily: fonts.displayBold, fontSize: 24, color: colors.brown },
  subtitle: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.brownSecondary, marginTop: 2 },
});
