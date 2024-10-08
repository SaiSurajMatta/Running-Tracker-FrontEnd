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
import ForgotPassword from './newUserRegistration/ForgotPassword'; // Ensure this file exists and is correctly exported
import PredictionForm from './profile/PredictionForm';
import PredictionResult from './profile/PredictionResult';
import EditProfileForm from './profile/EditProfileForm';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginForm">
        <Stack.Screen name="FirstTime" component={FirstTime} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginForm" component={LoginForm} options={{ headerShown: false }} />
        <Stack.Screen name="SignupForm" component={SignupForm} options={{ headerShown: false }}/>
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RunDetails" component={RunDetails} options={{ headerShown: false }} />
        <Stack.Screen name="LogActivityScreen" component={LogActivityScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PredictionForm" component={PredictionForm} options={{ headerShown: false }}/>
        <Stack.Screen name="PredictionResult" component={PredictionResult} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="EditProfileForm" component={EditProfileForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;