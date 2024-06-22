import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "@rneui/themed";
import { Box, Stack } from "native-base";
import { Text } from "native-base";
import { Chip } from "react-native-ui-lib";
import { MaterialIcons } from "@expo/vector-icons";
import { getRandomColor } from "@/constants/colors";

interface UserProp {
  name: string;
  last_name: string;
  profile_picture: string;
}

interface CollaboratorCardProps {
  user: UserProp;
  rol: string;
  tareas: number;
}

const CollaboratorCard: React.FC<CollaboratorCardProps> = ({
  user,
  rol,
  tareas,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperDescription}>
        {/* <Image
            resizeMode='cover'
            source={{ uri:  `${process.env.EXPO_PUBLIC_API_URL}/images/${user.profile_picture }`}}
            containerStyle={styles.wrapperDescriptionAvatar}
            PlaceholderContent={<ActivityIndicator />}
          /> */}

        {/* if user.profile_picture no exist use the first letter of the name and last_name */}

        <Box style={styles.wrapperDescriptionAvatar}>
          {user.profile_picture.length > 1 ? (
            <Image
              resizeMode="cover"
              source={{
                uri: `https://taskmate-ing.up.railway.app/images/${user.profile_picture}`,
              }}
              alt="profile picture"
              style={{ width: 45, height: 45, borderRadius: 50 }}
            />
          ) : (
            <Text
              style={{
                fontSize: 20,
                color: "white",
                backgroundColor: getRandomColor(),
                borderRadius: 50,
                width: 45,
                height: 45,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              {user.name[0] + user.last_name[0]}
            </Text>
          )}
        </Box>

        <Stack>
          <Text bold>
            {user.last_name}, {user.name}
          </Text>
          <Text italic fontSize={"xs"}>
            {rol}
          </Text>
        </Stack>
      </View>

      <Chip
        containerStyle={{
          borderWidth: 0,
        }}
        leftElement={
          <MaterialIcons name="pending-actions" size={24} color="black" />
        }
        label={`Tareas: ${tareas}`}
      />
    </View>
  );
};

export default CollaboratorCard;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 65,
    alignItems: "center",
    borderRadius: 5,
  },
  wrapperDescription: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  wrapperDescriptionAvatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
});
