import { CreateTask } from "@/models/TaskModel";
import axios from "axios";

const URI = `${process.env.EXPO_PUBLIC_API_URL}/tasks/`;

export const getTasksByProject = (id: string) => {
  return {
    call: axios.get(URI + `project/${id}`),
  };
};

export const getTaskById = (id: string) => {
  return {
    call: axios.get(URI + id),
  };
};

export const createTask = (projectId: string, task: CreateTask) => {
  return {
    call: axios.post(URI + `/${projectId}`, task),
  };
};

export const updateTask = (id: string, task: CreateTask) => {
  return {
    call: axios.put(URI + id, task),
  };
};
