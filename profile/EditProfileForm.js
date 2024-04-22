// EditProfileForm.js

import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import axios from "axios";

// const api = axios.create({
//   baseURL: "http://10.0.0.193:5000",
// });

const EditProfileForm = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  //const userDetails = route.params?.userDetails || {};
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    height: "",
    weight: "",
    frequency: "",
    level: "",
  });

  useEffect(() => {
    const userId = route.params?.userId;
    if (userId) {
      fetchUserDetails(userId);
    }
  }, [route.params]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/getUserDetails/${userId}`
      );
      const userDetails = response.data;
      setFormData(userDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async (userId) => {
    console.log("User ID:", userId);
    try {
      // Make API call to update user details
      let formattedDate = formData.dob;
      if (typeof formData.dob === "string") {
        formattedDate = new Date(formData.dob);
      }
      formattedDate = formattedDate.toISOString().split("T")[0];
      console.log(formattedDate)
      const updatedFormData = { ...formData, dob: formattedDate };
      console.log(updatedFormData)
      const response = await axios.post(
        `http://127.0.0.1:5000/editUser/${userId}`,
        updatedFormData
      );
      console.log(formData);
      if (response.status === 200) {
        Alert.alert("Update Successful", "User details updated successfully.", [
          { text: "OK", onPress: () => navigation.navigate("ProfileScreen", { userId }) },
        ]);
      } else {
        throw new Error("Update failed");
      }
      // Navigate back to ProfileScreen
      navigation.navigate("ProfileScreen", { userId });
    } catch (error) {
      console.error("Error updating user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const userId = route.params?.userId; // Retrieve the user ID
    navigation.navigate("ProfileScreen", { userId }); // Pass the user ID when navigating back
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{formData.dob}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date(formData.dob)}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setFormData({
                ...formData,
                dob: selectedDate.toISOString().split("T")[0],
              });
            }
          }}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={formData.gender}
        onChangeText={(text) => setFormData({ ...formData, gender: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={formData.height}
        onChangeText={(text) => setFormData({ ...formData, height: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={formData.weight}
        onChangeText={(text) => setFormData({ ...formData, weight: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Exercise Frequency"
        value={formData.frequency}
        onChangeText={(text) => setFormData({ ...formData, frequency: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Fitness Level"
        value={formData.level}
        onChangeText={(text) => setFormData({ ...formData, level: text })}
      />
      {/* Add more TextInput components for other fields as needed */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSaveChanges(route.params?.userId)}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00BFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateInput: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditProfileForm;
