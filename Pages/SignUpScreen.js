import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

SplashScreen.preventAutoHideAsync();

const SignupScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const [fullName, setFullName] = useState('');
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

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://192.168.8.100:5000/api/auth/register', {
        fullName,
        email,
        password,
      });
      console.log('User registered:', response.data);
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Login'); // Navigate to Login screen after successful signup
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.createAccount}>Create Account</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#B0B0B0"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#B0B0B0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or Sign Up with</Text>

      <View style={styles.socialButtonContainer}>
        <View style={styles.socialButtonsRow}>
          <TouchableOpacity style={styles.appleButton}>
            <FontAwesome name="apple" size={24} color="black" style={styles.icon} />
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton}>
            <FontAwesome name="google" size={24} color="black" style={styles.icon} />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    justifyContent: 'center',
    backgroundColor: '#FAF9F6',
  },
  header: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 28,
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  createAccount: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 22,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontFamily: 'Roboto_400Regular',
  },
  button: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontFamily: 'Roboto_700Bold',
    color: '#FFF',
    fontSize: 18,
  },
  orText: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
    fontSize: 16,
  },
  socialButtonContainer: {
    alignItems: 'center',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '45%',
    justifyContent: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '45%',
    justifyContent: 'center',
  },
  socialText: {
    fontFamily: 'Roboto_400Regular',
    color: '#333',
    fontSize: 16,
  },
});

export default SignupScreen;
