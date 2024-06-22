import React from "react";
import { HStack, Spinner } from "native-base";

const Loading = () => {
  return (
    <HStack flex={1} space={8} justifyContent="center" alignItems="center">
      <Spinner size="lg" />
    </HStack>
  );
};

export default Loading;
