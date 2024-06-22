export interface User {
    id: string
    name: string,
    lastname: string,
    email: string,
}

export interface UserSession extends User {
    role: string,
    token: string
}