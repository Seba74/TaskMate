import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { LogBox } from 'react-native';
import { ProjectProvider } from 'context/ProjectContext';

const StackLayout = () => {

  const {authState} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
    const inAuthGroup = segments[0] === "(protected)"

    if(authState?.authenticated && inAuthGroup) {
      router.replace('/');
    }else if(authState?.authenticated === true) {
      router.replace('/(protected)');
    }

  }, [authState])

  return ( 
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: false
      }} />
      <Stack.Screen name='(protected)' options={{
        headerShown: false,
      }} />
    </Stack>
  )
}


export default function RootLayout() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <ProjectProvider>
          <StackLayout />
        </ProjectProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}