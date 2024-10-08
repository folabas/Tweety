import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('Home');
  };

  const handleForgotPassword = () => {
    console.log('Navigate to Forgot Password screen');
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.header}>Log In</Text>
      <Text style={styles.welcomeText}>Welcome Back</Text>

      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    justifyContent: 'flex-start', 
    backgroundColor: '#F8F4E6', 
  },
  header: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontFamily: 'Roboto_400Regular',
    backgroundColor: '#ffffff',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: 'blue',
  },
  button: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Roboto_700Bold',
    color: '#FFF',
    fontSize: 18,
  },
});

export default LoginScreen;
