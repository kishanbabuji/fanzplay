import { StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";
import * as React from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseClient";
import { TextField, Button, Text, Colors } from "react-native-ui-lib";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [zip, setZip] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  async function signupWithEmail() {
    // const auth = await getAuth();

    // createUserWithEmailAndPassword(auth, email, password).then(cred => {
    //     return firestore.collection('users').doc(cred.user.uid).set({
    //         Name: name
    //     })
    // })

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        db.collection("users")
          .doc(cred.user.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            age: age,
            zipCode: zip,
          })
          .then(
            setEmail(""),
            setFirstName(""),
            setLastName(""),
            setPassword(""),
            setAge(""),
            setZip(""),
            setModalVisible(true)
          );
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text text30 style={{ color: Colors.text }}>
          Sign up for FANz PLAY
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
                Congratulations! Your FANz PLAY account has been created!
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
          value={email}
          style={styles.input}
          enableErrors
          placeholder={"Email"}
          floatingPlaceholder
          onChangeText={(email) => setEmail(email)}
          textContentType="emailAddress"
        />
        <TextField
          style={styles.input}
          placeholder={"Password"}
          floatingPlaceholder
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
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
