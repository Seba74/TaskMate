import { Box, Button, Center, ScrollView, Select } from "native-base";
import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FormControl, Icon, Input, Text } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { Entypo } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomButtom from "../../components/CustomButton";
import { Button as ButtonNative } from "react-native";

// context
import { useProjectContext } from "context/ProjectContext"
import { ProjectAdapter } from "adapters/ProjectAdapter";
import { router } from "expo-router";
import Modal from "react-native-modal";

// form requirements
const schema = yup.object().shape({
  nameProject: yup.string().required("Name is Required"),
  description: yup.string().required("Description is required").min(20),
  category: yup.string().required("Category is required"),
  color: yup.string().required("Color Theme is required"), 
  privateDescription: yup.string(),
});

export default function NewProject() {

  // States
  const { myProjects, createProject } = useProjectContext();
  const [isModalVisible, setModalVisible] = useState(true);

  // form
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nameProject: "",
      description: "",
      category: "company",
      color: "darkcyan",
      privateDescription: ""
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  async function onSubmit(data: any) {
    try {
        const projectAdapter = ProjectAdapter({...data, id: myProjects ? myProjects.length + 1 : 1});
        createProject!(projectAdapter);
        router.push(`/myprojects`);
    } catch (_error) {
    }
  }

  return (
    <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          <Modal isVisible={isModalVisible}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text color={"white"} style={{fontSize: 20, color: "darkcyan"}}>Hola!</Text>
              <Text color={"white"} style={{textAlign: "justify", fontSize: 18}}>Completa todos los campos requeridos para la creacion del proyecto. Una vez creado podras asignar tarea a colaboradores.</Text>
              <CustomButtom disabled={false} color="darkcyan" 
              key={1} addStyle={{ backgroundColor: "rgba(0, 0, 0, .2)", marginTop: 12 }}  
              icon="cross" title="Cerrar" 
              onPress={() => setModalVisible(false)} />
            </View>
          </Modal>
        </View>

        <Text style={styles.title}>New Project</Text>
        <View style={styles.inputView}>
          
          <FormControl mb="2" isRequired isInvalid={Boolean(errors.nameProject)}>
            <FormControl.Label>Name Project</FormControl.Label>
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
                    placeholder="Project Name"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="nameProject"
                defaultValue=""
              />
            <FormControl.ErrorMessage>
              {errors.nameProject?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mb="2" isRequired isInvalid={Boolean(errors.description)}>
            <FormControl.Label>Description Project</FormControl.Label>
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
                    placeholder="Description Project"
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

          <Box width={"100%"} my={2}>
            <Text fontWeight="semibold" color={"gray.500"}>Category</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  style={styles.input}
                  placeholder={"Select Catagory"}
                  selectedValue={value}
                  onValueChange={(newValue) => {
                    onChange(newValue);
                    setValue("category", newValue);
                  }}
                >
                  {["company", "student", "investigator"].map((category: any) => (
                    <Select.Item
                      key={category}
                      label={category}
                      value={category}
                    />
                  ))}
                </Select>
              )}
              name="category"
            />
            {Object.keys(errors.category || {}).length > 0 && (
              <Text color="red.500">{errors.category?.message}</Text>
            )}
          </Box>

          <FormControl mb="2" isRequired isInvalid={Boolean(errors.privateDescription)}>
            <FormControl.Label>Private Description (optional)</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    style={styles.input}
                    InputLeftElement={
                      <Icon
                        as={<Entypo name="flickr" />}
                        size={5}
                        mx="3"
                        color="red.800"
                      />
                    }
                    placeholder="Private Description"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="privateDescription"
                defaultValue=""
              />
            <FormControl.ErrorMessage>
              {errors.description?.message}
            </FormControl.ErrorMessage>
          </FormControl>    

          <Box width={"100%"} mt={2}>
            <Text fontWeight="semibold" color={"gray.500"}>Color Theme</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  style={styles.input}
                  placeholder={"Select color"}
                  selectedValue={value}
                  onValueChange={(newValue) => {
                    onChange(newValue);
                    setValue("color", newValue);
                  }}
                >
                  {["orange", "blue", "red", "violet", "red", "green", "darkcyan"].map((color: any) => (
                    <Select.Item
                      key={color}
                      label={color}
                      value={color}
                    />
                  ))}
                </Select>
              )}
              name="color"
            />
            {Object.keys(errors.color || {}).length > 0 && (
              <Text color="red.500">{errors.color?.message}</Text>
            )}
          </Box>

          <Box mt="4" width={"100%"}>
            <Text fontWeight="semibold" mb="1" color={"gray.500"}>Imagenes:</Text>
            <Center
              h="150px"
              borderColor="#D0D5DD"
              borderStyle="dashed"
              borderWidth="2"
              textAlign="center"
            >
              <Text fontWeight="bold" mt="20px">
                Cargar Imágenes
              </Text>
              <Text px="6" textAlign={"center"}>
                Sube imagenes representativa de tu proyecto
              </Text>

              <View style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 10
              }}>
                <CustomButtom 
                  disabled={false}
                  addStyle={{
                    backgroundColor: "gray", borderRadius: 5
                }}
                title={"Add image"} icon={"images"} color={"white"} onPress={() => setModalVisible(true)}/>

              </View>
            </Center>
          </Box>
          
          
          <Button
              my={6}
              color="white"
              onPress={handleSubmit(onSubmit)}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              isLoadingText="Creanting Project"
            >
              <Text style={styles.buttonText}>Create Project</Text>
          </Button>
        </View>
    </ScrollView>  
   )
}

const styles = StyleSheet.create({
  container : {
    flex: 1
  },
  title : {
    fontSize : 18,
    fontWeight : "bold",
    paddingVertical : 20,
    marginHorizontal: 15,
    color: "#484747"
  },
  inputView : {
    width : "100%",
    paddingHorizontal : 15,
    marginBottom  :5
  },
  input : {
    height : 50,
  },
  buttonText : {
    color : "white"  ,
    fontSize: 16,
    fontWeight : "bold"
  },
})