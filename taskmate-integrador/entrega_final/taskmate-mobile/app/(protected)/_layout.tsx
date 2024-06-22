import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useRouter } from "expo-router";

// Context
import { useAuth } from "context/AuthContext";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import UserHeader from "@/components/UserHeader";

// pages
import Home from "./index";
import Projects from "./projects/myprojects";
import Settings from "./settings";
import NewProject from "./projects/newproject";
import Logout from "./logout";
import ProjectTasks from "./projects/tasks/[id]";
import Project from "./projects/[id]"

const Drawer = createDrawerNavigator();

//@ts-ignore
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <UserHeader />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authState?.token) {
      router.replace("/");
    } else if (authState?.token) {
      router.replace("/(protected)");
    }
  }, [authState]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          headerRight: () =>
            router.canGoBack() && (
              <AntDesign style={{marginRight:10}} name="arrowleft" size={24} color="black" onPress={() => navigation.goBack()} />
            ),
          drawerActiveTintColor: "darkcyan",
          drawerInactiveTintColor: "#36454F",
          headerTintColor: "darkcyan",
        })}
      >
        <Drawer.Screen
          component={Home}
          name="index"
          options={{
            drawerLabel: "Inicio",
            title: "Inicio",
            drawerIcon: () => (
              <MaterialIcons name="home" size={25} color="darkcyan" />
            ),
          }}
        />

        {/* Projects  */}
        <Drawer.Screen
          component={Projects}
          name="projects/myprojects"
          options={{
            drawerLabel: "Proyectos",
            title: "Proyectos",
            drawerIcon: () => (
              <MaterialIcons
                name="auto-awesome-motion"
                size={25}
                color="darkcyan"
              />
            ),
          }}
        />

        <Drawer.Screen
          component={Project}
          name="projects/[id]"
          options={{
            drawerLabel: "Proyecto Descripcion",
            title: "Proyecto Descripcion",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />

        <Drawer.Screen
          component={NewProject}
          name="projects/newproject"
          options={{
            drawerLabel: "Nuevo Proyecto",
            title: "Nuevo Proyecto",
            drawerIcon: () => (
              <MaterialIcons name="playlist-add" size={25} color="darkcyan" />
            ),
          }}
        />

        {/* Tasks  */}
        <Drawer.Screen
          component={ProjectTasks}
          name="projects/tasks/[id]"
          options={{
            drawerLabel: "Id",
            title: "Tablero Tarea",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />


        <Drawer.Screen
          component={Settings}
          name="settings"
          options={{
            drawerLabel: "Configuraciones",
            title: "Configuraciones",
            drawerIcon: () => (
              <MaterialIcons name="settings" size={25} color="darkcyan" />
            ),
          }}
        />

        <Drawer.Screen
          component={Logout}
          name="logout"
          options={{
            drawerLabel: "Cerrar Sesion",
            title: "Cerrar Sesion",
            drawerIcon: () => (
              <MaterialIcons name="logout" size={25} color="darkcyan" />
            ),
          }}
        />

      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
}
