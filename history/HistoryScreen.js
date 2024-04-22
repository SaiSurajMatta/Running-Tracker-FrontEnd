import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

const HistoryScreen = ({ route, navigation }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const userId = route.params?.userId;
    console.log(userId)
    if (userId) {
      fetchActivities(userId);
    }
  }, [route.params]);

  const fetchActivities = async (userId) => {
    try {
      const response = await api.get(`/getActivity/${userId}`);
      if (response.status === 200) {
        setActivities(response.data);
      } else {
        console.error('Failed to fetch activities');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error: No activities found
        console.log("No activities found for the given user ID");
        // You can set an appropriate message to display to the user
      } else {
        // Handle other errors
        console.error("Error fetching activities:", error);
        // You can set an appropriate error message or display a generic error
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.screenTitle}>Run History</Text>
        {activities.length > 0 ? activities.map((activity) => (
          <View key={activity.activity_id} style={styles.runContainer}>
            <Text style={styles.runTitle}>{activity.title}</Text>
            <View style={styles.runDetails}>
              <Text style={styles.runText}>Location: {activity.location}</Text>
              <Text style={styles.runText}>Start Time: {activity.start_time}</Text>
              <Text style={styles.runText}>End Time: {activity.end_time}</Text>
              <Text style={styles.runText}>Date: {activity.date}</Text>
              <Text style={styles.runText}>Distance: {activity.distance}</Text>
            </View>
          </View>
        )) : (
          <Text>No activities found</Text>
        )}
      </ScrollView>
      <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen', {userId: route.params?.userId})}>
          <Ionicons name='time' size={24} color='#00BFFF' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name='home-outline' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', {userId: route.params?.userId})}>
          <Ionicons name='person-outline' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  runContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  runTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  runDetails: {
    marginLeft: 10,
  },
  runText: {
    fontSize: 16,
    marginBottom: 4,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
});

export default HistoryScreen;
