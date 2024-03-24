import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const FirstTime = ({ navigation }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [frequency, setFrequency] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");

  // Active tab for highlighting the current section in the navigation bar
  const [activeTab, setActiveTab] = useState("profile"); // Assuming 'FirstTime' is part of 'profile'

  const handleSubmit = () => {
    // Save the data or navigate to the next screen
    navigation.navigate("StartScreen");
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
        <Text style={styles.title}>Get Started</Text>
      </View>

      {/* Form Inputs */}
      <View style={styles.formContainer}>
        <Text>It all begins with a small step.</Text>
        <TextInput
          placeholder="Enter height..."
          value={height}
          onChangeText={setHeight}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter weight..."
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter frequency..."
          value={frequency}
          onChangeText={setFrequency}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter fitness level (beginner, intermediate, advanced)"
          value={fitnessLevel}
          onChangeText={setFitnessLevel}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <MaterialCommunityIcons name="run" size={24} color="white" />
          <Text style={styles.buttonText}>START RUN</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Bar */}
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
    justifyContent: "space-between", // Ensures the nav bar is at the bottom
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
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF", // Optional, for better visibility
  },
});

export default FirstTime;
