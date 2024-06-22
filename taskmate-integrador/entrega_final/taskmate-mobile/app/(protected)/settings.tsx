import { View, Text, ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-ui-lib";
import { Image } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, FormControl, Input, WarningOutlineIcon } from "native-base";
import * as ImagePicker from "expo-image-picker"
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {

  const { authState } = useAuth()

  const imgDefault = "https://stereo-images.stereocdn.com/user-avatars/1610429173/orig.webp?1625274112";

  const [selectedImage, setSelectedImage] = useState(imgDefault)
  
  const handleImageSelection =  async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri)
    }
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white",
      paddingHorizontal: 22
    }}>
      <ScrollView>
        <View style={{
          alignItems: "center",
          marginVertical: 22
        }}>
          <TouchableOpacity
              onPress={handleImageSelection}
            >

              <Image 
                source={{
                  uri: selectedImage as string,
                }}
                style={{
                  width: 150, 
                  height: 150,
                  resizeMode: "cover",
                  borderWidth: 1,
                  borderRadius: 100
                }}
              />

              <View style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
                backgroundColor: "white",
                borderRadius: 50,
                padding: 5
              }}>
                <MaterialIcons name="photo-camera" size={28} color={"black"} />
              </View>
            </TouchableOpacity>
        </View>

        <View>
          <View style={{
            flexDirection: "column",    
            width: "100%",
            alignItems: "center",
          }}>
            
             <FormControl w="100%" mt={2} maxW="320px">
                <FormControl.Label>Nombre</FormControl.Label>
                <Input minHeight={12} placeholder="Nombre" value={authState?.name} />
            </FormControl>

            <FormControl w="100%" mt={2} maxW="320px">
                <FormControl.Label>Apellido</FormControl.Label>
                <Input minHeight={12} placeholder="Apellido"  value={authState?.lastname}/>
            </FormControl>

            <FormControl w="100%" mt={2} maxW="320px">
                <FormControl.Label>Nombre de Usuario</FormControl.Label>
                <Input minHeight={12} placeholder="Nombre de Usuario" 
                value={`by${authState?.name}`} />
            </FormControl>

            <FormControl w="100%" mt={2} maxW="320px">
                <FormControl.Label>Email</FormControl.Label>
                <Input minHeight={12} placeholder="Email" value={authState?.email}/>
            </FormControl>

            <Button
              style={styles.button}
              // isLoading={loading}
              isLoadingText=""
              maxW={320}
              // onPress={handleLogin}
              isDisabled
            >
             Actulizar Perfil
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg_styles: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    borderColor: "darkcyan",
    borderWidth: 1,
    borderRadius: 7,
  },
  button: {
    marginTop: 20,
    backgroundColor: "darkcyan",
    height: 45,
    width: "100%",
  },
});
