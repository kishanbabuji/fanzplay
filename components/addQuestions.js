import { StyleSheet, View, TextInput,Picker,ScrollView } from "react-native";
import { useState } from "react";
import * as React from "react";
import { TextField, Button, Text, Colors } from "react-native-ui-lib";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebaseClient";
import {Modal} from "react-native";




export default function AddQuestion() {
 const[question,setQuestion] = useState("")
 const[correctanswer,setCorrectAnswer] = useState("")
 const[incorrectanswer1,setIncorrectAnswer1] = useState("")
 const[incorrectanswer2,setIncorrectAnswer2] = useState("")
 const[incorrectanswer3,setIncorrectAnswer3] = useState("")
 const [modalVisible, setModalVisible] = useState(false);


  async function updateQuestionDatabase() {
    const docRef = await addDoc(collection(db, "questions"), {
      question: question,
      correctanswer: correctanswer,
      incorrectanswer1: incorrectanswer1,
      incorrectanswer2: incorrectanswer2,
      incorrectanswer3: incorrectanswer3
    });
      setQuestion("")
      setCorrectAnswer("")
      setIncorrectAnswer1("")
      setIncorrectAnswer2("")
      setIncorrectAnswer3("")
      setModalVisible(true)
  }

  return (
    <ScrollView>
        <Text text30 style={{ color: Colors.text }}>
          Add question to database
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
                    Congratulations! Your question has been added to the database!
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
          value={question}
          style={styles.input}
          enableErrors
          placeholder={"Question"}
          floatingPlaceholder
          onChangeText={(question) => setQuestion(question)}
        />
        <TextField
          style={styles.input}
          placeholder={"Correct Answer"}
          floatingPlaceholder
          value={correctanswer}
          onChangeText={(correctanswer) => setCorrectAnswer(correctanswer)}
        />
        <TextField
          value={incorrectanswer1}
          style={styles.input}
          placeholder={"Incrorrect Answer"}
          floatingPlaceholder
          onChangeText={(incorrectanswer1) => setIncorrectAnswer1(incorrectanswer1)}
        />
          <TextField
          value={incorrectanswer2}
          style={styles.input}
          placeholder={"Incrorrect Answer"}
          floatingPlaceholder
          onChangeText={(incorrectanswer2) => setIncorrectAnswer2(incorrectanswer2)}
        />
          <TextField
          value={incorrectanswer3}
          style={styles.input}
          placeholder={"Incrorrect Answer"}
          floatingPlaceholder
          onChangeText={(incorrectanswer3) => setIncorrectAnswer3(incorrectanswer3)}
        />
   
 
    
        <Button
          onPress={updateQuestionDatabase}
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
