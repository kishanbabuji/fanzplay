import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { initializeApp } from 'firebase/app';
import { firebase } from './firebase/firebaseClient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, TextField, Text, Button } from 'react-native-ui-lib';

import Signup from "./components/signup"
import QuizScreen from "./components/quizScreen"
import AddGames from "./components/addGames"

function HomeScreen({ navigation }) {
  const app = firebase

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        margin-5
        white50
        label="Login"

        onPress={() => navigation.navigate('Login')}
      />
      <Button margin-5
        white50
        label="Signup"
        onPress={() => navigation.navigate('Signup')}
      />
      <Button margin-5
        white50
        label="Quiz"
        onPress={() => navigation.navigate('Quiz')}
      />
      <Button margin-5
        white50
        label="Add Games"
        onPress={() => navigation.navigate('Add Games')}
      />

    </View>
  );
}


export function LoginScreen() {
  return (


    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>Login</Text>
      <TextField text50 placeholder="username" grey10 />
      <TextField text50 placeholder="password" secureTextEntry grey10 />
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Add Games" component={AddGames} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
