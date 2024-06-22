import { Project, ProjectWithTasks } from "models/ProjectModel";
import { Collaborator } from '../models/ProjectModel';

export const projectAdapter = (data: Project): Project => {
    return {
        id: data.id,
        description: data.description,
        project_picture: data.project_picture,
        title: data.title,
        collaborators: data.collaborators ? data.collaborators : [],
        createdAt: data.createdAt ? data.createdAt : "null"
    }
}

const myProjectAdapter = (data: any): Project => {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        project_picture: data.project_picture,
        collaborators: data.collaborators ? data.collaborators : [],
        createdAt: data.createdAt ? data.createdAt : "null"
    }
}

export const projectWithTasksAdapter = ({data}: any) : ProjectWithTasks => {
    return {
        id: data.id,
        collaborators: data.collaborators,
        createdAt: data.createdAt,
        description: data.description,
        project_picture: data.project_picture,
        title: data.title,
        tasks: data.tasks
    }
}
    
    export const myProjectsAdapter = (data: any) : Project[] => {
        
        const projects: Project[] = [];
        
    data.map((project: any) => {
        projects.push(myProjectAdapter(project))
    })

    return projects;
}