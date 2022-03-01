import { StyleSheet, View, TextInput } from "react-native";
import { useState } from 'react';
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



const docRef = doc(db, "users","DhKJj8PPgxYdGlqi7aoCMHI02x92");


export default function Edit() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [zip, setZip] = useState("");
    const [modalVisible, setModalVisible] = useState(false);


        React.useEffect(async () => {
            const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
         
           setFirstName(docSnap.data().firstName)
           setLastName(docSnap.data().lastName)
           setAge(docSnap.data().age) 
           setZip(docSnap.data().zipCode) 
    
          } else {
            console.log("No such document!");
          }

            
        }, [])

        
      async function signupWithEmail() {
        await updateDoc(docRef, {
            firstName: firstName,
            lastName: lastName,
            age: age,
            zipCode: zip

          });
    
      }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <Text text30 style={{ color: Colors.text }}>
            Edit Fanz Play Account
            </Text>
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
                    label={"Go Home!"}
                    enableShadow
                  ></Button>
                </View>
              </View>
            </Modal>
      
       
            <TextField
              value={firstName}
              style={styles.input}
              placeholder={"First Name"}
              floatingPlaceholder
              onChangeText={(firstName) => setFirstName(firstName)}
            />
            <TextField
              value={lastName}
              style={styles.input}
              placeholder={"Last Name"}
              floatingPlaceholder
              onChangeText={(lastName) => setLastName(lastName)}
            />
            <TextField
              value={age}
              style={styles.input}
              placeholder={"Age"}
              floatingPlaceholder
              onChangeText={(age) => setAge(age)}
              keyboardType="numeric"
            />
            <TextField
              value={zip}
              style={styles.input}
              placeholder={"Zip Code"}
              floatingPlaceholder
              onChangeText={(zip) => setZip(zip)}
              keyboardType="numeric"
            />
            <Button
              onPress={signupWithEmail}
              label={"Submit"}
              backgroundColor={Colors.text}
              accessibilityLabel="Learn more about this purple button"
              enableShadow
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
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
      backgroundColor: "white",
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
  
