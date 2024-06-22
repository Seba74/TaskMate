import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

// context
import { useAuth } from "@/context/AuthContext";
import { defaultStyles } from "styles";

// Services and hooks
import { loginUserService } from "@/services/authSerivice";
import { useFetchAndLoader } from "@/hooks/useFetchAndLoader";
import { showToast } from "components/Toast";
import { Button } from "native-base";
import { userAdapter } from "@/adapters/UserAdapter";

export default function Auth() {
  // context
  const { onLogin } = useAuth();

  const logo = require("@/assets/icon.png");
  const [username, setUsername] = useState("byocti@example.com");
  const [password, setPassword] = useState("123456789");
  const [session, setSession] = useState(false);
  const { callEndpoint, loading } = useFetchAndLoader();

  const handleLogin = async () => {
    // validate inputs
    if (!username.trim() || !password.trim()) {
      showToast({
        type: "error",
        title: "ERROR",
        description: "email y contrasena son requeridos",
      });

      return;
    }

    const res = await callEndpoint(loginUserService({ username, password }));

    const user = userAdapter(res.data.user);

    // handle login context
    onLogin!(user, res.data.token, session);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Usuario o Email"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={session}
            onValueChange={setSession}
            trackColor={{ true: "green", false: "gray" }}
          />
          <Text style={styles.rememberText}> Mantener Sesion </Text>
        </View>
      </View>

      <Button
        style={styles.button}
        isLoading={loading}
        isLoadingText=""
        onPress={handleLogin}
      >
        Iniciar Sesión
      </Button>

      <Text style={styles.footerText}>
        No tienes una cuenta?<Text style={styles.signup}> Sign Up</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    ...defaultStyles.container,
  },
  image: {
    height: 220,
    width: 220,
    marginBottom: 40,
  },
  title: {
    alignSelf: "flex-start",
    paddingHorizontal: 40,
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 20,
    color: "darkcyan",
  },
  inputView: {
    gap: 16,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "darkcyan",
    borderWidth: 1,
    borderRadius: 7,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  switch: {
    marginVertical: 4,
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: "darkcyan",
  },
  button: {
    backgroundColor: "darkcyan",
    height: 45,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "gray",
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    marginTop: 14,
    textAlign: "center",
    color: "gray",
  },
  signup: {
    color: "darkcyan",
    fontSize: 13,
  },
});
