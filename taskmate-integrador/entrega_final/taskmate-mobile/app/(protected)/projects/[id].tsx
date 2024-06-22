import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Button, Text } from "native-base";
import { Image } from "@rneui/themed";
import { Chip } from "react-native-ui-lib";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import CollaboratorCard from "@/components/CollaboratorCard";
import { ScrollView } from "react-native-virtualized-view";
import { useFetchAndLoader } from "@/hooks/useFetchAndLoader";
import { Collaborator, ProjectWithTasks } from "@/models/ProjectModel";
import { getProjectById } from "@/services/projectService";
import Loading from "@/components/Loading";
import { projectWithTasksAdapter } from "@/adapters/ProjectAdapter";
import { useProjectContext } from "@/context/ProjectContext";
import { formatDate } from "@/utilities/date";
import { Task } from "@/models/TaskModel";

type collabWithTasks = {
  collaborator: Collaborator;
  tasks: Task[];
};

const Project = () => {
  const { callEndpoint, loading } = useFetchAndLoader();
  const { id, title } = useLocalSearchParams();
  const [project, setProject] = useState<ProjectWithTasks>();
  const { loadProject } = useProjectContext();
  let collabWithTasks: collabWithTasks[] = [];

  useEffect(() => {
    (async () => {
      const resProject = await callEndpoint(getProjectById(id as string));
      const adapterProject = projectWithTasksAdapter(resProject);
      setProject(adapterProject);
      loadProject!(adapterProject);
    })();
  }, [id]);

  const tasksPerCollaborator = (collaborators: Collaborator[]) => {
    collaborators.forEach((collab) => {
      const tasks = project?.tasks.filter((task) =>
        task.collaboratorsOnTasks.find(
          ({ collaborator }) => collaborator.id === collab.id
        )
      );
      collabWithTasks.push({ collaborator: collab, tasks: tasks as Task[] });
    });
    return collabWithTasks;
  };

  if(project) {
    collabWithTasks = tasksPerCollaborator(project!.collaborators);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.wrapper}>
      <Stack.Screen
        options={{
          title: title as string,
        }}
      />

      <View style={styles.wrapperDescription}>
        <Image
          resizeMode="cover"
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/images/${project?.project_picture}`,
          }}
          containerStyle={styles.wrapperDescriptionBanner}
          PlaceholderContent={<ActivityIndicator />}
        />

        <View style={styles.wrapperDescriptionText}>
          <Text
            fontSize={"md"}
            fontWeight={"normal"}
            color={"gray.800"}
            mt={3}
            isTruncated
            numberOfLines={2}
          >
            {project?.description}
          </Text>
        </View>

        <View style={styles.wrapperChip}>
          <Chip
            containerStyle={{
              borderRadius: 10,
              backgroundColor: "#e4e4e4",
              borderWidth: 0,
              paddingVertical: 4,
              gap: 4,
            }}
            marginR-s2
            paddingH-s2
            leftElement={
              <MaterialCommunityIcons name="calendar" size={19} color="black" />
            }
            rightElement={<Image tintColor={"gray"} width={20} height={20} />}
            label={formatDate(new Date(project?.createdAt as string))}
          />

          <Chip
            containerStyle={{
              borderRadius: 10,
              backgroundColor: "#e4e4e4",
              borderWidth: 0,
              paddingVertical: 4,
              gap: 4,
            }}
            marginR-s2
            paddingH-s2
            leftElement={
              <MaterialCommunityIcons
                name="account-group"
                size={19}
                color="black"
              />
            }
            rightElement={<Image tintColor={"gray"} width={20} height={20} />}
            label={project?.collaborators.length.toString()}
          />

          <Chip
            containerStyle={{
              borderRadius: 10,
              backgroundColor: "#e4e4e4",
              borderWidth: 0,
              paddingVertical: 4,
              gap: 4,
            }}
            marginR-s2
            paddingH-s2
            leftElement={<FontAwesome5 name="tasks" size={19} color="black" />}
            rightElement={<Image tintColor={"gray"} width={20} height={20} />}
            label={project?.tasks.length.toString()}
          />
        </View>

        <Link
          href={{
            pathname: "projects/tasks/[id]",
            params: { id: project?.id },
          }}
          asChild
        >
          <Button style={styles.button}>Visualizar Tareas</Button>
        </Link>
      </View>

      <View style={styles.wrapperCollaborators}>
        <Text
          fontSize={"xl"}
          fontWeight={"normal"}
          color={"gray.900"}
          mt={5}
          mb={2}
        >
          Colaboradores
        </Text>

        <ScrollView>
          {project?.collaborators?.map(({ id, user, role, collaboratorsOnTasks }) => (
            <CollaboratorCard
              key={id}
              user={user}
              rol={role!.description}
              tareas={collaboratorsOnTasks!.length}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  wrapperDescription: {
    width: "100%",
    alignItems: "center",
    minHeight: 250,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  wrapperDescriptionBanner: {
    minHeight: 180,
    width: "100%",
  },
  wrapperDescriptionText: {
    width: "90%",
  },
  wrapperCollaborators: {
    width: "90%",
    flex: 1,
    borderTopWidth: 1,
    borderBlockColor: "#a1a1a1",
  },
  wrapperChip: {
    width: "90%",
    flexDirection: "row",
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    height: 40,
    backgroundColor: "darkcyan",
    width: "90%",
    borderRadius: 20,
  },
});

export default Project;
