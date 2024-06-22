import { CreateProjectModel } from "@/models/ProjectModel";
import axios from "axios";

const URI = `${process.env.EXPO_PUBLIC_API_URL}/projects`;
export const createProjectService = (newProject: CreateProjectModel) => {
  const form = new FormData();
  form.append("title", newProject.title);
  form.append("description", newProject.description);

  if (newProject.image) {
    const uriParts = newProject.image.uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    //@ts-ignore
    form.append("image", {
      uri: newProject.image.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    }); 
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return {
    call: axios.post(URI, form, config),
  };
};

export const getProjectsByUser = () => {
  return {
    call: axios.get(URI),
  };
};

export const getProjectById = (projectId: string) => {
  return {
    call: axios.get(`${URI}/${projectId}`),
  };
};
