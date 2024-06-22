import React, { useState } from "react";
import { Box, Button, Stack, Text } from "native-base";
import { View, StyleSheet, ScrollView } from "react-native";
import { Image } from "@rneui/themed";
import { TextArea } from "native-base";

interface CommentsProps {}

const Comments: React.FC<CommentsProps> = ({}) => {
  const [comment, setComment] = useState("");

  const Comment = () => {
    return (
      <Box
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#e4e4e4",
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: 5,
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://media.admagazine.com/photos/637d11a6e63c8afac40e7a01/1:1/w_2896,h_2896,c_limit/1442809583",
          }}
          style={{
            borderRadius: 50,
            height: 30,
            width: 30,
            resizeMode: "cover",
          }}
        />

        <Stack
          style={{
            flexDirection: "column",
            gap: 0,
            flex: 1,
          }}
        >
          <Text bold fontSize={"xs"}>
            Gauna Octavio
          </Text>
          <Text fontSize={"xs"} fontWeight={"normal"}>
            Esta tarea tiene como objetivo hacerla.
          </Text>
          <Text
            italic
            style={{
              position: "absolute",
              top: -5,
              right: 0,
              fontSize: 10,
              color: "gray",
            }}
          >
            Hace 3 dias
          </Text>
        </Stack>
      </Box>
    );
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Comentarios</Text>

      <ScrollView
        style={{
          maxHeight: 500,
        }}
      >
        <Box style={styles.files}>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </Box>
      </ScrollView>

      <Stack mt={5}>
        <TextArea
          onChangeText={setComment}
          autoCompleteType={""}
          h={8}
          mb={2}
          placeholder="Comentario: "
          w="100%"
        />

        <Button isDisabled={comment.length === 0}>
          <Text style={{ color: "#fff", fontSize: 16 }}>Add Comment</Text>
        </Button>
      </Stack>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    height: "auto",
    flexDirection: "column",
    minHeight: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  files: {
    gap: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
});
