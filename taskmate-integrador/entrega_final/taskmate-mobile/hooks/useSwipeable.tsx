import React, { useState, useEffect } from "react";
import { StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { SwipeablePanel } from "rn-swipeable-panel";

interface SwipeableProps {
  children: React.ReactNode;
}

export const useSwipeable = () => {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    showCloseButton: false,
    onClose: () => closePanel(),
    noBar: false,
    onlySmall: true,
    smallPanelHeight: 540
  });

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  function SwipeComponent({ children }: SwipeableProps) {
    return (
      // @ts-ignore
      <SwipeablePanel
        key={1}
        {...panelProps}
        isActive={isPanelActive}
        style={{ marginBottom: 0 }}
        scrollViewProps={{
          style: {
            flex: 1,
          },
          contentContainerStyle: {
            flex: 1,
            justifyContent: 'flex-start',
            padding: 15,
            paddingTop: 0,
          }
        }}
      >
        {children}
      </SwipeablePanel>
    );
  }

  return {
    SwipeComponent,
    closePanel,
    openPanel,
    setPanelProps,
    isPanelActive,
  };
};
