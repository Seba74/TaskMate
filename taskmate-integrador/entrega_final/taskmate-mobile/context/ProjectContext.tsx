import { Task } from "@/models/TaskModel";
import { Collaborator, Project, ProjectWithTasks } from "models/ProjectModel";
import { createContext, useContext, useState } from "react";

interface ProjectProps {
  myProjects: Project[];
  project: ProjectWithTasks | null;
  createProject: (data: Project) => void;
  loadMyProjects: (myProjects: Project[]) => void;
  loadProject: (project: ProjectWithTasks) => void;
  addTaskProject: (newTask: Task) => void;
  editTaskProject: (taskEdited: Task) => void;
}

const ProjectContext = createContext<Partial<ProjectProps>>({});

export const useProjectContext = () => {
  return useContext(ProjectContext);
};

export const ProjectProvider = ({ children }: any) => {
  const [myProjectState, setMyProjectState] = useState<Array<Project> | []>([]);
  const [project, setProject] = useState<ProjectWithTasks | null>(null);

  const createProject = (data: Project) => {
    setMyProjectState([data, ...myProjectState]);
  };

  const loadMyProjects = (myProjects: Project[]) => {
    setMyProjectState(myProjects);
  };

  const addTaskProject = (newTask: Task) => {
    if (project) {
      setProject({
        ...project,
        tasks: [...project.tasks, newTask],
      });
    }
  };

  const editTaskProject = (taskEdited: Task) => {
    if (project) {
      const filterTasks = project.tasks.filter(
        (task: Task) => task.id !== taskEdited.id
      );

      setProject({
        ...project,
        tasks: [...filterTasks, taskEdited],
      });
    }
  };

  const loadProject = (project: ProjectWithTasks) => {
    setProject(project);
  };

  const value: ProjectProps = {
    myProjects: myProjectState,
    project: project,
    createProject,
    loadMyProjects,
    loadProject,
    addTaskProject,
    editTaskProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
