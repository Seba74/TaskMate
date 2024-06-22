import React, { ReactNode } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const CanvasView = ({ children }: { children: ReactNode }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0.5);

  const panGesture = Gesture.Pan().onUpdate((e) => {
    translateX.value += e.translationX / scale.value;
    translateY.value += e.translationY / scale.value;
  });

  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
    scale.value = Math.min(Math.max(e.scale, 0.5), 0.96); // Limitar el zoom entre 0.5x y 3x
  });

  const animatedStyle = useAnimatedStyle(() => {
    // Calcular límites para el desplazamiento basado en el tamaño del canvas y la escala
    const maxTranslateX = (width * scale.value - width) / 100;
    const maxTranslateY = (height * scale.value - height) / 100;

    return {
      transform: [
        {
          translateX: Math.min(
            Math.max(translateX.value, -maxTranslateX),
            maxTranslateX
          ),
        },
        {
          translateY: Math.min(
            Math.max(translateY.value, -maxTranslateY),
            maxTranslateY
          ),
        },
        { scale: withSpring(scale.value) },
      ],
    };
  });

  return (
    <GestureDetector gesture={Gesture.Simultaneous(panGesture, pinchGesture)}>
      <Animated.View style={[styles.canvas, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    width: width,
    height: height,
    borderColor: "darkcyan",
    borderWidth: 2,
    borderStyle: "dashed",
  },
});

export default CanvasView;
