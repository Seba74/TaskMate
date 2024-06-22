import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Box, Divider, Modal, Pressable } from "native-base";
import { Text } from "native-base";
import { Chip } from "react-native-ui-lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddCollaborator from "./modals/AddCollaborator";
import { Collaborator } from "../models/ProjectModel";
import { Image } from "@rneui/themed";
import { getRandomColor } from "@/constants/colors";

interface CollabSelectorProps {
  collaborators: Collaborator[];
  currentCollabs?: Collaborator[];
  setCollaborators: (collaborators: Collaborator[]) => void;
}

const CollabSelector: React.FC<CollabSelectorProps> = ({
  collaborators,
  setCollaborators,
  currentCollabs,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [collaboratorsAdded, setCollaboratorsAdded] = React.useState<
    Collaborator[]
  >(currentCollabs ?? []);
  const [collaboratorsToAdd, setCollaboratorsToAdd] = React.useState<
    Collaborator[]
  >([...collaborators]);

  const handleSave = (
    collabs: Collaborator[],
    collabsToAdd: Collaborator[]
  ) => {
    setShowModal(false);
    setCollaboratorsAdded(collabs);
    setCollaboratorsToAdd(collabsToAdd);
    setCollaborators(collabs);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Box>
      <Pressable
        onPress={() => setShowModal(true)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Box style={styles.inputContainer}>
          <View style={styles.input}>
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color="black"
            />
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Colaboradores :{" "}
            </Text>
          </View>
          {/* map */}
          <View
            style={{
              position: "relative",
              flexDirection: "row",
              paddingRight: 10,
            }}
          >
            {collaboratorsAdded.map(({ id, user }) => (
              <Box key={id} style={styles.cardCollabs}>
                {user.profile_picture.length > 1 ? (
                  <Image
                    resizeMode="cover"
                    source={{
                      uri: `https://taskmate-ing.up.railway.app/images/${user.profile_picture}`,
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
                    {user.name[0] + user.last_name[0]}
                  </Text>
                )}
              </Box>
            ))}
          </View>
        </Box>
      </Pressable>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size={"md"}
        closeOnOverlayClick={false}
      >
        <AddCollaborator
          collaborators={collaboratorsAdded}
          collaboratorsToAdd={collaboratorsToAdd}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
      <Divider />
    </Box>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
  },
  input: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  cardCollabs: {
    display: "flex",
    flexDirection: "row",
    marginRight: -6,
  },
});

export default CollabSelector;
