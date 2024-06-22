import { Task } from "@/models/TaskModel";
import { createContext, useContext, useState } from "react";

interface TaskProps {
  tasks: Task[];
  loadTasks: (myTasks: Task[]) => void;
}

const TaskContext = createContext<Partial<TaskProps>>({});

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }: any) => {
  const [taskState, setTaskState] = useState<Array<Task> | []>([]);

  const loadTasks = (myTasks: Task[]) => {
    setTaskState(myTasks);
  };

  const value: TaskProps = {
    tasks: taskState,
    loadTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
