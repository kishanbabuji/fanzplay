import * as React from 'react';
import { View, Text, Button } from 'react-native-ui-lib';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { firebase } from './firebase/firebaseClient';
import Login from './screens/loginScreen.js';
import Signup from './screens/signupScreen.js';
import Home from './screens/homeScreen.js';
import Quiz from './screens/quizScreen';

function Welcome({ navigation }) {
  const app = firebase

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to FanzPlay!</Text>
      <Button margin-5
        white50
        label="Login"
        onPress={() => navigation.navigate('Login')}
        
      />
      <Button margin-5
        white50
        label="Signup"
        onPress={() => navigation.navigate('Signup')}
      />

    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FanzPlay" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />  
        <Stack.Screen name="Home"  options={{headerShown: false}} component={Home} />
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
