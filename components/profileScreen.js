import * as React from 'react';
import { useContext } from 'react';
import { View, TextField, Text, Button } from 'react-native-ui-lib';
import userInfoContext from './userInfoContext';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";



export default function Profile({ navigation }) {
const userContext = useContext(userInfoContext)
const auth = getAuth();


  function logOut() {
    signOut(auth).then(() => {
      userContext.setUid(null)
      userContext.setUser(null)
      userContext.setUserLoggedIn(false)
      // Sign-out successful.
      console.log("logged out")
      navigation.navigate('FanzPlay')
    }).catch((error) => {
      // An error happened.
    });
  }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>My Profile</Text>
          <Button margin-5
          white50
          label="Logout"
          onPress={logOut}
        />
       <Button label="Edit Profile" onPress = {()=>navigation.navigate('Edit')} />
        </View>
      );
}