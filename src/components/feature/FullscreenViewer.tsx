import { View, FlatList, Modal, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { X } from "lucide-react-native";
import { ZoomableImage } from "./ZoomableImage";

type Item = { id: string; image: number; caption: string; height: number };

type Props = {
  items: Item[];
  initialIndex: number;
  onClose: () => void;
};

export function FullscreenViewer({ items, initialIndex, onClose }: Props) {
  const { width, height } = useWindowDimensions();

  return (
    <Modal visible animationType="fade" onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable onPress={onClose} style={styles.close} accessibilityRole="button" accessibilityLabel="Close">
          <X color="#fff" size={24} />
        </Pressable>
        <FlatList
          data={items}
          horizontal
          pagingEnabled
          initialScrollIndex={initialIndex}
          getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width, height, alignItems: "center", justifyContent: "center" }}>
              <ZoomableImage source={item.image} width={width} height={height * 0.8} />
            </View>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  close: {
    position: "absolute",
    top: 56,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
});
