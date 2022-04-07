import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { firebase,auth,db } from './firebase/firebaseClient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TextField, Text, Button } from 'react-native-ui-lib';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import GameList from "./components/gameList"

import Signup from "./components/signup"
import Edit from "./components/editProfile"
import Login from "./components/login"
import QuizScreen from "./components/quizScreen"
import AddGames from "./components/addGames"
import AddQuestion from './components/addQuestions';
import userInfoContext from './components/userInfoContext'
import HomeScreen from './components/homeScreen'
import { push } from 'firebase/database';
import { startClock } from 'react-native-reanimated';
import QuizMenu from './components/quizMenu';
import HomeTab from './components/homeScreen';


function Welcome({ navigation, route }) {




  const userContext = useContext(userInfoContext)
  const auth = getAuth();
  const app = firebase



  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      userContext.setUid(user.uid)
      userContext.setUser(user)
      userContext.setUserLoggedIn(true)
   
      getDoc(doc(db, "users", user.uid)).then(docSnap => {
        if (docSnap.exists()) {
           userContext.setIsAdmin(docSnap.data().isAdmin)
        } else {
          console.log("No such document!");
        }
      })
    }
  });


  function logOut() {
    signOut(auth).then(() => {
      userContext.setUid(null)
      userContext.setUser(null)
      userContext.setUserLoggedIn(false)
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }







  if (userContext.user) {
    return (

   
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome</Text>
      <Button margin-5
        white50
        label="Home"
        onPress={() => navigation.navigate('HomeScreen')}
      />

    </View>
  );

}
else {
  return (

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
    )

  }



}





const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState()
  const [userUid, setUid] = useState()
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)




  return (
    <userInfoContext.Provider value={{
      loggedIn: userLoggedIn,
      uid: userUid,
      user: user,
      isAdmin: isAdmin,
      setUser: (user) => setUser(user),
      setUid: (uid) => setUid(uid),
      setUserLoggedIn: (loggedIn) => setUserLoggedIn(loggedIn),
      setIsAdmin: (isAdmin) => setIsAdmin(isAdmin)
    }}>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FanzPlay" component={Welcome} />
        <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Edit Profile" component={Edit} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Games List" component={GameList} />
        <Stack.Screen name="Quiz Menu" component={QuizMenu} />


        <Stack.Screen name="Add Games" component={AddGames} />
        <Stack.Screen name="Add questions" component={AddQuestion} />    
        </Stack.Navigator>
    </NavigationContainer>
    </userInfoContext.Provider>

  );
}

export default App;
