import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

/**
 * Represents a form component for user login.
 * 
 * @param {object} props - The properties passed to the component.
 * @param {object} props.navigation - The navigation object to navigate between screens.
 * @returns {JSX.Element} LoginForm component JSX markup.
 */
const LoginForm = ({ navigation }) => {
  /**
   * Navigates to the signup form screen.
   */
  const handleSignupNavigation = () => {
    navigation.navigate('SignupForm');
  };

  // JSX markup for LoginForm component
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.ibb.co/Rh7ZN19/logo.png' }}
        style={styles.logo}
      />

      <Text style={styles.header}>Login</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
      />

      <Button title="Login" onPress={() => {}} />

      {/* Sign up button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignupNavigation}>
        <Text style={styles.signInText}>New to the app? Sign up</Text>
      </TouchableOpacity>

      {/* Forgot Password button */}
      <TouchableOpacity onPress={() => alert('Forgot Password?')}>
        <Text style={styles.forgotPasswordTextButton}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * StyleSheet for styling the LoginForm component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  signInButton: {
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  // Style for the Forgot Password button
  forgotPasswordTextButton: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginTop: 10, // Adjust the margin as needed
  },
});

export default LoginForm;
