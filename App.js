import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { firebase } from './firebase/firebaseClient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TextField, Text, Button } from 'react-native-ui-lib';
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";


import Signup from "./components/signup"
import Edit from "./components/editProfile"
import Login from "./components/login"
import QuizScreen from "./components/quizScreen"
import AddGames from "./components/addGames"
import AddQuestion from './components/addQuestions';
import userInfoContext from './components/userInfoContext'
import HomeScreen from './components/homeScreen'
import { push } from 'firebase/database';


function Welcome({ navigation }) {

  const[user,setUser] = useState()
  const[userUid,setUid] = useState()
  const[userLoggedIn,setUserLoggedIn] = useState()
  const auth = getAuth();
  const app = firebase

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    setUid(user.uid)
    setUser(user)
    setUserLoggedIn(true)
    
  } else {
  
  }
});


function logOut(){
signOut(auth).then(() => {
  setUid(null)
  setUser(null)
  setUserLoggedIn(false)
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}





if(user){
  return (
    <userInfoContext.Provider value={{
      loggedIn: true,
      uid: userUid,
      isAdmin: false

    }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome</Text>
      <Button margin-5
        white50
        label="Home"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      
      {/* <Button margin-5
        white50
        label="Edit"
        onPress={() => navigation.navigate('Edit')}
        />

      <Button margin-5
        white50
        label="Add Games"
        onPress={() => navigation.navigate('Add Games')}
      />
         <Button margin-5
        white50
        label="Add questions"
        onPress={() => navigation.navigate('Add questions')}
      />
           <Button
        margin-5
        white50
        label="logout"

        onPress={logOut}
      />
    */}
     

    </View>
    </userInfoContext.Provider>
  );


}
else{
  return(
    <userInfoContext.Provider value={{
      loggedIn: false,
      uid: "",
      isAdmin: false

    }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Welcome to FanzPlay!</Text>
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
    </View>
    </userInfoContext.Provider>
  )

}


  
}





const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FanzPlay" component={Welcome} />
        <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Add Games" component={AddGames} />
        <Stack.Screen name="Add questions" component={AddQuestion} />    
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
