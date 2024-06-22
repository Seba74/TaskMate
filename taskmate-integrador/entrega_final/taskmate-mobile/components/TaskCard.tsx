import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Card } from "react-native-ui-lib";
import { ColorCategory, getRandomColor } from "@/constants/colors";
import { Task } from "@/models/TaskModel";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Collaborator } from "@/models/ProjectModel";
import { Box } from "native-base";
import { Image } from "@rneui/base";

type TaskDetailsProps = {
  selectedCollabs: Collaborator[];
  selectedState: string;
  selectedDate: Date;
  description: string;
  collaborators: Collaborator[];
  projectId: string;
};

interface TaskCardInterface {
  task: Task;
  highestZIndex: SharedValue<number>;
  initialX: number;
  initialY: number;
  openPanel: () => void;
  updateTaskDetailsProps: (task: Task) => void;
}

const TaskCard: React.FunctionComponent<TaskCardInterface> = ({
  task,
  highestZIndex,
  initialX,
  initialY,
  openPanel,
  updateTaskDetailsProps,
}) => {
  const color =
    ColorCategory[task.taskStatus.description as keyof typeof ColorCategory];

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: initialX, y: initialY });
  const start = useSharedValue({ x: initialX, y: initialY });
  const zIndex = useSharedValue(1);

  const showDetails = (task: Task) => {
    updateTaskDetailsProps(task);
    openPanel();
  };

  const animatedStyles = useAnimatedStyle(() => {
    const translateX = offset.value.x ?? 0;
    const translateY = offset.value.y ?? 0;
    const scale = isPressed.value ? 1.2 : 1;

    return {
      transform: [
        { translateX: translateX },
        { translateY: translateY },
        { scale: withSpring(scale) },
      ],
      zIndex: zIndex.value,
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
      highestZIndex.value += 1;
      zIndex.value = highestZIndex.value;
    })
    .onUpdate((e) => {
      offset.value = {
        x: start.value.x + e.translationX,
        y: start.value.y + e.translationY,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  return (
    <GestureDetector gesture={gesture} key={task.id}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <Card style={styles.container} onPress={() => showDetails(task)}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: 190,
              height: 80,
            }}
          >
            <View
              style={{ backgroundColor: color, width: 8, height: "100%" }}
            ></View>
            <View style={styles.cardBody}>
              <View style={{ display: "flex" }}>
                <Text style={{ fontSize: 12 }}>
                  {task.description.length > 22
                    ? task.description.slice(0, 22) + "..."
                    : task.description}
                </Text>
              </View>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#D4D4D4" }}
              ></View>
              <View style={styles.cardFooter}>
                <View>
                  <Text style={{ fontSize: 12 }}>
                    Adjunto: {task.taskResources.length}
                  </Text>
                </View>
                <View style={styles.cardCollabs}>
                  {task.collaboratorsOnTasks!.map(({ collaborator }, index) => (
                    <View key={index} style={{ marginRight: -10 }}>
                      <View
                        style={{
                          ...styles.cardCollab,
                        }}
                      >
                        <Box>
                          {collaborator.user.profile_picture.length > 1 ? (
                            <Image
                              resizeMode="cover"
                              source={{
                                uri: `https://taskmate-ing.up.railway.app/images/${collaborator.user.profile_picture}`,
                              }}
                              alt="profile picture"
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 50,
                              }}
                            />
                          ) : (
                            <Text
                              style={{
                                fontSize: 12,
                                color: "white",
                                backgroundColor: getRandomColor(),
                                borderRadius: 50,
                                width: 20,
                                height: 20,
                                textAlign: "center",
                                textAlignVertical: "center",
                              }}
                            >
                              {collaborator.user.name[0] +
                                collaborator.user.last_name[0]}
                            </Text>
                          )}
                        </Box>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Card>
      </Animated.View>
    </GestureDetector>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    width: 190,
    backgroundColor: "white",
    position: "relative",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    overflow: "hidden",
  },

  cardBody: {
    display: "flex",
    width: "95%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    padding: 10,
  },

  cardFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardCollabs: {
    display: "flex",
    flexDirection: "row",
    bottom: 0,
    right: 20,
  },

  cardCollab: {
    marginRight: -40,
  },
});
