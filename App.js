import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { initializeApp } from "firebase/app";
import { firebase, auth, db } from "./firebase/firebaseClient";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, TextField, Text, Button, Colors } from "react-native-ui-lib";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import GameList from "./components/gameList";

import Signup from "./components/signup";
import Edit from "./components/editProfile";
import Login from "./components/login";
import QuizScreen from "./components/quizScreen";
import AddGames from "./components/addGames";
import AddQuestion from "./components/addQuestions";
import userInfoContext from "./components/userInfoContext";
import HomeScreen from "./components/homeScreen";
import { push } from "firebase/database";
import { startClock } from "react-native-reanimated";
import QuizMenu from "./components/quizMenu";
import HomeTab from "./components/homeScreen";
import AddReward from "./components/addRewards";
import Rewards from "./components/rewardsScreen";
import Profile from "./components/profileScreen";

import background from "./assets/FPLogo9.jpg";
import { ImageBackground, Image } from "react-native";

const image1 = require('./assets/FPLogo9.jpg');
const image2 = require('./assets/FanzPlay-Logo.png');

function Welcome({ navigation, route }) {
  const userContext = useContext(userInfoContext);
  const auth = getAuth();
  const app = firebase;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      userContext.setUid(user.uid);
      userContext.setUser(user);
      userContext.setUserLoggedIn(true);

      getDoc(doc(db, "users", user.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          userContext.setIsAdmin(docSnap.data().isAdmin);
        } else {
          console.log("No such document!");
        }
      });
    }
  });

  function logOut() {
    signOut(auth)
      .then(() => {
        userContext.setUid(null);
        userContext.setUser(null);
        userContext.setUserLoggedIn(false);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  if (userContext.user) {
    return (
      <View style={styles.container2}>
         <Image source={image2} style={styles.image2}>

      </Image>

        <Button
          margin-5
          style={styles.homeButton}
          backgroundColor={Colors.text}
          color='#2e2f33'
          label="Home"
          onPress={() => navigation.navigate("HomeScreen")}
          enableShadow={true}
        />
         <Button
          margin-5
          style={styles.rewardsButton}
          backgroundColor={Colors.text}
          color='#2e2f33'
          label="Rewards"
          onPress={() => navigation.navigate("Rewards")}
          enableShadow={true}
        />
        <Button
          margin-5
          style={styles.profileButton}

          backgroundColor={Colors.text}
          color='#2e2f33'
          label="Profile"
          onPress={() => navigation.navigate("Profile")}
          enableShadow={true}
        />
      </View>
    );
  } else {
    return (
     
      <View style={styles.container}>
        <Image source={image1} style={styles.image1}>

        </Image>
        <Button 
          margin-5
          style={styles.button1}
          color='#2e2f33'
          label="Login"
          backgroundColor={Colors.text}
          onPress={() => navigation.navigate("Login")}
          enableShadow={true}
        />
        <Button
          margin-5
          style={styles.button2}
          color='#2e2f33'
          label="Signup"
          backgroundColor={Colors.text}
          onPress={() => navigation.navigate("Signup")}
          enableShadow={true}
        />
        
      </View>
      
    );
  }
}

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState();
  const [userUid, setUid] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <userInfoContext.Provider
      value={{
        loggedIn: userLoggedIn,
        uid: userUid,
        user: user,
        isAdmin: isAdmin,
        setUser: (user) => setUser(user),
        setUid: (uid) => setUid(uid),
        setUserLoggedIn: (loggedIn) => setUserLoggedIn(loggedIn),
        setIsAdmin: (isAdmin) => setIsAdmin(isAdmin),
      }}
    >
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}} name="FanzPlay" component={Welcome} />
          <Stack.Screen
            name="HomeScreen"
            options={{ headerShown: false,
              headerStyle: {backgroundColor: '#2e2f33' }}}
            component={HomeScreen}
          />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}} name ="Rewards" component={Rewards} />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}}  name="Login" component={Login} />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}}  name="Signup" component={Signup} />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}}  name="Edit Profile" component={Edit} />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}}  name="Quiz" component={QuizScreen} />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}} name="Games List" component={GameList} />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}} name="Quiz Menu" component={QuizMenu} />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}} name="Add Games" component={AddGames} />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}} name="Add questions" component={AddQuestion} />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}} name = "Add Rewards" component={AddReward} />
          <Stack.Screen options={{headerStyle: {backgroundColor: '#2e2f33'}, headerTintColor: '#fff'}} name = "Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </userInfoContext.Provider>
  );
}
Colors.loadColors({
  text: "#cddc29",
  text2: "#FFF"
});

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2e2f33',
    flex: 1,
    alignItems: "center",
    paddingBottom: 210,
    paddingTop: 140    
  },
  image1: {
    flex: 1,
    justifyContent: "center",
    height: 'auto',
    width: '100%',
   
  },
  button1: {
    position: 'absolute',
    bottom: 0,
    left: 75,
    marginBottom: 120,
  },
  button2: {
    position: 'absolute',
    bottom: 0,
    right: 75,
    marginBottom: 120
  },
  image2: {
    top: -150,
  },
  homeButton: {
    bottom: 110,
    marginLeft: 30,
    marginRight: 30,

  },
  rewardsButton: {
    bottom: 90,
    marginLeft: 30,
    marginRight: 30,
  },
 
  profileButton: {
    bottom: 70,
    marginLeft: 30,
    marginRight: 30,
  },
  loginButton: {
    position: 'absolute',
    top: 540,
    left: 60,
    height: 60,
    width: 120
  },
  container2: {
    backgroundColor: '#231f20',
    paddingBottom: 180,
    paddingTop: 150 
  },
  header:{
    backgroundColor: "#cddc29",
    height:200,
  },
  body:{
    marginTop:100,
    backgroundColor: '#2e2f33',
    marginBottom: 400

  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  editProfileButton: {    
    marginTop: 80,
  marginLeft: 40,
  marginRight: 40,
    backgroundColor: "#cddc29",
  },
  logoutButton: {
   marginTop: 40,
  marginLeft: 40,
  marginRight: 40,
    backgroundColor: '#cddc29'
  }
  
 
});

export default App;
