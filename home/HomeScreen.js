import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState("home");
  // Assume this flag is retrieved from persistent storage or user's data
  const isNewUser = true; // Set this to false for existing users

  // Destructure user details from route.params with default values or empty strings
  const {
    email = "",
    firstName = "",
    middleName = "",
    lastName = "",
    dateOfBirth = "",
    gender = "",
    address = "",
  } = route.params || {};

  const handleNavigation = (tab) => {
    if (route.name !== tab) {
      setActiveTab(tab);
      navigation.navigate(tab);
    }
  };

  const handleStartRun = () => {
    if (isNewUser) {
      navigation.navigate("FirstTime");
    } else {
      navigation.navigate("StartScreen");
    }
  };
  const handleLoggingActivity = () => {
    navigation.navigate("LogActivityScreen");
  };

  // Mock data for the sake of display
  const activities = [
    {
      id: 1,
      title: "Long Run",
      location: "Fort Wayne, Indiana",
      distance: "4.58 Miles",
      duration: "0.6 Hours",
      date: "10/21/25",
    },
    // Add more activities as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Running Tracker</Text>
      </View>

      <View style={styles.dashboardCard}>
        <Text style={styles.cardTitle}>Dashboard</Text>
        <View style={styles.mileageContainer}>
          <Text style={styles.mileageNumber}>5.78</Text>
          <Text style={styles.mileageText}>No. of Miles</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleStartRun}>
          <MaterialCommunityIcons name="run" size={24} color="white" />
          <Text style={styles.buttonText}>START NEW RUN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLoggingActivity}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
          <Text style={styles.buttonText}>LOG PREVIOUS ACTIVITY</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activityContainer}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        {activities.map((activity) => (
          <TouchableOpacity key={activity.id} style={styles.activity}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              {/* Left Section */}
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityInfo}>{activity.location}</Text>
                <Text style={styles.activityInfo}>{activity.distance}</Text>
              </View>

              {/* Right Section */}
              <View style={styles.activityDetailsRight}>
                <Text style={styles.activityInfo}>{activity.duration}</Text>
                <Text style={styles.activityInfo}>{activity.date}</Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.showMoreButton} onPress={() => {}}>
        <Text style={styles.showMoreText}>More</Text>
      </TouchableOpacity>

      {/* Fixed Navigation Bar at the bottom */}
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
  mileageContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mileageNumber: {
    fontSize: 36,
    fontWeight: "bold",
  },
  mileageText: {
    fontSize: 16,
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
  logButton: {
    backgroundColor: "#808080",
  },
  activityContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  activity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  activityDetails: {
    flex: 1,
  },
  activityDetailsRight: {
    alignItems: "flex-end",
  },
  activityTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  activityInfo: {
    marginBottom: 5,
  },
  showMoreButton: {
    backgroundColor: "#00BFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  showMoreText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default HomeScreen;