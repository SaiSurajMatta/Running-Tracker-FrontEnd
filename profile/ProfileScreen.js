import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import DropDownPicker from "react-native-dropdown-picker";

const ProfileScreen = ({ navigation, route }) => {
  const {
    email,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    address,
  } = route.params || {};
  const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;

  const [activeTab, setActiveTab] = useState("profile");

  const [showOptions, setShowOptions] = useState(false); 
  // const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  // const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleLogout = () => {
    navigation.navigate('LoginForm');
  };

  const handleEdit = () => {

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
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity
          style={styles.threedots}
          onPress={() => setShowOptions(!showOptions)} // Toggle options visibility
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detail}>{email}</Text>
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detail}>
            {firstName} {middleName ? middleName + " " : ""} {lastName}
          </Text>
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Date of Birth:</Text>
          <Text style={styles.detail}>{formattedDateOfBirth}</Text>
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detail}>{gender}</Text>
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detail}>{address}</Text>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        {showOptions && ( // Render options only if showOptions is true
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
    flex: 1, // Allow the title to take up available space
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
  optionsContainer: {
    position: "absolute",
    top: 85,
    right: 10,
    zIndex: 999, // Ensure options appear above other content
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
    backgroundColor: "#FFFFFF", // Optional, for better visibility
  },
});

export default ProfileScreen;
