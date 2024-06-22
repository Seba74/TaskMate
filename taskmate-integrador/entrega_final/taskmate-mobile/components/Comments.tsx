import React from "react";
import { View, StyleSheet } from "react-native";
import { Badge, Box, Divider, Modal, Pressable, Text } from "native-base";
import { Octicons } from "@expo/vector-icons";
import CommentModal from "./modals/ViewComments";

interface CommentsProps {}

const Comments: React.FC<CommentsProps> = () => {
  const [showModalComments, setShowModalComments] = React.useState(false);

  return (
    <Box>
      <Pressable onPress={() => setShowModalComments(true)}>
        <Box style={styles.inputContainer}>
          <View style={styles.input}>
            <Text
              style={{ fontSize: 16, textAlign: "center", color: "#c4c4c4" }}
            >
              <Octicons name="comment-discussion" size={20} color="#c4c4c4" />
              {"  "}Comentarios :
            </Text>
          </View>
        </Box>

        <Modal
          isOpen={showModalComments}
          onClose={() => setShowModalComments(false)}
          size={"md"}
          closeOnOverlayClick={true}
        >
          <CommentModal />
        </Modal>
      </Pressable>
      <Divider />
    </Box>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 10,
  },
  input: {
    marginTop: 5,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
});

export default Comments;
