import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const StartScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('profile'); // Assuming 'home' is the active tab for demonstration

  const handleStart = () => {
    // Start the timer or tracking functionality
    // ...
  };

  const handleStop = () => {
    navigation.navigate('RunDetails', {
      // Pass any relevant data for the run
    });
  };

  const handleNavigation = (tab) => {
    if (route.name !== tab) {
      setActiveTab(tab);
      navigation.navigate(tab);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.titleBar}>
        <Text style={styles.title}>Start Your Run</Text>
      </View>

      {/* Input fields and buttons */}
      <View style={styles.content}>
        <TextInput 
          placeholder="Enter title..."
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput 
          placeholder="Search by name or address..."
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
        {/* New TouchableOpacity components for a styled appearance */}
      <TouchableOpacity style={[styles.button, styles.startButton]} onPress={handleStart}>
        <MaterialCommunityIcons name="run" size={24} color="white" />
        <Text style={styles.buttonText}>START RUN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={handleStop}>
        <Ionicons name="stop-circle" size={24} color="white" />
        <Text style={styles.buttonText}>STOP</Text>
      </TouchableOpacity>
      </View>

      {/* Fixed Navigation Bar at the bottom */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => handleNavigation('HistoryScreen')}>
          <Ionicons
            name={activeTab === 'history' ? 'time' : 'time-outline'}
            size={24}
            color={activeTab === 'history' ? '#00BFFF' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('HomeScreen')}>
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={24}
            color={activeTab === 'home' ? '#00BFFF' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('ProfileScreen')}>
          <Ionicons
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={24}
            color={activeTab === 'profile' ? '#00BFFF' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 10,
  },
  titleBar: {
    backgroundColor: '#00BFFF',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
});

export default StartScreen;