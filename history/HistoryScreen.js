import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HistoryScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState("history"); // Assuming 'FirstTime' is part of 'profile'
  const handleNavigation = (tab) => {
    if (route.name !== tab) {
      setActiveTab(tab);
      navigation.navigate(tab);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>History Screen</Text>
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
    justifyContent: "space-between", // Ensures the nav bar is at the bottom
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF", // Optional, for better visibility
  },
});

export default HistoryScreen;
