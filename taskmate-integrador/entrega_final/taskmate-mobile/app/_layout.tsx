import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "../context/AuthContext";
import { ProjectProvider } from "context/ProjectContext";
import { TaskProvider } from "@/context/TaskContext";
import AxiosInterceptors from "@/interceptors/axios.interceptor"
import Toast from "react-native-toast-message";

import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <ProjectProvider>
          <TaskProvider>
            <AxiosInterceptors />
            <StackLayout />
          </TaskProvider>
        </ProjectProvider>
      </AuthProvider>
      <Toast />
    </NativeBaseProvider>
  );
}

const StackLayout = () => {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authState?.token) {
      router.replace("/");
    } else if (authState?.token) {
      router.replace("/(protected)");
    }
  }, [authState, router]);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Toast />
    </>
  );
};
