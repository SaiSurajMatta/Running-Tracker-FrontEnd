import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupForm from './newUserRegistration/SignupForm';
import LoginForm from './newUserRegistration/LoginForm';
import HomeScreen from './home/HomeScreen';
import FirstTime from './startNewRun/FirstTime';
import StartScreen from './startNewRun/StartScreen';
import RunDetails from './startNewRun/RunDetails';
import LogActivityScreen from './logPreviousActivity/LogActivityScreen';
import ProfileScreen from './profile/ProfileScreen';
import HistoryScreen from './history/HistoryScreen';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import FirstTime from './FirstTime';
import StartScreen from './StartScreen';
import RunDetails from './RunDetails';
import LogActivityScreen from './LogActivityScreen';
import ForgotPassword from './ForgotPassword'; // Ensure this file exists and is correctly exported

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginForm">
      <Stack.Navigator initialRouteName="HomeScreen" unmountInactiveRoutes={true}>
        <Stack.Screen name="FirstTime" component={FirstTime} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="SignupForm" component={SignupForm} />
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RunDetails" component={RunDetails} options={{ headerShown: false }} />
        <Stack.Screen name="LogActivityScreen" component={LogActivityScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LogActivityScreen" component={LogActivityScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
