import { StyleSheet, View, TextInput,Picker } from "react-native";
import { useState,useContext } from 'react';
import * as React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseClient";
import { TextField, Button, Text, Colors } from "react-native-ui-lib";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
  } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import userInfoContext from "./userInfoContext";

const user = getAuth()




export default function Edit() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const userContext = useContext(userInfoContext)

  



  const docRef = doc(db, "users",userContext.uid);



        React.useEffect(async () => {
            const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
           setFirstName(docSnap.data().firstName)
           setLastName(docSnap.data().lastName)
           setAge(docSnap.data().age) 
           setZip(docSnap.data().zipCode) 
           setCity(docSnap.data().city)
           setNumber(docSnap.data().number)
           setUsername(docSnap.data().username)
    
          } else {
            console.log("No such document!");
          }

            
        }, [])

        
      async function signupWithEmail() {
        await updateDoc(docRef, {
          firstName: firstName,
          lastName: lastName,
          age: age,
          zipCode: zip,
          city: city,
          username: username,
          number: number

          });
          setModalVisible(true)
    
      }

    return (
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
         
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{ color: Colors.text }}>
                    Congratulations! Your FANz PLAY account has been updated!
                  </Text>
                  <Button
                    backgroundColor={Colors.text}
                    onPress={() => setModalVisible(!modalVisible)}
                    label={"Okay!"}
                    enableShadow
                  ></Button>
                </View>
              </View>
            </Modal>
      
 
        <TextField
        text100
          value={firstName}
          style={styles.input}
          placeholder={"First Name"}
          floatingPlaceholder
          onChangeText={(firstName) => setFirstName(firstName)}
        />
        <TextField
               text100
          value={lastName}
          style={styles.input}
          placeholder={"Last Name"}
          floatingPlaceholder
          onChangeText={(lastName) => setLastName(lastName)}
        />
         <TextField
                text100
          value={username}
          style={styles.input}
          placeholder={"Username"}
          floatingPlaceholder
          onChangeText={(username) => setUsername(username)}
        />
         <TextField
                text100
          value={number}
          style={styles.input}
          placeholder={"Phone Number"}
          floatingPlaceholder
          onChangeText={(number) => setNumber(number)}
          keyboardType="numeric"
        />
           <Text text100>Age:</Text>
        <Picker
        itemStyle={styles.pickerItem}
        selectedValue={age}
        style = {styles.picker}
        onValueChange={(age, itemIndex) => setAge(age)}
      >
        <Picker.Item label="1-13" value="1-13" />
        <Picker.Item label="14-21" value="14-21" />
        <Picker.Item label="22-35" value="22-35" />
        <Picker.Item label="36-50" value="36-50" />
        <Picker.Item label="51-65" value="51-65" />
        <Picker.Item label="65+" value="65+" />
      </Picker>
        <TextField
        text100
          value={zip}
          style={styles.input}
          placeholder={"Zip Code"}
          floatingPlaceholder
          onChangeText={(zip) => setZip(zip)}
          keyboardType="numeric"
        />
         <TextField
         text100
          value={city}
          style={styles.input}
          placeholder={"City"}
          floatingPlaceholder
          onChangeText={(city) => setCity(city)}
        />
            <Button
              onPress={signupWithEmail}
              label={"Submit"}
              backgroundColor={Colors.green20}
              enableShadow={true}
              accessibilityLabel="Learn more about this purple button"
             
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
  picker: {
    width: 300, 
    height:200, 
  },
  PickerItem:{
    height:100,
    color:'red',
  },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      // height: 40,
      // margin: 12,
      width: 200,
      // borderWidth: 1,
      // padding: 0,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
  
  Colors.loadColors({
    text: "#879428",
  });
  
