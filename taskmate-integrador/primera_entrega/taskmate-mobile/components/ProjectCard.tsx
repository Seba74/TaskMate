import { View, Text } from 'react-native'
import React from 'react'
import { Button, Card, Icon, Text as TextRneui } from '@rneui/base'
import { router } from 'expo-router'
import { Project } from 'models/ProjectModel'
import { LinearGradient } from "expo-linear-gradient";

interface ProjectCardInterface {
    project: Project
}



const ProjectCard: React.FunctionComponent<ProjectCardInterface> = ({
    project
}) => {
  return (

    <Card>
        <LinearGradient colors={[(project.color.length > 2 ? project.color : "darkcyan"), "transparent"]} style={{
            position: 'absolute',
            right: 50,
            bottom: 0,
            transform: "rotate(30deg)",
            opacity: .5,
            width: "60%",
            height: "80%",
            borderRadius: 60,
        }} />

        <Card.Title>
            {project.name.toUpperCase()}
            <Text style={{
                color: "darkcyan",
            }}>  (Poprietary)</Text>  
        </Card.Title>
        <Card.Divider />
        <Card.Image
        style={{ padding: 0 }}
        source={require("assets/default.gif")}
        />

        <View style={{ marginVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#e1e1e1" }}>
            <TextRneui h4 style={{
                marginVertical: 10
            }}>Detalles</TextRneui>

            <View style={{
            flexDirection: "row",
            justifyContent: "space-between"
            }}>

                <View style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Icon
                        name="person"
                        color="tomato"
                    />
                    <TextRneui> 12 Persons </TextRneui>
                </View>

                <View style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Icon
                        name="person"
                        color="darkblue"
                    />
                    <TextRneui> 10 Colabollators </TextRneui>
                </View>
                
                <View style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Icon
                        name="person"
                        color="darkcyan"
                    />
                    <TextRneui> 2 Admin </TextRneui>
                </View>

                <View style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Icon
                        name="person"
                        color="darkviolet"
                    />
                    <TextRneui> 0 Moderators </TextRneui>
                </View>
            </View>

            <Text style={{ marginVertical: 10, textAlign: "justify" }}>{ project.description }</Text>
        </View>

        <Button
            onPress={() => router.push(`/${project.id}`)}
            radius={16}
            icon={
            <Icon
                name="add"
                color="white"
                iconStyle={{ marginRight: 10 }}
            />
            }
            buttonStyle={{
            backgroundColor: "darkcyan",
            }}
            title="View More"
        />
    </Card>
  )
}

export default ProjectCard;