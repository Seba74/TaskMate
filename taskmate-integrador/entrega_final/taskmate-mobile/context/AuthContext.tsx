import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserSession } from "@/models/UserModel";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

interface AuthProps {
  authState: UserSession | null;
  onLogin: (username: User, token: string, session: boolean) => void;
  onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<UserSession | null>(null);

  const login = async (userData: User, token: string, session: boolean) => {
    const user = {
      ...userData,
      role: Role.ADMIN,
      token,
    };

    setAuthState(user);

    if (session) {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    setAuthState(null);
  };

  useEffect(() => {
    AsyncStorage.getItem("@user").then((value) => {
      if (value) {
        setAuthState(JSON.parse(value));
      }
    });
  }, []);

  const value = {
    onLogin: login,
    onLogout: logout,
    authState: authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
