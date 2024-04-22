import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';  // Make sure to import moment if you haven't already

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

const RunDetails = ({ route, navigation }) => {
  const { endTime, timer, title, location, userId, start_time, activity_id } = route.params;
  const [activeTab, setActiveTab] = useState('home');
  const [activityDetails, setActivityDetails] = useState({
    user_id: userId,
    activity_id: activity_id,
    date: new Date().toISOString().split('T')[0], // Use moment to ensure correct formatting if necessary
    end_time: endTime,
    distance: ''
  });

  const handleChange = (name, value) => {
    setActivityDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Sending data to /endActivity:", activityDetails);

    try {
      const response = await api.post('/endActivity', {
        user_id: activityDetails.user_id,
        activity_id: activityDetails.activity_id,
        date: activityDetails.date,
        end_time: activityDetails.end_time,
        distance: activityDetails.distance
      });
      if (response.status === 200) {
        Alert.alert("Success", "Activity completed successfully!");
        navigation.navigate('HistoryScreen', { userId: userId });
        // onPress={() => navigation.navigate('HistoryScreen', { userId: user })}

      } else {
        throw new Error('Failed to complete activity');
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to complete activity");
    }
  };

  const handleNavigation = (tab) => {
    if (route.name !== tab) {
      setActiveTab(tab);
      navigation.navigate(tab);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Run Details</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text>Activity Title: {title}</Text>
        <Text>Location: {location}</Text>
        <Text>Start Time: {moment(start_time).format('LT')}</Text>
        <Text>Date: {activityDetails.date}</Text>
        <Text>End Time: {activityDetails.end_time}</Text>
        <TextInput
          placeholder="Enter distance (miles)"
          value={activityDetails.distance}
          onChangeText={(value) => handleChange('distance', value)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => handleNavigation('HistoryScreen')}>
          <Ionicons name={activeTab === 'history' ? 'time' : 'time-outline'} size={24} color={activeTab === 'history' ? '#00BFFF' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('HomeScreen')}>
          <Ionicons name={activeTab === 'home' ? 'home' : 'home-outline'} size={24} color={activeTab === 'home' ? '#00BFFF' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('ProfileScreen')}>
          <Ionicons name={activeTab === 'profile' ? 'person' : 'person-outline'} size={24} color={activeTab === 'profile' ? '#00BFFF' : 'black'} />
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
});

export default RunDetails;
