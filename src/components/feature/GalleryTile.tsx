import { Image, Text, Pressable, StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../theme";
import { fonts } from "../../theme/typography";

type Item = { id: string; image: number; caption: string; height: number };

export function GalleryTile({ item, onPress }: { item: Item; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.wrap}
      accessibilityRole="button"
      accessibilityLabel={`Open photo: ${item.caption}`}
    >
      <Image source={item.image} style={[styles.image, { height: item.height }]} resizeMode="cover" />
      <Text style={styles.caption} numberOfLines={1}>
        {item.caption}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.sm },
  image: { width: "100%", borderRadius: radius.md, backgroundColor: colors.cream },
  caption: {
    marginTop: 4,
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.brownSecondary,
  },
});
