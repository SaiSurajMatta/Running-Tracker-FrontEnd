import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Change this to your actual server IP or hostname
});

const FirstTime = ({ navigation, route }) => {
  const { userId } = route.params; // Receive the userId from navigation parameter

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [frequency, setFrequency] = useState("1");
  const [fitnessLevel, setFitnessLevel] = useState("1");
  const [activeTab, setActiveTab] = useState("profile");

  const handleSubmit = async () => {
  if (!height || !weight || !frequency || !fitnessLevel || !userId) {
    Alert.alert("Error", "Please fill all fields and ensure user is set.");
    return;
  }

  try {
    const response = await api.post('/createFirstActivity', {
      user_id: userId,
      height: height,
      weight: weight,
      frequency: frequency,
      level: fitnessLevel
    });

    if (response.status === 200) {
      Alert.alert("Success", "User details updated and activity ready to start!");
      // Navigate to the StartScreen on success, passing userId along
      navigation.navigate("StartScreen", { userId }); // Ensure to pass userId here
    } else {
      throw new Error('Failed to create activity');
    }
  } catch (error) {
    Alert.alert("Error", error.message || "Failed to save user details");
  }
};


  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Get Started</Text>
      </View>

      <View style={styles.formContainer}>
        <Text>It all begins with a small step.</Text>
        <TextInput
          placeholder="Enter height in cm"
          value={height}
          onChangeText={setHeight}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter weight in lb"
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
        />
        <View style={styles.radioGroup}>
          <Text style={styles.label}>Frequency: How many day(s) per week</Text>
          <View style={styles.radioOptions}>
            {Array.from({ length: 7 }, (_, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.radioButton, frequency === `${i+1}` && styles.radioButtonSelected]}
                onPress={() => setFrequency(`${i+1}`)}
              >
                <Text style={[styles.radioText, frequency === `${i+1}` && styles.radioTextSelected]}>{i+1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.radioGroup}>
          <Text style={styles.label}>Fitness Level:</Text>
          <View style={styles.radioOptions}>
            {['Beginner', 'Intermediate', 'Expert'].map((level, index) => (
              <TouchableOpacity
                key={level}
                style={[styles.radioButton, fitnessLevel === `${index+1}` && styles.radioButtonSelected]}
                onPress={() => setFitnessLevel(`${index+1}`)}
              >
                <Text style={[styles.radioText, fitnessLevel === `${index+1}` && styles.radioTextSelected]}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <MaterialCommunityIcons name="run" size={24} color="white" />
          <Text style={styles.buttonText}>START RUN</Text>
        </TouchableOpacity>
      </View>

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
  radioGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  radioOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#00BFFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  radioButtonSelected: {
    backgroundColor: "#00BFFF",
  },
  radioText: {
    color: "#00BFFF",
    fontSize: 14,
  },
  radioTextSelected: {
    color: "#FFFFFF",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default FirstTime;
