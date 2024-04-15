import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PredictionForm = ({ navigation }) => {
  const [prevDistance, setPrevDistance] = useState('');
  const [upcomingDistance, setUpcomingDistance] = useState('');
  const [prevTime, setPrevTime] = useState('');

  const handlePredict = () => {
    const t2 = prevTime * (upcomingDistance / prevDistance) ** 1.06; // Riegel's formula
    navigation.navigate('PredictionResult', { predictedTime: t2 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Performance Prediction</Text>
      </View>

      <View style={styles.dashboardCard}>
        <Text style={styles.cardTitle}>Enter Run Details</Text>
        
        <Text style={styles.label}>Previous Run Distance (miles):</Text>
        <TextInput
          style={styles.input}
          value={prevDistance}
          onChangeText={setPrevDistance}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Upcoming Run Distance (miles):</Text>
        <TextInput
          style={styles.input}
          value={upcomingDistance}
          onChangeText={setUpcomingDistance}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Previous Run Time (minutes):</Text>
        <TextInput
          style={styles.input}
          value={prevTime}
          onChangeText={setPrevTime}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handlePredict}>
          <Text style={styles.buttonText}>Predict</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")}>
          <Ionicons name="time-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Ionicons name="person-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
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
  dashboardCard: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 5,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default PredictionForm;
