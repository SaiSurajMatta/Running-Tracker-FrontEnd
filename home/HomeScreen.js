import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

const HomeScreen = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [isNewUser, setIsNewUser] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (route.params?.email && route.params?.password) {
      loginAndFetchData(route.params.email, route.params.password);
    }
  }, [route.params]);

  const loginAndFetchData = async (email, password) => {
    setLoading(true);
    try {
      const loginResponse = await api.post('/login', { email, password });
      if (loginResponse.data[0] === "Login successful") {
        const userId = loginResponse.data[1].user_id;
        setUser(userId);
        fetchActivities(userId);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async (userId) => {
    try {
      const activitiesResponse = await api.get(`/getActivity/${userId}`);
      if (activitiesResponse.data.length > 0) {
        setActivities(activitiesResponse.data);
        const sum = activitiesResponse.data.reduce((acc, activity) => acc + (parseFloat(activity.distance) || 0), 0);
        setTotalDistance(sum.toFixed(2));
        setIsNewUser(false);
      } else {
        setIsNewUser(true);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

    const handleNavigation = (tab) => {
        setActiveTab(tab);
        navigation.navigate(tab);
    };

    const handleStartRun = () => {
        if (isNewUser) {
            navigation.navigate("FirstTime", {userId: user}); // Pass user ID to FirstTime screen
        } else {
            navigation.navigate("StartScreen", {userId: user});
        }
    };

    const handleLoggingActivity = () => {
        navigation.navigate("LogActivityScreen", {userId: user});
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Running Tracker</Text>
            </View>

            <View style={styles.dashboardCard}>
                <Text style={styles.cardTitle}>Dashboard</Text>
                <View style={styles.mileageContainer}>
                    <Text style={styles.mileageNumber}>{totalDistance}</Text>
                    <Text style={styles.mileageText}>Total No. of Miles</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleStartRun}>
                    <MaterialCommunityIcons name="run" size={24} color="white"/>
                    <Text style={styles.buttonText}>START NEW RUN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLoggingActivity}>
                    <MaterialCommunityIcons name="plus" size={24} color="white"/>
                    <Text style={styles.buttonText}>LOG PREVIOUS ACTIVITY</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.activityContainer}>
                <Text style={styles.sectionTitle}>Recent Activities</Text>
                {
                    activities
                        .slice(0, 1)
                        .map((activity) => (
                            <TouchableOpacity
                                key={activity.activity_id}
                                style={styles.activity}
                                onPress={() => handleNavigation('HistoryScreen')}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        flex: 1
                                    }}>
                                    <View style={styles.activityDetails}>
                                        <Text style={styles.activityTitle}>{activity.title}</Text>
                                        <Text style={styles.activityInfo}>{activity.location}</Text>
                                        <Text style={styles.activityInfo}>{activity.distance}
                                            Miles</Text>
                                    </View>
                                    <View style={styles.activityDetailsRight}>
                                        <Text style={styles.activityInfo}>{activity.end_time}</Text>
                                        <Text style={styles.activityInfo}>{activity.date}</Text>
                                    </View>
                                </View>
                                <MaterialCommunityIcons name="chevron-right" size={24} color="#000"/>
                            </TouchableOpacity>
                        ))
                }
            </View>

            {/* <TouchableOpacity style={styles.showMoreButton} onPress={() => handleNavigation('HistoryScreen')}>
        <Text style={styles.showMoreText}>More</Text>
      </TouchableOpacity> */
            }

            {/* Fixed Navigation Bar at the bottom */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => handleNavigation('HistoryScreen')}>
                    <Ionicons
                        name={activeTab === 'history'
                            ? 'time'
                            : 'time-outline'}
                        size={24}
                        color={activeTab === 'history'
                            ? '#00BFFF'
                            : 'black'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleNavigation('HomeScreen')}>
                    <Ionicons
                        name={activeTab === 'home'
                            ? 'home'
                            : 'home-outline'}
                        size={24}
                        color={activeTab === 'home'
                            ? '#00BFFF'
                            : 'black'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleNavigation('ProfileScreen')}>
                    <Ionicons
                        name={activeTab === 'profile'
                            ? 'person'
                            : 'person-outline'}
                        size={24}
                        color={activeTab === 'profile'
                            ? '#00BFFF'
                            : 'black'}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    titleBar: {
        backgroundColor: "#00BFFF",
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "flex-end",
        height: 100
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 10
    },
    dashboardCard: {
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        padding: 10,
        margin: 20
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20
    },
    mileageContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    mileageNumber: {
        fontSize: 36,
        fontWeight: "bold"
    },
    mileageText: {
        fontSize: 16
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#00BFFF",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    buttonText: {
        color: "#FFFFFF",
        marginLeft: 10
    },
    logButton: {
        backgroundColor: "#808080"
    },
    activityContainer: {
        marginTop: 0,
        paddingHorizontal: 20,
        marginBottom: 0
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "bold",
        // marginBottom: 10,
        marginLeft: 10
    },
    activity: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10
    },
    activityDetails: {
        flex: 1
    },
    activityDetailsRight: {
        alignItems: "flex-end"
    },
    activityTitle: {
        fontWeight: "bold",
        marginBottom: 5
    },
    activityInfo: {
        marginBottom: 5
    },
    showMoreButton: {
        backgroundColor: "#00BFFF",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 150,
        marginBottom: 0,
        marginTop: 0
    },
    showMoreText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold"
    },
    navBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        backgroundColor: "#FFFFFF"
    }
});
export default HomeScreen;