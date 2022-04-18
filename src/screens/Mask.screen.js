import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import MaskedView from "@react-native-masked-view/masked-view";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const MaskScreen = () => {
  const progress = React.useRef(new Animated.Value(0)).current;
  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  Animated.loop(
    Animated.sequence([
      Animated.timing(progress, {
        toValue: 1,
        timing: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 0,
        timing: 1500,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View
              style={{
                width: 200,
                height: 200,
                backgroundColor: "red",
                transform: [{ rotate }],
              }}
            />
          </View>
        }
      >
        <View style={{ flex: 1, backgroundColor: "red" }}>
          <Image
            source={{ uri: "https://wallpapercave.com/wp/wp4863775.jpg" }}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
          />
        </View>
      </MaskedView>
    </View>
  );
};

export default MaskScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
