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


function HomeScreen({ navigation }) {

  const[user,setUser] = useState()
  const[uid,setUid] = useState()
  const auth = getAuth();
  const app = firebase

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    setUid(user.uid)
    setUser(user)
    
  } else {
  
  }
});


function logOut(){
signOut(auth).then(() => {
  setUid(null)
  setUser(null)
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}





if(user){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button margin-5
        white50
        label="Quiz"
        onPress={() => navigation.navigate('Quiz')}
      />
      
      <Button margin-5
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
   
     

    </View>
  );


}
else{
  return(
    <View>
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
  )

}


  
}





const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
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
