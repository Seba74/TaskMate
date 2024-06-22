import { User } from "@/models/UserModel";

export function userAdapter(user: any): User{
    return {
        name: user.name,
        lastname: user.last_name,
        email: user.email,
        id: user.id
    }
}