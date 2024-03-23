import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
        <Stack.Screen name="FirstTime" component={FirstTime} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="SignupForm" component={SignupForm} />
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RunDetails" component={RunDetails} options={{ headerShown: false }} />
        <Stack.Screen name="LogActivityScreen" component={LogActivityScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
