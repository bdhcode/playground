import React from "react";
import NativebaseProvider from "./nativebase/NativebaseProvider";

const ContextProviders = (props) => {
  const { children } = props;
  return <NativebaseProvider>{children}</NativebaseProvider>;
};

export default ContextProviders;
