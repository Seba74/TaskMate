import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

interface AuthProps {
    authState: {authenticated: boolean | null; username: string | null; role: Role | null; userId: number | null};
    onLogin: (username: string, password: string) => void;
    onLogout: () => void;
}
 
const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    
    const [authState, setAuthState] = useState<{
        authenticated: boolean | null,
        username: string | null,
        role: Role | null,
        userId: number  | null,
    }>({
        authenticated: null, role: null, username: null, userId: 0
    });

    const login = (username: string, password: string) => {
        if(username === Role.ADMIN && password === Role.ADMIN){
            setAuthState({
              authenticated: true,
              role: Role.ADMIN,
              username: username,
              userId: 1
            })
        }
        else if(username === Role.USER && password === Role.USER){
            setAuthState({
                authenticated: true,
                role: Role.USER,
                username: username,
                userId: 1
              })
        }
        else{
            Alert.alert("Ups :(", "invalid username or password!");
        }
    }

    const logout = () => {
        setAuthState({
            authenticated: false,
            role: null,
            username: null,
            userId: null
        })
    }

    const value = {
        onLogin: login,
        onLogout: logout,
        authState: authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}