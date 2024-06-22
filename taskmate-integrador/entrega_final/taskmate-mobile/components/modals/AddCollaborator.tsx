import React, { useState } from "react";
import { Box, Button, Divider, Pressable, Text } from "native-base";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Collaborator } from "@/models/ProjectModel";
import { Image } from "@rneui/themed";
import { getRandomColor } from "@/constants/colors";

type AddCollaboratorProps = {
  collaborators: Collaborator[];
  collaboratorsToAdd: Collaborator[];
  onSave: (
    collabsSelected: Collaborator[],
    collabsToAdd: Collaborator[]
  ) => void;
  onCancel: () => void;
};

const AddCollaborator = ({
  onSave,
  onCancel,
  collaborators,
  collaboratorsToAdd,
}: AddCollaboratorProps) => {
  const [collabsSelected, setCollabs] = useState(collaborators);
  const [collabsToAdd, setCollabsToAdd] = useState(collaboratorsToAdd);

  const handleRemoveCollab = (collab: Collaborator) => {
    setCollabs(collabsSelected.filter((c) => c.id !== collab.id));
    setCollabsToAdd([...collabsToAdd, collab]);
  };

  return (
    <View style={styles.wrapper}>
      <Box>
        <Text style={styles.title}>Colaboradores de la tarea</Text>
        <View style={styles.collabsContainer}>
          {collabsSelected.length === 0 ? (
            <Text style={styles.noCollabsText}>
              Aún no hay colaboradores asignados
            </Text>
          ) : (
            collabsSelected.map((collab) => (
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 6,
                  backgroundColor: "#D9D9D9",
                  borderRadius: 20,
                  padding: 6,
                  position: "relative",
                }}
                key={collab.id}
              >
                <Box>
                  {collab.user.profile_picture.length > 1 ? (
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: `https://taskmate-ing.up.railway.app/images/${collab.user.profile_picture}`,
                      }}
                      alt="profile picture"
                      style={{ width: 24, height: 24, borderRadius: 50 }}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                        backgroundColor: getRandomColor(),
                        borderRadius: 50,
                        width: 24,
                        height: 24,
                        textAlign: "center",
                        textAlignVertical: "center",
                      }}
                    >
                      {collab.user.name[0] + collab.user.last_name[0]}
                    </Text>
                  )}
                </Box>
                <Text
                  style={{ ...styles.collabText, paddingRight: 25 }}
                  isTruncated
                  numberOfLines={1}
                >
                  {collab.user.name} {collab.user.last_name}
                </Text>
                <Pressable
                  style={{ position: "absolute", top: 4, right: 6 }}
                  onPress={() => handleRemoveCollab(collab)}
                >
                  <Box>
                    <MaterialCommunityIcons
                      name="close"
                      size={18}
                      color="#9A9A9A"
                    />
                  </Box>
                </Pressable>
              </View>
            ))
          )}
        </View>
        <Divider style={{ marginVertical: 20 }} />
      </Box>

      <Box>
        <Text style={styles.title}>Agregar colaboradores</Text>
        <ScrollView style={styles.collabsAddContainer}>
          {collabsToAdd.length === 0 ? (
            <Text style={styles.noCollabsText}>
              No hay colaboradores disponibles para asignar a esta tarea
            </Text>
          ) : (
            collabsToAdd.map((collab) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={collab.id}
              >
                <Box style={{ flexDirection: "row", columnGap: 10 }}>
                  <Box>
                    {collab.user.profile_picture.length > 1 ? (
                      <Image
                        resizeMode="cover"
                        source={{
                          uri: `https://taskmate-ing.up.railway.app/images/${collab.user.profile_picture}`,
                        }}
                        alt="profile picture"
                        style={{ width: 24, height: 24, borderRadius: 50 }}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 12,
                          color: "white",
                          backgroundColor: getRandomColor(),
                          borderRadius: 50,
                          width: 24,
                          height: 24,
                          textAlign: "center",
                          textAlignVertical: "center",
                        }}
                      >
                        {collab.user.name[0] + collab.user.last_name[0]}
                      </Text>
                    )}
                  </Box>
                  <Text style={styles.collabText}>
                    {collab.user.name} {collab.user.last_name}
                  </Text>
                </Box>
                <Box>
                  <Button
                    style={styles.button}
                    onPress={() => {
                      setCollabsToAdd(
                        collabsToAdd.filter((c) => c.id !== collab.id)
                      );
                      setCollabs([...collabsSelected, collab]);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={24}
                      color="black"
                    />
                  </Button>
                </Box>
              </View>
            ))
          )}
        </ScrollView>
        <Box style={styles.buttonActions}>
          <Button style={styles.button} onPress={onCancel}>
            <Text style={{ color: "#9A9A9A", fontSize: 16 }}>CANCELAR</Text>
          </Button>
          <Button
            isDisabled={!collabsSelected}
            style={{ backgroundColor: "transparent", borderRadius: 18 }}
            onPress={() => onSave(collabsSelected, collabsToAdd)}
          >
            <Text style={{ color: "#57A9C2", fontSize: 16 }}>ACEPTAR</Text>
          </Button>
        </Box>
      </Box>
    </View>
  );
};

export default AddCollaborator;

const styles = StyleSheet.create({
  wrapper: {
    width: "80%",
    height: "auto",
    flexDirection: "column",
    minHeight: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: "#9A9A9A",
  },
  collabsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 100,
    gap: 12,
    marginTop: 10,
  },
  collabsAddContainer: {
    flexDirection: "column",
    gap: 12,
    marginTop: 10,
    height: 200,
  },
  buttonActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
    columnGap: 12,
  },
  button: {
    backgroundColor: "transparent",
  },
  noCollabsText: {
    color: "#9A9A9A",
    fontSize: 14,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  collabText: {
    color: "#353535",
    fontSize: 12,
    width: 105,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
