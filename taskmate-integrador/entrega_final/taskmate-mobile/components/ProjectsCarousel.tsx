import { StyleSheet, Text, Platform, ScrollView } from "react-native";
import React from "react";
import ProjectCard from "./ProjectCard";
import { Carousel } from "react-native-ui-lib";
import { View } from "native-base";
import { Project } from "@/models/ProjectModel";

interface ProjectCardInterface {
  ownProjects: Project[];
  collaborativeProjects: Project[];
}

const ProjectsCarrousel: React.FunctionComponent<ProjectCardInterface> = ({
  ownProjects,
  collaborativeProjects,
}) => {
  return (
    <ScrollView>
      <View style={{ paddingTop: 20 }}>
        <View style={{ display: "flex", paddingLeft: 20, marginBottom: 18 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Mis Proyectos
          </Text>
        </View>
        {ownProjects && ownProjects.length > 0 ? (
          <Carousel {...{ containerStyle: styles.wrapper, pageWidth: 360 }}>
            {ownProjects.map((p, i) => (
              <ProjectCard project={p} key={i} />
            ))}
          </Carousel>
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              No tienes proyectos propios aún.
            </Text>
          </View>
        )}
      </View>

      <View style={{ paddingTop: 20 }}>
        <View style={{ display: "flex", paddingLeft: 20, marginBottom: 18 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Proyectos Colaborativos
          </Text>
        </View>
        {collaborativeProjects && collaborativeProjects.length > 0 ? (
          <Carousel {...{ containerStyle: styles.wrapper, pageWidth: 360 }}>
            {collaborativeProjects.map((p, i) => (
              <ProjectCard project={p} key={i} />
            ))}
          </Carousel>
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              No tienes proyectos colaborativos aún.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProjectsCarrousel;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    marginBottom: Platform.OS === "ios" ? 32 : 16,
  },
  messageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  messageText: {
    fontSize: 16,
    color: "#888",
  },
});
