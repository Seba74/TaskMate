import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { router, useLocalSearchParams  } from 'expo-router';
import { useProjectContext } from 'context/ProjectContext';
import { Project } from 'models/ProjectModel';

const users = [
{
  name: 'brynn',
  avatar: 'https://hips.hearstapps.com/hmg-prod/images/makeup-for-dark-skin-1601483429.png?crop=0.493xw:0.986xh;0,0&resize=1200:*',
  rol: "user"
},
{
  name: 'thot leader',
  avatar:
    'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
  rol: "admin"
  },
{
  name: 'jsa',
  avatar: 'https://img.freepik.com/foto-gratis/retrato-hombre-joven-aislado-sobre-fondo-negro-estudio-cerca-photoshot-emociones-reales-modelo-masculino-ojos-cerrados-considerado-concepto-expresion-facial-naturaleza-humana-emociones_155003-30420.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1707868800&semt=ais',
  rol: "user"
},
{
  name: 'talhaconcepts',
  avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  rol: "admin"
},
{
  name: 'andy vitale',
  avatar: 'https://hips.hearstapps.com/hmg-prod/images/makeup-for-dark-skin-1601483429.png?crop=0.493xw:0.986xh;0,0&resize=1200:*',
  rol: "user"
},
{
  name: 'katy friedson',
  avatar:
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
  rol: "moderator"
  },
];

type CardsComponentsProps = {};

const ProjectPage: React.FunctionComponent<CardsComponentsProps> = () => {

  const { id } = useLocalSearchParams();
  const [project, setProject] = useState<Project | null>(null);
  const { myProjects } = useProjectContext();

  useEffect(() => {
    const projectFound = myProjects?.find(data => data.id == id);
    if(projectFound){
      setProject(projectFound);
    }else{
      router.push("/myprojects")
    }
  }, [])

  return (
    <>
      <ScrollView>
        {project && (     
        <View style={styles.container}>
          <Card>
            <Card.Title>TASKMATE PROJECT</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0, objectFit: "cover", height: 200 }}
              source={require('../../assets/default.gif')}      
            />
            <Text style={{ marginVertical: 10, textAlign: "justify" }}>{project.description}</Text>
            <Text style={styles.textInfo}>Categoty: 
              <Text style={{color: project.color}}> {project.category.toLocaleUpperCase()}</Text>
            </Text>
            <Text style={styles.textInfo}>CreatedAt: 
              <Text style={{color: project.color}}> TODAY</Text>
            </Text>

            <View style={{
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 8
            }}>
              <Button
                radius={16}
                icon={
                  <Icon
                    name="add"
                    color="white"
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                buttonStyle={{
                  backgroundColor: "darkblue",
                }}
                title="TASK"
              />

              <Button
                radius={16}
                icon={
                  <Icon
                    name="edit"
                    color="#ffffff"
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                buttonStyle={{
                  backgroundColor: "green"
                }}
                title="EDIT PROJECT"
              />

              <Button
                radius={16}
                icon={
                  <Icon
                    name="delete"
                    color="white"
                  />
                }
                buttonStyle={{
                backgroundColor: "crimson"
                }}
                title=""
              />
            </View>
            
          </Card>

          <Card>
            <Card.Title>Collaborators</Card.Title>
            <Card.Divider />
            {users.map((u, i) => {
              return (
                <View key={i} style={styles.user}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: u.avatar }}
                  />
                  <Text style={styles.name}>{u.name}
                    <Text style={{...styles.rol, color: project.color}}> ( {u.rol ? u.rol : "user"} )</Text>
                  </Text>
                </View>
              );
            })}
          </Card>
        </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  marginBottom: Platform.OS === "ios" ? 18 : 0
},
fonts: {
  marginBottom: 8,
},
user: {
  flexDirection: 'row',
  marginBottom: 6,
},
image: {
  width: 40,
  height: 40,
  marginRight: 10,
  borderRadius: 50
},
name: {
  fontSize: 16,
  marginTop: 5,
},
rol: {
  fontSize: 16,
  marginTop: 5,
},
textInfo: {
  color: "gray",
  fontWeight: "700",
  marginVertical: 3
}
});

export default ProjectPage;