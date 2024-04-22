import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

const StartScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [activityId, setActivityId] = useState('');
  const timerRef = useRef(null);

  const { userId } = route.params || {};
  
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleStart = async () => {
    if (!title.trim() || !location.trim()) {
        Alert.alert("Error", "Please fill in all fields before starting.");
        return;
    }
    const start = moment().toISOString();
    try {
      const response = await api.post('/startActivity', {
        user_id: userId,
        activity_title: title,
        location: location,
        start_time: start
      });
      if (response.status === 200) {
        Alert.alert("Success", "Activity started successfully!");
        setIsRunning(true);
        setStartTime(start);
        const activityId = response.data[1].activity_id;
        setActivityId(activityId);
        timerRef.current = setInterval(() => {
          setTimer(prevTime => prevTime + 1);
        }, 1000);
      } else {
        throw new Error('Failed to start activity');
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to start activity");
    }
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    const endTime = moment().format('h:mm A');
    navigation.navigate('RunDetails', {
      userId,
      title,
      location,
      start_time: startTime,
      endTime,
      timer,
      activity_id: activityId
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
      <View style={styles.titleBar}>
        <Text style={styles.title}>Start Your Run</Text>
        {isRunning && <Text style={styles.timerText}>{`Timer: ${timer} sec`}</Text>}
      </View>
      <View style={styles.content}>
        <TextInput placeholder="Enter title..." value={title} onChangeText={setTitle} style={styles.input} />
        <TextInput placeholder="Search by name or address..." value={location} onChangeText={setLocation} style={styles.input} />
        <TouchableOpacity style={[styles.button, styles.startButton]} onPress={handleStart}>
          <MaterialCommunityIcons name="run" size={24} color="white" />
          <Text style={styles.buttonText}>START RUN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={handleStop} disabled={!isRunning}>
          <Ionicons name="stop-circle" size={24} color="white" />
          <Text style={styles.buttonText}>STOP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
      <TouchableOpacity onPress={() => handleNavigation('HistoryScreen', { userId: route.params?.userId })}>
          <Ionicons name={activeTab === 'history' ? 'time' : 'time-outline'} size={24} color={activeTab === 'history' ? '#00BFFF' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('HomeScreen', { userId: route.params?.userId })}>
          <Ionicons name={activeTab === 'home' ? 'home' : 'home-outline'} size={24} color={activeTab === 'home' ? '#00BFFF' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('ProfileScreen', { userId: route.params?.userId })}>
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
  timerText: {
    fontSize: 16,
    color: '#FFFFFF',
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
