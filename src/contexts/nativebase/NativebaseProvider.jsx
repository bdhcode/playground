import React from "react";
import { NativeBaseProvider } from "native-base";

const NativebaseProvider = (props) => {
  const { children } = props;

  return <NativeBaseProvider>{children}</NativeBaseProvider>;
};

export default NativebaseProvider;
