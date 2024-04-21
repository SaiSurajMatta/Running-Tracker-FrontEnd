import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignupForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/;
    return regex.test(password);
  };

  const handleSignUp = async () => {
    if (!validatePassword(password)) {
      Alert.alert("Password Validation", "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a special character.");
      return;
    }

    const userData = {
      name: `${firstName} ${middleName} ${lastName}`.trim(),
      dob: dateOfBirth.toISOString().split('T')[0],
      gender: gender,
      address: address,
      email: email,
      password: password
    };

    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', userData);
      if (response.status === 200) {
        Alert.alert('Signup Successful', 'You have successfully signed up.', [
          { text: "OK", onPress: () => navigation.navigate('LoginForm') }
        ]);
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      Alert.alert('Signup Failed', error.response ? error.response.data.message : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          source={{ uri: 'https://i.ibb.co/Rh7ZN19/logo.png' }}
          style={styles.logo}
        />
        <Text style={styles.header}>Sign Up</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter email"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry
        />

        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="Enter first name"
        />

        <Text style={styles.label}>Middle Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMiddleName}
          value={middleName}
          placeholder="Enter middle name (Optional)"
        />

        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Enter last name"
        />

        <Text style={styles.label}>DOB:</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{dateOfBirth.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDateOfBirth(selectedDate);
              }
            }}
          />
        )}

        <Text style={styles.label}>Gender:</Text>
        <View style={styles.select}>
          <TouchableOpacity
            style={[styles.option, gender === 'male' && styles.selectedOption]}
            onPress={() => setGender('male')}
          >
            <Text>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, gender === 'female' && styles.selectedOption]}
            onPress={() => setGender('female')}
          >
            <Text>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, gender === 'other' && styles.selectedOption]}
            onPress={() => setGender('other')}
          >
            <Text>Other</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          value={address}
          placeholder="Enter address"
          multiline
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Sign Up" onPress={handleSignUp} />
        )}

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('LoginForm')}
        >
          <Text style={styles.signInText}>Already Have an Account?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
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
  dateInput: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  select: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
  },
  signInButton: {
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default SignupForm;