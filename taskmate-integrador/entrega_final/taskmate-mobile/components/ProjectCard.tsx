import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Card, Text as TextRneui } from "@rneui/base";
import { Link, router } from "expo-router";
import { Project } from "models/ProjectModel";
import { Box } from "native-base";
import { Image } from "@rneui/themed";
import { getRandomColor } from "@/constants/colors";

interface ProjectCardInterface {
  project: Project;
}

const ProjectCard: React.FunctionComponent<ProjectCardInterface> = ({
  project,
}) => {
  return (
    <Link
      asChild
      href={{
        pathname: "/projects/[id]",
        params: { id: project.id, title: project.title.toUpperCase() },
      }}
    >
      <Pressable style={styles.container}>
        <Card containerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Card.Image
              key={project.id}
              source={{
                uri: `https://taskmate-ing.up.railway.app/images/${project.project_picture}`,
              }}
              alt="project picture"
              style={styles.image}
            />
          </View>
          <View style={styles.titleContainer}>
            <Card.Title style={styles.title}>
              {project.title.length > 25
                ? project.title.substring(0, 25) + "..."
                : project.title}
            </Card.Title>
            <Text style={styles.description}>
              {project.description.length > 45
                ? project.description.substring(0, 45) + "..."
                : project.description}
            </Text>
          </View>
          <View style={styles.collaboratorsContainer}>
            {project.collaborators!.map((collaborator, index) => (
              <View key={index} style={{ marginRight: -10 }}>
                <View
                  style={{
                    ...styles.collaboratorImage,
                    // backgroundColor: project.color,
                  }}
                >
                  <Box style={styles.collaboratorImage}>
                    {collaborator.user.profile_picture.length > 1 ? (
                      <Image
                        resizeMode="cover"
                        source={{
                          uri: `https://taskmate-ing.up.railway.app/images/${collaborator.user.profile_picture}`,
                        }}
                        alt="profile picture"
                        style={{ width: 32, height: 32, borderRadius: 50 }}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,
                          color: "white",
                          backgroundColor: getRandomColor(),
                          borderRadius: 50,
                          width: 32,
                          height: 32,
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
        </Card>
      </Pressable>
    </Link>
  );
};

export default ProjectCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    width: "100%",
    height: 260,
    padding: 0,
    margin: 0,
    paddingBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 4,
    },
  },
  imageContainer: {
    width: "100%",
    height: "60%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 8,
    paddingTop: 8,
  },

  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
  },

  description: {
    fontSize: 14,
  },

  collaboratorsContainer: {
    display: "flex",
    position: "absolute",
    bottom: -30,
    right: 18,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 8,
    paddingTop: 8,
  },
  collaboratorImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 50,
  },
});
