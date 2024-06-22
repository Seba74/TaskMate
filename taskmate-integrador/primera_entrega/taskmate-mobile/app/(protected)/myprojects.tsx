import { StyleSheet, ScrollView, Text, Platform } from 'react-native'
import React from 'react'
import ProjectCard from '../../components/ProjectCard'

// context
import { useProjectContext } from 'context/ProjectContext';

export default function MyProjects() {

  const { myProjects } = useProjectContext();


  return (
    <ScrollView style={styles.wrapper}>
        {myProjects ? (
          myProjects.map((p, i) => (
          <ProjectCard project={p} key={i}/> 
        ))
      ):  <Text>LOADING</Text>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: Platform.OS === "ios" ? 32 : 16
  }
})