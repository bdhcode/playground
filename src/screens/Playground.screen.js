import {
  StyleSheet,
  View,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  Pressable,
  Easing,
} from "react-native";
import React from "react";
import CloseScreenButton from "../components/CloseScreenButton";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const PLAY_BUTTON_SIZE = 60;
const PLAY_ICON_SIZE = 35;
const PLAY_BUTTON_BOTTOM_OFFSET = 50;
const BACKDROP_SIZE = SCREEN_WIDTH;
const HIDE_BUTTON_OFFSET = PLAY_BUTTON_SIZE + PLAY_BUTTON_BOTTOM_OFFSET;
const PlaygroundScreen = () => {
  const progress = React.useRef(new Animated.Value(0)).current;
  const playTranslateY = React.useRef(new Animated.Value(0)).current;
  const pauseTranslateY = React.useRef(
    new Animated.Value(HIDE_BUTTON_OFFSET)
  ).current;
  const onPlay = () => {
    Animated.timing(playTranslateY, {
      toValue: HIDE_BUTTON_OFFSET,
      duration: 500,
      easing: Easing.back(3),
      useNativeDriver: false,
    }).start();
    Animated.timing(pauseTranslateY, {
      toValue: 0,
      duration: 500,
      easing: Easing.back(3),
      useNativeDriver: false,
    }).start();
    Animated.timing(progress, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const onPause = () => {
    Animated.timing(playTranslateY, {
      toValue: 0,
      duration: 500,
      easing: Easing.back(3),
      useNativeDriver: false,
    }).start();
    Animated.timing(pauseTranslateY, {
      toValue: HIDE_BUTTON_OFFSET,
      duration: 500,
      easing: Easing.back(3),
      useNativeDriver: false,
    }).start();

    Animated.timing(progress, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const onReset = () => {
    progress.setValue(0);
    pauseTranslateY.setValue(0);
    pauseTranslateY.setValue(HIDE_BUTTON_OFFSET);
  };

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  return (
    <Animated.View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity
        onPress={onReset}
        style={{ position: "absolute", top: 100, left: 100 }}
      >
        <Text>Reset</Text>
      </TouchableOpacity>

      <Text style={styles.durationText}>20s</Text>

      <View style={{ flex: 1 }}>
        <CloseScreenButton />
        {/* PAUSE BUTTON */}
        <Animated.View
          style={[
            styles.playButtonWrapper,
            {
              transform: [
                { translateY: pauseTranslateY },
                {
                  rotate: pauseTranslateY.interpolate({
                    inputRange: [0, HIDE_BUTTON_OFFSET],
                    outputRange: ["0deg", "180deg"],
                    useNativeDriver: false,
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable
            onPress={onPause}
            style={[styles.button, styles.pauseButton]}
          >
            <FontAwesome name="pause" size={24} color="#a80b00" />
          </Pressable>
        </Animated.View>
        {/* PLAY BUTTON */}
        <Animated.View
          style={[
            styles.playButtonWrapper,
            {
              transform: [
                {
                  translateY: playTranslateY,
                },
                {
                  rotate: playTranslateY.interpolate({
                    inputRange: [0, HIDE_BUTTON_OFFSET],
                    outputRange: ["0deg", "180deg"],
                    useNativeDriver: false,
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable
            onPress={onPlay}
            style={[styles.button, styles.playButton]}
          >
            <Entypo
              name="controller-play"
              size={PLAY_ICON_SIZE}
              color="#ffeeed"
            />
          </Pressable>
        </Animated.View>
        <Animated.View
          style={[styles.backdropCircle, { transform: [{ scale }] }]}
        />
      </View>
    </Animated.View>
  );
};

export default PlaygroundScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffc3bf" },
  playButtonWrapper: {
    position: "absolute",
    bottom: PLAY_BUTTON_BOTTOM_OFFSET,
    left: SCREEN_WIDTH / 2 - PLAY_BUTTON_SIZE / 2,
  },
  button: {
    width: PLAY_BUTTON_SIZE,
    height: PLAY_BUTTON_SIZE,
    borderRadius: PLAY_BUTTON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  playButton: {
    borderColor: "#b51f14",
    backgroundColor: "#ed5045",
  },
  pauseButton: {
    borderColor: "#ffcfcc",
    backgroundColor: "#ffc3bf",
  },
  backdropCircle: {
    position: "absolute",
    left: SCREEN_WIDTH / 2 - BACKDROP_SIZE / 2,
    width: BACKDROP_SIZE,
    height: BACKDROP_SIZE,
    borderRadius: BACKDROP_SIZE / 2,
    backgroundColor: "#b51f14",
    bottom: -BACKDROP_SIZE / 2,
    zIndex: -1,
  },
  durationText: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.2,
    fontSize: 70,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },
});
