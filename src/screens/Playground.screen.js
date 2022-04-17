import { StyleSheet, View, PanResponder } from "react-native";
import React, { useRef } from "react";
import CloseScreenButton from "../components/CloseScreenButton";

const PlaygroundScreen = () => {
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, dgestureState) => true,
      onPanResponderMove(_, gs) {
        console.log("gestureState : ", gs);
      },
    })
  ).current;
  return (
    <View style={styles.container}>
      <CloseScreenButton />
      <View
        style={{ backgroundColor: "red", height: "50%" }}
        {...pan.panHandlers}
      />
    </View>
  );
};

export default PlaygroundScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
});
