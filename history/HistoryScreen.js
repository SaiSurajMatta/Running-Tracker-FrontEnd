import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Example static data for UI demonstration
const previousRuns = [
  {
    id: 1,
    title: 'Morning Run',
    distance: '5 miles',
    duration: '30 minutes',
    date: '2024-04-03',
  },
  {
    id: 2,
    title: 'Evening Run',
    distance: '3 miles',
    duration: '18 minutes',
    date: '2024-04-02',
  },
  // Add more runs as needed
];

const HistoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.screenTitle}>Run History</Text>
        {previousRuns.map((run) => (
          <View key={run.id} style={styles.runContainer}>
            <Text style={styles.runTitle}>{run.title}</Text>
            <View style={styles.runDetails}>
              <Text style={styles.runText}>Distance: {run.distance}</Text>
              <Text style={styles.runText}>Duration: {run.duration}</Text>
              <Text style={styles.runText}>Date: {run.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Ionicons name='time' size={24} color='#00BFFF' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name='home-outline' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
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
