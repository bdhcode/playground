import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Flex, HStack, Text } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

const MaskedViewButtonScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex flex="1" bg="black" justifyContent="center" alignItems="center">
        <LinearGradient
          style={{ padding: 1 }}
          colors={["#CD03FF", "#5E3BF5", "#2633F5"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
          <Box bg="black">
            <MaskedView
              maskElement={
                <HStack
                  space="2"
                  w="100%"
                  h="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Entypo name="plus" size={24} color="black" />
                  <Text>Hello</Text>
                </HStack>
              }
            >
              <LinearGradient
                style={{ width: 150, height: 50, borderRadius: 10 }}
                colors={["#CD03FF", "#5E3BF5", "#2633F5"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
              />
            </MaskedView>
          </Box>
        </LinearGradient>
      </Flex>
    </SafeAreaView>
  );
};

export default MaskedViewButtonScreen;
