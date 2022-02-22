import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import * as React from 'react';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function signupWithEmail() {
        const auth = await getAuth();
       
        createUserWithEmailAndPassword(auth, email, password)


    }



    return (
        <View style={styles.container}>
            <Text>fans play sign up page </Text>
            <TextInput
                value={email}
                style={styles.input}

                onChangeText={email => setEmail(email)}



            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={password => setPassword(password)}


            />
            <Button
                onPress={signupWithEmail}
                title="Submit"
                color="#FFDB58"
                accessibilityLabel="Learn more about this purple button"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        width: 200,
        borderWidth: 1,
        padding: 10,
    },
});