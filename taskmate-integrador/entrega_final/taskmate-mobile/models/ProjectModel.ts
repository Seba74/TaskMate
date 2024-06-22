import { Task } from "./TaskModel";

export interface CreateProjectModel {
  title: "";
  description: "";
  image?: any;
}

export interface ProjectWithTasks extends Project {
  tasks: Task[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  project_picture: string;
  collaborators: Array<Collaborator>;
  createdAt: string;
}

export type Collaborator = {
  id: string;
  user: User;
  collaboratorsOnTasks?: CollaboratorOnTask[];
  role?: Role;
};

type Role = {
  description: string;
};

type User = {
  id: string;
  name: string;
  last_name: string;
  profile_picture: string;
};

type CollaboratorOnTask = {
  taskId: string;
};
