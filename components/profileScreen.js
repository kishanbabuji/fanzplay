import * as React from 'react';
import { useContext } from 'react';
import { View, TextField, Text, Button, Colors } from 'react-native-ui-lib';
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,color:'Green'}}>

          <Button   enableShadow={true} margin-5 white50 size={Button.sizes.medium} backgroundColor={Colors.green20} label="Edit Profile" onPress = {()=>navigation.navigate('Edit Profile')} />

          <Button enableShadow={true} margin-5 white50 size={Button.sizes.medium} backgroundColor={Colors.green20}
          label="Logout"
          onPress={logOut}
        />
       
        </View>
      );
}