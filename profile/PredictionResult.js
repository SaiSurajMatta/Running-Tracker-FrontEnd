import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PredictionResult = ({ route, navigation }) => {
  const { predictedTime } = route.params;


  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Race Performance Prediction</Text>
      </View>
      <View style={styles.dashboardCard}>
        <Text style={styles.resultText}>Predicted Time for Upcoming Run:</Text>
        <Text style={styles.time}>{predictedTime.toFixed(2)} minutes</Text>
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen", {userId: route.params?.userId})}>
          <Ionicons name="time-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen", {userId: route.params?.userId})}>
          <Ionicons name="person-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleBar: {
    backgroundColor: "#00BFFF",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  dashboardCard: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  time: {
    fontSize: 24,
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default PredictionResult;
