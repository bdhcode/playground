import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Animated, Image, Dimensions } from "react-native";
import { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CloseScreenButton from "../components/CloseScreenButton";

const PHOTO_1 =
  "https://cdn.dribbble.com/users/3281732/screenshots/8159457/media/9e7bfb83b0bd704e941baa7a44282b22.jpg";
const PHOTO_2 =
  "https://cdn.dribbble.com/users/3281732/screenshots/10789882/media/a2b6545f0310ef683389c8d3e6b28ef7.jpg";
const PHOTO_3 =
  "https://cdn.dribbble.com/users/3281732/screenshots/11316887/media/04a562c9c0e49285e72e07709ccadafc.jpg";
const PHOTO_4 =
  "https://cdn.dribbble.com/users/3281732/screenshots/10894258/media/3ffd02264f4d48953b19515c383ce9e3.jpg";

const DATA = [PHOTO_1, PHOTO_2, PHOTO_3, PHOTO_4];

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const ImageSliderOne = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { top } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {DATA.map((uri, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * WINDOW_WIDTH,
              index * WINDOW_WIDTH,
              (index + 1) * WINDOW_WIDTH,
            ],
            outputRange: [0, 1, 1],
            extrapolate: "clamp",
          });

          return (
            <Animated.Image
              source={{ uri }}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              key={`image-${uri}`}
              blurRadius={10}
            />
          );
        })}
      </View>
      <Animated.FlatList
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        pagingEnabled
        data={DATA}
        style={styles.list}
        horizontal
        bounces={false}
        keyExtractor={(item) => item}
        renderItem={({ item: uri, index }) => {
          const inputRange = [
            (index - 1) * WINDOW_WIDTH,
            index * WINDOW_WIDTH,
            (index + 1) * WINDOW_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1.1, 0.7],
            extrapolate: "clamp",
          });

          const elevation = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.itemContainer,
                { transform: [{ scale: scale }] },
                { elevation },
              ]}
            >
              <Image
                key={`image-${uri}`}
                source={{ uri }}
                style={styles.image}
              />
            </Animated.View>
          );
        }}
      />
      <CloseScreenButton />
    </View>
  );
};

export default ImageSliderOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: { flex: 1 },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: WINDOW_WIDTH,
  },
  image: {
    width: WINDOW_WIDTH * 0.6,
    height: WINDOW_HEIGHT / 2,
    borderRadius: 20,
  },
});
