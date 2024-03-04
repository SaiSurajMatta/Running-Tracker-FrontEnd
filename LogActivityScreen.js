import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LogActivityScreen = ({ navigation }) => {
  const [activityTitle, setActivityTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');

  const handleLogActivity = () => {
    // Implement logic to handle logging of the activity
    // You can save the data, navigate to another screen, or perform other actions
    // For now, just log the data to the console
    console.log({
      activityTitle,
      location,
      date,
      duration,
    });

    // Navigate back to the home screen after logging the activity
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Previous Activity</Text>
      <TextInput
        placeholder="Activity Title"
        value={activityTitle}
        onChangeText={setActivityTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Date"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogActivity}>
        <Text style={styles.buttonText}>LOG ACTIVITY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default LogActivityScreen;
