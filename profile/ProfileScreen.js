import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PredictionForm from "./PredictionForm";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

const ProfileScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const userId = route.params?.userId;
    console.log("User ID in EditProfileForm:", userId);
    if (userId) {
      fetchUserDetails(userId);
    }
  }, [route.params]);

  const fetchUserDetails = async (userId) => {
    try {
      const userDetailsResponse = await api.get(`/getUserDetails/${userId}`);
      setUserDetails(userDetailsResponse.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const [showOptions, setShowOptions] = useState(false);
  // const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  // const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleLogout = () => {
    navigation.navigate("LoginForm");
  };

  const handleEdit = () => {
    const userId = route.params?.userId;
    console.log("User ID:", userId);
    navigation.navigate("EditProfileForm", { userId });
  };

  const handleNavigation = (tab) => {
    console.log("User ID in Profile screen:", route.params?.userId);
    if (route.name !== tab) {
      setActiveTab(tab);
      navigation.navigate(tab, {userId: route.params?.userId });
    }
  };

  if (loading || !userDetails) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity
          style={styles.threedots}
          onPress={() => setShowOptions(!showOptions)}
          testID="options-toggle"
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {Object.entries(userDetails).map(([key, value]) => (
          <View style={styles.detailsBox} key={key}>
            <Text style={styles.detailLabel}>{key}:</Text>
            <Text style={styles.detail}>{value}</Text>
          </View>
        ))}
        {/* New button to navigate to PredictionForm */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PredictionForm", {userId: route.params?.userId})}
        >
          <Text style={styles.buttonText}>Predict my Performance</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        {showOptions && (
          <View style={styles.options}>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.option}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.option}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => handleNavigation("HistoryScreen", {userId: route.params?.userId})}>
          <Ionicons
            name={activeTab === "history" ? "time" : "time-outline"}
            size={24}
            color={activeTab === "history" ? "#00BFFF" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation("HomeScreen", {userId: route.params?.userId})}>
          <Ionicons
            name={activeTab === "home" ? "home" : "home-outline"}
            size={24}
            color={activeTab === "home" ? "#00BFFF" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation("ProfileScreen", {userId: route.params?.userId})}>
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
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  titleBar: {
    backgroundColor: "#00BFFF",
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    flex: 1,
    textAlign: "center",
  },
  threedots: {
    marginTop: 20,
    marginLeft: "auto",
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  detailsBox: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5,
    width: 100,
  },
  detail: {
    flex: 1,
  },
  button: {
    backgroundColor: "#00BFFF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionsContainer: {
    position: "absolute",
    top: 85,
    right: 10,
    zIndex: 999,
  },
  options: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    elevation: 3,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000000",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default ProfileScreen;
