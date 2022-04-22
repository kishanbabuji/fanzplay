import * as React from 'react';
import { useContext } from 'react';
import { View, TextField, Text, Button, Colors, Image } from 'react-native-ui-lib';
import userInfoContext from './userInfoContext';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { styles } from '../App';



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
  // { flex: 1, justifyContent: 'center', alignItems: 'center' ,color:'Green'}
    return (
          <View style={{backgroundColor: '#2e2f33'}}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                  <View style={styles.body}>
                    <View>
                      <Button  style={styles.editProfileButton} enableShadow={true} 
                      white-50
                      label="Edit Profile" 
                      color="#535546"
                      onPress = {()=>navigation.navigate('Edit Profile')} />

                      <Button style={styles.logoutButton} enableShadow={true}
                      white-50
                      label="Logout"
                      color="#535546"
                      onPress={logOut}/>
                      </View>
              </View>
          </View>
      );
}