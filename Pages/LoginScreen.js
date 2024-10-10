import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Switch } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // On component mount, check if email and password are saved
  useEffect(() => {
    loadRememberedCredentials();
  }, []);

  // Load saved credentials from AsyncStorage if they exist
  const loadRememberedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');
      const rememberMeStatus = await AsyncStorage.getItem('rememberMe') === 'true';

      if (rememberMeStatus) {
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.log('Error loading remembered credentials:', error);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://192.168.8.100:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful:', data.accessToken);
      
      // Remember the credentials if the switch is toggled
      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('rememberMe', 'true');
      } else {
        // Clear credentials if "Remember Me" is off
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('rememberMe');
      }

      // Show a success message
      Alert.alert('Success', 'Login Successful', [{ text: 'OK' }]);

      // Navigate to Home after showing the alert
      setTimeout(() => {
        navigation.navigate('Home');
      }, 3000); // Navigate after 3 seconds

    } catch (error) {
      setError(error.message);
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Navigate to Forgot Password screen');
  };

  const toggleRememberMe = () => setRememberMe(previousState => !previousState);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.header}>Log In</Text>
      <Text style={styles.welcomeText}>Welcome Back</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

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

      <View style={styles.rememberMeContainer}>
        <Text style={styles.rememberMeText}>Remember Me</Text>
        <Switch
          value={rememberMe}
          onValueChange={toggleRememberMe}
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
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
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberMeText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen;
