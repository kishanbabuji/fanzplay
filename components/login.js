import React, { useState } from "react";
import { TextField, TextInput, Button, Text, Colors, View } from "react-native-ui-lib";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Login({ navigation }) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[errorm,setErrorm] = useState("");


  async function loginUser() {
    console.log(email);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        console.log("works");
        navigation.navigate("FanzPlay");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       setErrorm(errorMessage);
       console.log(errorm)
      });
    // Handle user state changes
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextField
            underlineColor = "transparent"
            editable={false}
            red50
            value={errorm}>
            </TextField>
            <TextField
              value={email}
              white50
              placeholder={"Email"}
              floatingPlaceholder
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
            />
            <TextField
              value={password}
              secureTextEntry={true}
              type="password"
              white50
              placeholder={"Password"}
              floatingPlaceholder
              onChangeText={(password) => setPassword(password)}
              style={styles.input}
            />

            <Button
              onPress={loginUser}
              color='#535546'
              label={"Login"}
              backgroundColor={Colors.text}
              enableShadow={true}
            ></Button>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Logged In</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2f33',
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 20,
    width: 200,
    color: 'white',

  },
  
});

Colors.loadColors({
  text: "#cddc29",
});
