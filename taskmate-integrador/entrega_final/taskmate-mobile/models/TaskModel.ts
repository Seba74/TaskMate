export interface CreateTask {
  description: string,
  endDate: Date,
  collaborators?: Array<string>,
  taskStatus?: string,
}

export interface Task {
  id: string;
  endDate: Date;
  description: string;
  collaboratorsOnTasks: Array<CollaboratorOnTask>;
  taskResources: Array<TaskResource>;
  taskStatus: TaskStatus;
}

type CollaboratorOnTask = {
  collaborator: Collaborator;
}

type TaskResource = {
  id: string;
  description: string;
  path: string;
}

type TaskStatus = {
  description: string;
}

type Collaborator = {
  id: string;
  user: User;
};

type User = {
  id: string;
  name: string;
  last_name: string;
  profile_picture: string;
};