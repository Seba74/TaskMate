import { StyleSheet, Platform } from "react-native";
import React, { useEffect } from "react";
import { useProjectContext } from "context/ProjectContext";
import { View } from "native-base";

import { getProjectsByUser } from "@/services/projectService";
import { useFetchAndLoader } from "@/hooks/useFetchAndLoader";
import { myProjectsAdapter } from "@/adapters/ProjectAdapter";
import Loading from "@/components/Loading";
import ProjectsCarrousel from "@/components/ProjectsCarousel";
import { useAuth } from "@/context/AuthContext";
import { Project } from "@/models/ProjectModel";
import { Role } from "@/constants/tokens";

export default function MyProjects() {
  const { callEndpoint, loading } = useFetchAndLoader();
  const { myProjects, loadMyProjects } = useProjectContext();
  const { authState } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await callEndpoint(getProjectsByUser());
      const projectsAdapter = myProjectsAdapter(res.data);
      loadMyProjects!(projectsAdapter);
    })();
  }, [myProjects?.length]);

  const separateProjects = (): {
    ownProjects: Project[];
    collaborativeProjects: Project[];
  } => {
    const ownProjects: Project[] = [];
    const collaborativeProjects: Project[] = [];

    myProjects?.forEach((project) => {
      const isAdmin = project.collaborators.some(
        (collab) =>
          collab.user.id === authState?.id &&
          collab.role?.description === Role.Admin
      );
      if (isAdmin) {
        ownProjects.push(project);
      } else {
        collaborativeProjects.push(project);
      }
    });

    ownProjects.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    collaborativeProjects.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return { ownProjects, collaborativeProjects };
  };

  const { ownProjects, collaborativeProjects } = separateProjects();

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.wrapper}>
      <ProjectsCarrousel
        ownProjects={ownProjects}
        collaborativeProjects={collaborativeProjects}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    marginBottom: Platform.OS === "ios" ? 32 : 16,
  },
});
