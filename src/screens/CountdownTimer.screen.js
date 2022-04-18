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
  FlatList,
  TextInput,
} from "react-native";
import React from "react";
import CloseScreenButton from "../components/CloseScreenButton";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";

const AnimatedTO = Animated.createAnimatedComponent(Pressable);
const AnimatedTI = Animated.createAnimatedComponent(TextInput);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const PRIMARY_COLOR = "#143F6B";
const SECONDARY_COLOR = "#F55353";
const THIRD_COLOR = "#FEB139";
const FOURTH_COLOR = "#F6F54D";
const CONTROLE_ICONS_COLOR = "white";
const CONTROLE_BUTTON_WIDTH = 70;
const CONTROLE_BUTTON_BOTTOM_OFFSET = 50;
const CONTROLE_BUTTONS_SPACING = CONTROLE_BUTTON_WIDTH - 10;
const CONTROLE_BUTTON_TRANSLATE_Y_HIDE =
  CONTROLE_BUTTON_WIDTH + CONTROLE_BUTTON_BOTTOM_OFFSET;
const DURATION_ITEM_WIDTH = SCREEN_WIDTH / 3;
const DURATION_ITEM_SPACING = (SCREEN_WIDTH - DURATION_ITEM_WIDTH) / 2;
const DURATIONS_LIST_TOP_OFFSET = SCREEN_HEIGHT / 5;
const PRESS_TO_PLAY_TOP_OFFSET = SCREEN_HEIGHT / 2.5;
const DURATIONS = new Array(13)
  .fill(null)
  .map((_, index) => (index === 0 ? 1 : index * 5));

const CountdownTimerScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const listRef = React.useRef();
  const [activeIndex, setActiveIndex] = React.useState(DURATIONS[0]);
  const playButtonTranslateY = React.useRef(new Animated.Value(0)).current;
  const pauseButtonTranslateY = React.useRef(
    new Animated.Value(CONTROLE_BUTTON_TRANSLATE_Y_HIDE)
  ).current;
  const stopButtonTranslateY = React.useRef(
    new Animated.Value(CONTROLE_BUTTON_TRANSLATE_Y_HIDE)
  ).current;
  const backdropTranslateY = React.useRef(
    new Animated.Value(SCREEN_HEIGHT)
  ).current;
  const backdropBorderRadius = React.useRef(
    new Animated.Value(SCREEN_WIDTH)
  ).current;
  const listOpacity = React.useRef(new Animated.Value(1)).current;
  const counterOpacity = React.useRef(new Animated.Value(0)).current;
  const counterValue = React.useRef(new Animated.Value(DURATIONS[0])).current;
  const pressToPlayScale = React.useRef(new Animated.Value(0)).current;
  const pressToPlayOpacity = React.useRef(new Animated.Value(0)).current;
  const currentAnimation = React.useRef();
  const inputRef = React.useRef();

  React.useEffect(() => {
    const scrollListener = scrollX.addListener(({ value }) => {
      setActiveIndex(Math.ceil(value / DURATION_ITEM_WIDTH));
    });

    const counterListener = counterValue.addListener(({ value }) => {
      if (inputRef.current?.setNativeProps) {
        inputRef.current.setNativeProps({
          text: Math.round(value).toString(),
        });
      }
    });

    return () => {
      scrollX.removeListener(scrollListener);
      counterValue.removeListener(counterListener);
    };
  }, []);

  const startCounter = React.useCallback(() => {
    currentAnimation.current = Animated.sequence([
      Animated.parallel([
        Animated.timing(playButtonTranslateY, {
          toValue: CONTROLE_BUTTON_TRANSLATE_Y_HIDE,
          duration: 300,
          easing: Easing.back(1),
          useNativeDriver: true,
        }),
        Animated.stagger(100, [
          Animated.spring(stopButtonTranslateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(pauseButtonTranslateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.stagger(150, [
          Animated.timing(backdropTranslateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(backdropBorderRadius, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(listOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(counterOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(counterValue, {
          toValue: 0,
          duration: DURATIONS[activeIndex] * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(backdropTranslateY, {
          toValue: SCREEN_HEIGHT,
          duration: DURATIONS[activeIndex] * 1000,
          useNativeDriver: true,
        }),
      ]),
    ]);

    currentAnimation.current.start(({ finished }) => {
      if (finished) {
        resetCounter();
      }
    });
  }, [activeIndex]);

  const getResetAnimation = React.useCallback(() => {
    return Animated.parallel([
      Animated.sequence([
        Animated.stagger(100, [
          Animated.timing(pauseButtonTranslateY, {
            toValue: CONTROLE_BUTTON_TRANSLATE_Y_HIDE,
            duration: 300,
            easing: Easing.back(1),
            useNativeDriver: true,
          }),
          Animated.timing(stopButtonTranslateY, {
            toValue: CONTROLE_BUTTON_TRANSLATE_Y_HIDE,
            duration: 300,
            easing: Easing.back(1),
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(playButtonTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(counterOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);
  }, []);

  const resetCounter = React.useCallback(() => {
    backdropBorderRadius.setValue(SCREEN_WIDTH);
    return getResetAnimation().start();
  }, [getResetAnimation]);

  const onStart = React.useCallback(() => {
    counterValue.setValue(DURATIONS[activeIndex]);
    startCounter();
  }, [activeIndex, startCounter]);

  const onPause = React.useCallback(() => {
    if (currentAnimation.current?.stop) {
      currentAnimation.current.stop();
    }
    Animated.parallel([
      Animated.timing(pressToPlayScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pressToPlayOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onStop = React.useCallback(() => {
    Animated.parallel([
      getResetAnimation(),
      Animated.timing(backdropTranslateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropBorderRadius, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [getResetAnimation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View
        style={[
          styles.backdrop,
          {
            transform: [{ translateY: backdropTranslateY }],
            borderTopLeftRadius: backdropBorderRadius,
            borderTopRightRadius: backdropBorderRadius,
          },
        ]}
      />
      <AnimatedTO
        onPress={onStart}
        style={[
          styles.playButton,
          styles.button,
          { transform: [{ translateY: playButtonTranslateY }] },
        ]}
      />
      <AnimatedTO
        onPress={onPause}
        style={[
          styles.pauseButton,
          styles.button,
          { transform: [{ translateY: pauseButtonTranslateY }] },
        ]}
      >
        <FontAwesome name="pause" size={24} color={CONTROLE_ICONS_COLOR} />
      </AnimatedTO>
      <AnimatedTO
        onPress={onStop}
        style={[
          styles.stopButton,
          styles.button,
          { transform: [{ translateY: stopButtonTranslateY }] },
        ]}
      >
        <FontAwesome name="stop" size={24} color={CONTROLE_ICONS_COLOR} />
      </AnimatedTO>
      <AnimatedTI
        ref={inputRef}
        editable={false}
        style={[
          styles.durationText,
          styles.counterStyle,
          {
            opacity: counterOpacity,
          },
        ]}
        defaultValue={DURATIONS[activeIndex].toString()}
      />
      <Animated.FlatList
        ref={listRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        data={DURATIONS}
        horizontal
        scrollEventThrottle={16}
        style={[styles.list, { opacity: listOpacity }]}
        contentContainerStyle={styles.listContentContainerStyles}
        pagingEnabled
        bounces={false}
        snapToInterval={DURATION_ITEM_WIDTH}
        decelerationRate="fast"
        keyExtractor={(item) => `duration-${item}`}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * DURATION_ITEM_WIDTH,
            index * DURATION_ITEM_WIDTH,
            (index + 1) * DURATION_ITEM_WIDTH,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
          });
          return (
            <AnimatedTO
              onPress={() => {
                listRef.current?.scrollToIndex({
                  index,
                  viewPosition: 0.5,
                });
              }}
              disabled={activeIndex === index}
              style={styles.durationWrapper}
            >
              <Animated.Text
                style={[
                  styles.durationText,
                  { opacity, transform: [{ scale }] },
                ]}
              >
                {item}
              </Animated.Text>
            </AnimatedTO>
          );
        }}
      />
      <CloseScreenButton />
      <Animated.View
        style={[
          styles.pressToPlay,
          { transform: [{ scale: pressToPlayScale }] },
        ]}
      >
        <FontAwesome
          name="play"
          size={200}
          color="white"
          style={styles.pressToPlayIcon}
        />
        {/* <Text style={styles.pressToPlayText}>Press to play</Text> */}
      </Animated.View>
    </View>
  );
};

export default CountdownTimerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_COLOR },
  button: {
    zIndex: 100,
    width: CONTROLE_BUTTON_WIDTH,
    height: CONTROLE_BUTTON_WIDTH,
    borderRadius: CONTROLE_BUTTON_WIDTH / 2,
    bottom: CONTROLE_BUTTON_BOTTOM_OFFSET,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    backgroundColor: SECONDARY_COLOR,
    alignSelf: "center",
  },
  pauseButton: {
    backgroundColor: THIRD_COLOR,
    left:
      SCREEN_WIDTH / 2 - CONTROLE_BUTTON_WIDTH / 2 - CONTROLE_BUTTONS_SPACING,
  },
  stopButton: {
    backgroundColor: THIRD_COLOR,
    left:
      SCREEN_WIDTH / 2 - CONTROLE_BUTTON_WIDTH / 2 + CONTROLE_BUTTONS_SPACING,
  },
  durationWrapper: {
    width: DURATION_ITEM_WIDTH,
    alignItems: "center",
  },
  durationText: {
    color: "white",
    fontSize: 80,
    fontWeight: "600",
  },
  listContentContainerStyles: {
    paddingHorizontal: DURATION_ITEM_SPACING,
    marginTop: DURATIONS_LIST_TOP_OFFSET,
  },
  list: { flexGrow: 0 },
  backdrop: {
    zIndex: -1,
    position: "absolute",
    width: SCREEN_WIDTH * 2,
    height: SCREEN_HEIGHT,
    backgroundColor: SECONDARY_COLOR,
    alignSelf: "center",
  },
  counterStyle: {
    position: "absolute",
    alignSelf: "center",
    top: DURATIONS_LIST_TOP_OFFSET,
  },
  pressToPlay: {
    position: "absolute",
    top: PRESS_TO_PLAY_TOP_OFFSET,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  pressToPlayIcon: { opacity: 0.7 },
  pressToPlayText: { paddingTop: 10, color: "white", opacity: 0.7 },
});
