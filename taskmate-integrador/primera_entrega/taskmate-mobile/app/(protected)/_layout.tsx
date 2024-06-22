import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';


export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer screenOptions={{
            drawerActiveTintColor: "darkcyan",        
            drawerInactiveTintColor: "#36454F",
            headerTintColor: "darkcyan",
            // overlayColor: "#36454F" ,
          }}>
            <Drawer.Screen
              name="index" 
              options={{
                drawerLabel: 'Home',
                title: 'Dashboard',
                drawerIcon: ()  => <MaterialIcons name="home" size={25} color="darkcyan" />
              }}
            />

            <Drawer.Screen
              name="notifications" 
              options={{
                drawerLabel: 'Notifications',
                title: 'My Notifications',
                drawerIcon: ()  => <MaterialIcons name="notifications" size={25} color="darkcyan" />
              }}
            />

            <Drawer.Screen
              name="myprojects" 
              options={{
                drawerLabel: 'Projects',
                title: 'All Projects',
                drawerIcon: ()  => <MaterialIcons name="auto-awesome-motion" size={25} color="darkcyan" />
              }}
            />

            <Drawer.Screen
              name="newproject" 
              options={{
                drawerLabel: 'Create Project',
                title: 'Create Project',
                drawerIcon: ()  => <MaterialIcons name="playlist-add" size={25} color="darkcyan" />
              }}
            />

            <Drawer.Screen
              name="settings" 
              options={{
                drawerLabel: 'Settings',
                title: 'My Settings',
                drawerIcon: ()  => <MaterialIcons name="settings" size={25} color="darkcyan" />
              }}
            />

            <Drawer.Screen
              name="logout" 
              options={{
                drawerLabel: 'Logout',
                title: 'Logout',
                drawerIcon: ()  => <MaterialIcons name="logout" size={25} color="darkcyan" />
              }}
            />
        </Drawer>
    </GestureHandlerRootView>
  );
}