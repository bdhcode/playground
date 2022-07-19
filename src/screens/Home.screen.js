import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = (props) => {
  const { navigation } = props;
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top + 20 }]}>
      <Text style={styles.title}>Welcome to Ibra Playground</Text>
      <Text style={styles.subtitle}>List of exmaples</Text>
      <View style={styles.linksContainer}>
        <Link to="ImageSliderOne">Image slider #1</Link>
        <Link to="CountdownTimerScreen">Countdown timer</Link>
        <Link to="MaskScreen">Masked view</Link>
        <Link to="MaskedViewButtonScreen">Masked view button</Link>
      </View>
    </View>
  );
};

export default HomeScreen;

const Link = (props) => {
  const navigation = useNavigation();
  const { to, children } = props;
  return (
    <TouchableOpacity
      style={styles.linkWrapper}
      onPress={() => navigation.navigate(to)}
    >
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subtitle: { fontWeight: "600", fontSize: 17, paddingTop: 5 },
  linksContainer: {
    paddingTop: 30,
  },
  link: {
    fontSize: 25,
    fontWeight: "bold",
  },
  linkWrapper: {
    marginTop: 15,
  },
});
