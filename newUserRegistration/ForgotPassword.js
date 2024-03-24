import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentStep, setCurrentStep] = useState(1); 

  const handleSendOtp = () => {
    setCurrentStep(2);
  };

  const handleVerifyOtp = () => {
    setCurrentStep(3);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert('Password has been reset successfully!');
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
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
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
