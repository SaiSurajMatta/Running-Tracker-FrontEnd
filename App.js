import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginForm">
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="SignupForm" component={SignupForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
