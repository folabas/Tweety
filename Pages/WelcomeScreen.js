import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

const backgroundImage = require("../assets/background.jpg");

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} />

      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor, opacity: 0.9 }]}
      >
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: theme.textColor }]}>
            Tweety
          </Text>
          <Text style={[styles.tagline, { color: theme.textColor }]}>
            Meet. Befriend. Stay Close.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.buttonColor }]}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={[styles.buttonText, { color: theme.textColor }]}>
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[styles.buttonText, { color: theme.textColor }]}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 120,
  },
  logoText: {
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
  },
  tagline: {
    fontSize: 20,
    fontStyle: "italic",
    marginTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: 50,
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 5,
    marginVertical: 10,
    width: "80%",
  },
  loginButton: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginVertical: 10,
    width: "80%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#fff",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default WelcomeScreen;
