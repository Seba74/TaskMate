import {
  Box,
  Button,
  Center,
  Select,
  FormControl,
  Icon,
  Input,
  Text,
} from "native-base";
import { View, StyleSheet, Alert, Image } from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Entypo } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButtom from "@/components/CustomButton";

// context
import { useProjectContext } from "context/ProjectContext";
import { projectAdapter } from "adapters/ProjectAdapter";
import { router } from "expo-router";
import { showToast } from "@/components/Toast";

// HooksFetch and Service
import { useFetchAndLoader } from "@/hooks/useFetchAndLoader";
import { createProjectService } from "@/services/projectService";

// Image
import * as ImagePicker from "expo-image-picker";
import { title } from "process";

// form requirements
const schema = yup.object().shape({
  title: yup.string().required("Titulo es requerido").min(3),
  description: yup.string().required("Descripcion es requerida").min(3),
});

export default function NewProject() {
  // States
  const { createProject } = useProjectContext();
  const [pictureProject, setPictureProject] =
    useState<null | ImagePicker.ImagePickerAsset>(null);

  // hooks
  const { callEndpoint, loading } = useFetchAndLoader();

  // form
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  async function onSubmit(data: any) {
    try {
      const res = await callEndpoint(
        createProjectService({ ...data, image: pictureProject })
      );

      const adapterProject = projectAdapter(res.data);

      createProject!(adapterProject);

      router.push({
        pathname: `/projects/${adapterProject.id}`,
        params: { title: adapterProject.title },
      });

      showToast({
        type: "success",
        title: "Nuevo Proyecto Creado",
        description: "Empieza con el proyecto ahora!",
      });

      setValue("title", "");
      setValue("description", "");
      setPictureProject(null);
    } catch (_error) {}
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;

    if (result.assets[0].fileSize! > 4194304) {
      showToast({
        type: "error",
        title: "Error 🤷‍♂️",
        description: "La imagen no puede pesar más de 4MB",
      });
      return;
    }

    setPictureProject(result.assets[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <FormControl mb="2" isRequired isInvalid={Boolean(errors.title)}>
          <FormControl.Label>Título</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                style={styles.input}
                InputLeftElement={
                  <Icon
                    as={<Entypo name="dial-pad" />}
                    size={5}
                    mx="3"
                    color="darkcyan"
                  />
                }
                placeholder="Titulo del proyecto"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="title"
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.title?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl mb="2" isRequired isInvalid={Boolean(errors.description)}>
          <FormControl.Label>Descripción</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                style={styles.input}
                InputLeftElement={
                  <Icon
                    as={<Entypo name="unread" />}
                    size={5}
                    mx="3"
                    color="darkcyan"
                  />
                }
                placeholder="Descripción del proyecto"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.description?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <Box mt="4" width={"100%"}>
          <Text fontWeight="semibold" mb="1" color={"gray.500"}>
            Imagenes:
          </Text>
          <Center
            h="200px"
            borderColor="#D0D5DD"
            borderStyle="dashed"
            borderWidth="2"
            textAlign="center"
          >
            {pictureProject && (
              <Image
                source={{ uri: pictureProject.uri }}
                style={styles.image}
              />
            )}
            <Text fontWeight="bold" mt="10px">
              Cargar Imágenes
            </Text>
            <Text px="6" textAlign={"center"}>
              Sube imagen representativa de tu proyecto
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 10,
              }}
            >
              <CustomButtom
                onPress={pickImage}
                disabled={false}
                addStyle={{
                  backgroundColor: "gray",
                  borderRadius: 5,
                }}
                title={!pictureProject ? "Agregar Imagen" : "Reemplazar Imagen"}
                icon={"images"}
                color={"white"}
              />
            </View>
          </Center>
        </Box>
      </View>
      <Button
        my={8}
        style={{ marginHorizontal: 15, borderRadius: 20 }}
        color="white"
        onPress={handleSubmit(onSubmit)}
        isDisabled={isSubmitting}
        isLoading={loading}
        isLoadingText="Creando Proyecto"
      >
        <Text style={styles.buttonText}>Crear Proyecto</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 20,
    color: "#484747",
  },
  inputView: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  input: {
    height: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
