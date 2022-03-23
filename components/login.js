import React, { useState } from 'react';
import { TextField, Button, Text, Colors, View } from "react-native-ui-lib";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";





export default function Login() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  
 

async function loginUser(){
  console.log(email)
  const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    // Signed in 
    setUser(userCredential.user);
    console.log("works")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
  // Handle user state changes

}


if(!user){
return (
  <View>
     <TextField
value={email}


placeholder={"email"}
floatingPlaceholder
onChangeText={(email) => setEmail(email)}
/>
<TextField
value={password}


placeholder={"password"}
floatingPlaceholder
onChangeText={(password) => setPassword(password)}
/> 

<Button
onPress={loginUser}
label={"Login"}
>

</Button>
   
  </View>
);
}
else{
  return(
    <View>
      <Text>
        Logged In
      </Text>
    </View>
  )
}


}