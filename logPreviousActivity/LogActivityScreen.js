import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

const LogActivityScreen = ({ navigation, route }) => {
  const [activityTitle, setActivityTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [distance, setDistance] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [activeTab, setActiveTab] = useState('home');

  const handleDatePickerChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Hide picker on Android after selection
    if (datePickerMode === 'date') {
      setDate(currentDate);
    } else if (datePickerMode === 'start') {
      setStartTime(currentDate);
    } else {
      setEndTime(currentDate);
    }
  };

  const showMode = (mode) => {
    setShowDatePicker(true);
    setDatePickerMode(mode);
  };

  const handleSubmit = async () => {
    // Call /startActivity API
    try {
      const startResponse = await api.post('/startActivity', {
        user_id: route.params.userId,
        activity_title: activityTitle,
        location: location,
        start_time: startTime.toISOString()
      });
      if (startResponse.status === 200 && startResponse.data) {
        // Call /endActivity API with the obtained activity_id
        const activityId = startResponse.data[1].activity_id;
        const endResponse = await api.post('/endActivity', {
          user_id: route.params.userId,
          activity_id: activityId,
          date: date.toISOString().split('T')[0],
          end_time: endTime.toISOString(),
          distance: distance
        });
        if (endResponse.status === 200) {
          Alert.alert("Success", "Activity logged successfully!");
          navigation.navigate("HistoryScreen", { userId: route.params.userId });
          // onPress={() => navigation.navigate('HistoryScreen', { userId: user })}

        } else {
          throw new Error('Failed to end activity');
        }
      } else {
        throw new Error('Failed to start activity');
      }
    } catch (error) {
      Alert.alert("Error", error.message);
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
        <Text style={styles.title}>Log Previous Activity</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput placeholder="Activity Title" value={activityTitle} onChangeText={setActivityTitle} style={styles.input} />
        <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
        <TouchableOpacity style={styles.input} onPress={() => showMode('date')}>
          <Text style={styles.inputText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={() => showMode('start')}>
          <Text style={styles.inputText}>{startTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={() => showMode('end')}>
          <Text style={styles.inputText}>{endTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        <TextInput placeholder="Distance (in miles)" value={distance} onChangeText={setDistance} style={styles.input} />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <MaterialCommunityIcons name="run" size={24} color="white" />
          <Text style={styles.buttonText}>LOG ACTIVITY</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={datePickerMode === 'date' ? date : datePickerMode === 'start' ? startTime : endTime}
          mode={datePickerMode === 'date' ? 'date' : 'time'}
          is24Hour={true}
          display="default"
          onChange={handleDatePickerChange}
        />
      )}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => handleNavigation("HistoryScreen")}>
          <Ionicons
            name={activeTab === "history" ? "time" : "time-outline"}
            size={24}
            color={activeTab === "history" ? "#00BFFF" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation("HomeScreen")}>
          <Ionicons
            name={activeTab === "home" ? "home" : "home-outline"}
            size={24}
            color={activeTab === "home" ? "#00BFFF" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation("ProfileScreen")}>
          <Ionicons
            name={activeTab === "profile" ? "person" : "person-outline"}
            size={24}
            color={activeTab === "profile" ? "#00BFFF" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#00BFFF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    marginLeft: 10,
  },
  titleBar: {
    backgroundColor: "#00BFFF",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  inputText: { // Add style for the text in the input
    fontSize: 16
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default LogActivityScreen;
