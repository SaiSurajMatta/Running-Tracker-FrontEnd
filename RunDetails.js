// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const RunDetails = ({ route, navigation }) => {
//   // Uncomment the below line and the useEffect import when ready to fetch data from an API
//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   // Dummy data for display purposes
//   const dummyData = {
//     title: 'Morning Run',
//     location: 'Central Park, NYC',
//     distance: '5.2',
//     duration: '0.75',
//     date: '2024-03-01',
//   };

//   // Replace `route.params` with `dummyData` for static display or use `route.params` when passing data dynamically
//   const { title, location, distance, duration, date } = dummyData; // For dynamic data, use `route.params`

//   // Example function for fetching data from an API (commented out for future use)
//   /*
//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://example.com/api/runs/details');
//       const data = await response.json();
//       console.log(data);
//       // You can set the data to state here and then use it as needed
//     } catch (error) {
//       console.error('There was an error fetching the run details:', error);
//     }
//   };
//   */

//   return (
//     <View style={styles.container}>
//       <Text>Activity Completed</Text>
//       <Text>{title}</Text>
//       <Text>{location}</Text>
//       <Text>{distance} Miles</Text>
//       <Text>{duration} Hours</Text>
//       <Text>{date}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
  
// });

// export default RunDetails;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RunDetails = ({ route, navigation }) => {
  // Dummy data for display purposes
  const dummyData = {
    title: 'Morning Run',
    location: 'Central Park, NYC',
    distance: '5.2',
    duration: '0.75',
    date: '2024-03-01',
  };

  // For dynamic data, use `route.params`
  const { title, location, distance, duration, date } = dummyData;

  const handleNavigation = (tab) => {
    // Navigate based on tab name, similar to the HomeScreen navigation
    navigation.navigate(tab);
  };

  // Active tab is 'home' for highlighting
  const activeTab = 'home';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.titleBar}>
        <Text style={styles.title}>Run Details</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text>Activity Completed</Text>
        <Text>{title}</Text>
        <Text>{location}</Text>
        <Text>{distance} Miles</Text>
        <Text>{duration} Hours</Text>
        <Text>{date}</Text>
      </View>

      {/* Fixed Navigation Bar at the bottom */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => handleNavigation('HistoryScreen')}>
          <Ionicons
            name={activeTab === 'history' ? 'time' : 'time-outline'}
            size={24}
            color={activeTab === 'history' ? '#00BFFF' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('HomeScreen')}>
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={24}
            color={activeTab === 'home' ? '#00BFFF' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('ProfileScreen')}>
          <Ionicons
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={24}
            color={activeTab === 'profile' ? '#00BFFF' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // This ensures the nav bar stays at the bottom
  },
  titleBar: {
    backgroundColor: '#00BFFF',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1, // Take up all available space between header and nav bar
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF', // Optional, for better visibility
  },
});

export default RunDetails;
