import axios from "axios";

const URI = `${process.env.EXPO_PUBLIC_API_URL}/auth`

export const loginUserService = ({username, password}: {username: string, password: string}) => {
    return {
        call: axios.post(`${URI}/login`, {
            email: username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}