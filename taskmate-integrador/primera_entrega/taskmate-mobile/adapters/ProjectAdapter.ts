import { Project } from "models/ProjectModel";

export const ProjectAdapter = (data: any): Project => {
    return {
        id: data.id,
        category: data.category,
        color: data.color,
        description: data.description,
        image: data.image ? data.image : null,
        name: data.nameProject,
        privateDescription: data.privateDescription
    }
}