import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import CanvasView from "@/components/CanvasView";
import { Portal, FAB, Provider as PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";
import TaskCard from "@/components/TaskCard";
import { useSwipeable } from "@/hooks/useSwipeable";
import { Text as TextNB } from "native-base";
import TaskDetails from "@/components/TaskDetails";
import { useProjectContext } from "@/context/ProjectContext";
import { Collaborator } from "@/models/ProjectModel";
import { Task } from "@/models/TaskModel";

type TaskDetailsProps = {
  selectedCollabs: Collaborator[];
  selectedState: string;
  selectedDate: Date;
  description: string;
  collaborators: Collaborator[];
  taskId?: string;
  projectId: string;
};

const { width, height } = Dimensions.get("window");
const getRandomPosition = (max: number) => Math.floor(Math.random() * max);
let initialX;
let initialY;

const TasksBoard = () => {
  const { SwipeComponent, openPanel, isPanelActive, closePanel } = useSwipeable();
  const highestZIndex = useSharedValue(1);
  const { project } = useProjectContext();

  const [taskDetailsProps, setTaskDetailsProps] = useState<TaskDetailsProps>({
    selectedCollabs: [],
    selectedState: "Pendiente",
    selectedDate: new Date(),
    description: "",
    collaborators: project?.collaborators ?? [],
    projectId: project?.id ?? "",
  });

  const updateTaskDetailsProps = (task: Task) => {
    setTaskDetailsProps({
      selectedCollabs: task.collaboratorsOnTasks.map((cot) => cot.collaborator),
      selectedState: task.taskStatus.description,
      selectedDate: new Date(task.endDate),
      description: task.description,
      collaborators: project?.collaborators ?? [],
      projectId: project?.id ?? "",
      taskId: task.id,
    });
    setHandleSwipe({
      ...handleSwipe,
      componentActive: "add-task",
    });
    openPanel();
  };

  const [handleSwipe, setHandleSwipe] = useState<{
    activeButtons: boolean;
    componentActive: "add-task" | "add-collaborator";
  }>({
    activeButtons: false,
    componentActive: "add-task",
  });

  const PanelContent = () => {
    return <TaskDetails closePanel={closePanel} {...taskDetailsProps}></TaskDetails>;
  };

  const PanelContentCollaborator = () => {
    return (
      <View style={styles.content}>
        <TextNB fontSize={"5xl"}>Create Colaborador</TextNB>
        <TextNB width={"lg"}>Hola</TextNB>
      </View>
    );
  };

  return (
    <PaperProvider>
      <Stack.Screen
        options={{
          title: `Tablero ${project?.title}`,
        }}
      />

      <CanvasView>
        <View style={styles.container}>
          {project?.tasks?.map((task, index) => {
            initialX = getRandomPosition(width);
            initialY = getRandomPosition(height);
            return (
              <TaskCard
                key={index}
                task={task}
                openPanel={openPanel}
                highestZIndex={highestZIndex}
                initialX={initialX}
                initialY={initialY}
                updateTaskDetailsProps={updateTaskDetailsProps}
              />
            );
          })}
        </View>
      </CanvasView>

      <SwipeComponent>
        {handleSwipe.componentActive === "add-collaborator" ? (
          <PanelContentCollaborator />
        ) : (
          <PanelContent />
        )}
      </SwipeComponent>

      <Portal>
        <View style={styles.floatingButtonContainer}>
          <FAB
            visible={!isPanelActive && handleSwipe.activeButtons}
            style={styles.floatingButton}
            icon="shape-square-plus"
            color="white"
            customSize={45}
            onPress={() => {
              setHandleSwipe({
                ...handleSwipe,
                componentActive: "add-task",
              });
              openPanel();
            }}
          />
          <FAB
            visible={!isPanelActive && handleSwipe.activeButtons}
            customSize={45}
            style={styles.floatingButton}
            icon="account-multiple-plus"
            color="white"
            onPress={() => {
              setHandleSwipe({
                ...handleSwipe,
                componentActive: "add-collaborator",
              });
              openPanel();
            }}
          />

          <FAB
            style={styles.floatingButton}
            icon="dots-vertical"
            customSize={45}
            color="white"
            onPress={() =>
              setHandleSwipe({
                ...handleSwipe,
                activeButtons: !handleSwipe.activeButtons,
              })
            }
            visible={!isPanelActive}
          />
        </View>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContainer: {
    position: "absolute",
    alignSelf: "flex-start",
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    gap: 5,
  },
  floatingButton: {
    backgroundColor: "darkcyan",
  },
  content: {
    marginTop: 10,
    backgroundColor: "orange",
    width: "100%",
    flex: 1,
  },
});

export default TasksBoard;
