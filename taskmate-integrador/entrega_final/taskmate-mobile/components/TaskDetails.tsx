import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Box,
  Text,
  FormControl,
  TextArea,
  View,
  Button,
  Stack,
} from "native-base";
import StateSelector from "./StateSelector";
import DateSelector from "./DateSelector";
import CollabSelector from "./CollabSelector";
import { Collaborator } from "@/models/ProjectModel";
import { useFetchAndLoader } from "@/hooks/useFetchAndLoader";
import { CreateTask, Task } from "@/models/TaskModel";
import { createTask, updateTask } from "@/services/taskService";
import { showToast } from "./Toast";
import { useProjectContext } from "@/context/ProjectContext";
import { taskAdapter } from "@/adapters/TaskAdapter";
import { MaterialIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import FileAttachments from "./FileAttachment";
import CommentsModal from "./modals/ViewComments";
import Comments from "./Comments";

type TaskDetailsProps = {
  selectedCollabs?: Collaborator[];
  selectedState?: string;
  selectedDate?: Date;
  description?: string;
  collaborators: Collaborator[];
  taskId?: string;
  projectId: string;
  closePanel: () => void;
};

const TaskDetails: React.FC<TaskDetailsProps> = ({
  selectedCollabs,
  selectedState,
  selectedDate,
  description,
  collaborators,
  taskId,
  projectId,
  closePanel,
}) => {
  const [collabs, setCollaborators] = useState(selectedCollabs ?? []);
  const [state, setSelectedState] = useState(selectedState ?? "Pendiente");
  const [date, setSelectedDate] = useState(selectedDate ?? new Date());
  const [desc, setDescription] = useState(description ?? "");
  const { addTaskProject, editTaskProject } = useProjectContext();

  const { callEndpoint, loading } = useFetchAndLoader();
  const collabsToAdd = collaborators.filter(
    (collab) => !collabs.find((c) => c.id === collab.id)
  );

  const handleSave = async () => {
    const task: CreateTask = {
      description: desc,
      endDate: date,
      taskStatus: state,
      collaborators: collabs.map((collab) => collab.id),
    };

    const res = await callEndpoint(createTask(projectId, task));
    const adaptaerTask = taskAdapter(res.data);

    addTaskProject!(adaptaerTask);

    closePanel();

    showToast({
      type: "success",
      description: "Tarea creada 😊",
      title: "Tarea",
    });
  };

  const handleEdit = async () => {
    const updatedTask: CreateTask = {
      description: desc,
      endDate: date,
      taskStatus: state,
      collaborators: collabs.map((collab) => collab.id),
    };
    const res = await callEndpoint(updateTask(taskId!, updatedTask));
    editTaskProject!(taskAdapter(res.data));
    closePanel();
    showToast({
      type: "success",
      description: "Tarea editada 😊",
      title: "Tarea",
    });
  };

  return (
    <View style={styles.container}>
      <Box style={styles.content}>
        <FormControl mb={7}>
          <TextArea
            h={60}
            style={{ backgroundColor: "#F6F6F6" }}
            placeholder="Ingrese una descripción..."
            autoCompleteType={"off"}
            value={desc}
            onChangeText={setDescription}
          />
        </FormControl>
      </Box>
      <View style={{ flexDirection: "column", rowGap: 20 }}>
        <StateSelector
          selectedState={state}
          setSelectedState={setSelectedState}
        />
        <DateSelector selectedDate={date} setSelectedDate={setSelectedDate} />
        <CollabSelector
          currentCollabs={selectedCollabs}
          setCollaborators={setCollaborators}
          collaborators={collabsToAdd}
        />
        <FileAttachments />
      </View>
      <View>
        <Button
          onPress={taskId ? handleEdit : handleSave}
          isDisabled={desc.length === 0}
          isLoading={loading}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Guardar</Text>
        </Button>
      </View>
    </View>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginTop: 13,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
});
