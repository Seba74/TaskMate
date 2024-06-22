import { Project } from "models/ProjectModel";
import { createContext, useContext, useState } from "react";

interface ProjectProps {
    myProjects: Project[],
    createProject: (data: Project) => void;
}
 
const ProjectContext = createContext<Partial<ProjectProps>>({});

export const useProjectContext = () => {
    return useContext(ProjectContext);
}

export const ProjectProvider = ({children}: any) => {
    
    const [myProjectState, setMyProjectState] = useState<Array<Project> | []>([
        {
            id: '1',
            name: "TaskMate App",
            category: "Tecnology",
            color: "blue",
            description: "TaskMate Es una aplicación de tareas colaborativas que busca mejorar la eficiencia y coordinación de los proyectos o tareas realizadas por un grupo de personas.",
            image: null,
            privateDescription: "Se espera terminar en 6 meses (PRIVADO)"
        }
    ]);

    const createProject = (data: Project) => {
        setMyProjectState([data, ...myProjectState])
    }

    const value : ProjectProps = {
        myProjects: myProjectState,
        createProject
    }

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}