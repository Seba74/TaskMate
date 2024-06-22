import { Task } from "@/models/TaskModel";

export const taskAdapter = (data: Task): Task => {
  return {
    id: data.id,
    description: data.description,
    taskStatus: data.taskStatus,
    taskResources: data.taskResources,
    collaboratorsOnTasks: data.collaboratorsOnTasks,
    endDate: data.endDate,
  };
};

export const tasksAdapter = (data: Task[]): Task[] => {
    return data.map(task => taskAdapter(task));
};
