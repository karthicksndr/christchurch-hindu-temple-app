import { useEffect, useRef, useState } from "react";
import { View, Image, FlatList, StyleSheet, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { colors, spacing, radius, images } from "../../theme";

const DATA = images.carousel;

export function ImageCarousel() {
  const { width } = useWindowDimensions();
  const slideWidth = width - spacing.lg * 2;
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % DATA.length;
        listRef.current?.scrollToOffset({ offset: next * slideWidth, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, [slideWidth]);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / slideWidth));
  };

  return (
    <View>
      <FlatList
        ref={listRef}
        data={DATA}
        keyExtractor={(item) => item.caption}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item }) => (
          <View style={{ width: slideWidth }}>
            <Image
              source={item.image}
              style={styles.slide}
              resizeMode="cover"
              accessible
              accessibilityLabel={item.caption}
            />
          </View>
        )}
      />
      <View style={styles.dots}>
        {DATA.map((item, i) => (
          <View key={item.caption} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: { width: "100%", height: 160, borderRadius: radius.md },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: spacing.sm },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.cream },
  dotActive: { width: 16, backgroundColor: colors.gold },
});
