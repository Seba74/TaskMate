export interface Project {
    id: string,
    name: string, 
    description: string, 
    category: string, 
    privateDescription: string, 
    color: string, 
    image: string | null
    colabollators?: Colaborator[]
}

type Colaborator = {
    username: string,
    avatar: string,
    tasks: Task[],
}

type Task = {
    title: string,
    createdAt: Date,
    finishTask: Date
    description: string,
}