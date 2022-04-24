import { StyleSheet, View, TextInput, Picker, ScrollView } from "react-native";
import { useState } from "react";
import * as React from "react";
import { TextField, Button, Text, Colors, Slider } from "react-native-ui-lib";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";
import { Modal } from "react-native";
import { set } from "react-native-reanimated";




export default function AddReward() {
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [number,setNumber] = useState(0)
  const [modalVisible, setModalVisible] = useState(false);


  async function updateRewardDatabase() {
    const docRef = await addDoc(collection(db, "rewards"), {
    name:name,
    link:link,
    number:number
    });
    setName("")
    setLink("")
    setNumber(0)
    setModalVisible(true)
  }

  return (
    <ScrollView style={styles.container}>
      <Text text30 style={{ color: Colors.text }}>
        Add reward to database
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
              Congratulations! Your reward has been added to the database!
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
        value={name}
        style={styles.input}
        placeholder={"Reward Name"}
        floatingPlaceholder
        onChangeText={(name) => setName(name)}
      />
      <TextField
          value={link}
        style={styles.input}
        placeholder={"Reward Link"}
        floatingPlaceholder
        onChangeText={(link) => setLink(link)}
      />
      <TextField
        value={number}
        style={styles.input}
        keyboardType='numeric'
        placeholder={"Reward quantity"}
        floatingPlaceholder
        onChangeText={(number) => setNumber(number)}
      />
 

      <Button
        onPress={updateRewardDatabase}
        label={"Submit"}
        backgroundColor={Colors.text}
        accessibilityLabel="Learn more about this purple button"
        enableShadow
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: 300,
  },

  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 20,
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
