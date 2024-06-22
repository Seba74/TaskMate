import { User } from "models/UserModel";

export function userAdapter(user: any): User{
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar ? user.avatar : "https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg",
        email: user.email,
        username: user.username
    }
}