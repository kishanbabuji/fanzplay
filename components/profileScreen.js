import * as React from 'react';
import { useContext } from 'react';
import { View, Button, Image } from 'react-native-ui-lib';
import userInfoContext from './userInfoContext';
import { getAuth, signOut } from "firebase/auth";
import { styles } from '../App';



export default function Profile({ navigation }) {
const userContext = useContext(userInfoContext)
const auth = getAuth();

  //resets the user context information and navigate back to the apps homepage
  function logOut() {
    signOut(auth).then(() => {
      userContext.setUid(null)
      userContext.setUser(null)
      userContext.setUserLoggedIn(false)
      // Sign-out successful.
      navigation.navigate('FanzPlay')
    }).catch((error) => {
      // An error happened.
    });
  }
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