import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleSendOtp = () => {
    fetch('http://127.0.0.1:5000/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
      Alert.alert("OTP Sent", data.message);
      setCurrentStep(2);
    })
    .catch(error => {
      Alert.alert("Error", "Failed to send OTP");
      console.error('Error:', error);
    });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);  // Progresses to the next step
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match!");
      return;
    }

    fetch('http://127.0.0.1:5000/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp,
        password: newPassword,
      }),
    })
    .then(response => response.json())
    .then(data => {
      Alert.alert("Success", data.message);
    })
    .catch(error => {
      Alert.alert("Error", "Failed to reset password");
      console.error('Error:', error);
    });
  };

  return (
    <View style={styles.container}>
      {currentStep === 1 && (
        <>
          <Text style={styles.label}>Enter your email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      )}
      {currentStep === 2 && (
        <>
          <Text style={styles.label}>Enter OTP:</Text>
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
            placeholder="OTP"
            keyboardType="number-pad"
          />
          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </>
      )}
      {currentStep === 3 && (
        <>
          <Text style={styles.label}>Enter New Password:</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry
          />
          <Text style={styles.label}>Confirm New Password:</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', 
  },
  input: {
    width: '100%',
    height: 50, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25, 
    padding: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, 
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', 
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
