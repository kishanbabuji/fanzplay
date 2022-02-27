import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import * as React from 'react';





export default function Quiz() {


    const [questionInput, setQuestionInput] = useState("")
    const [questionValue,setQuestionValue] = useState("")
    const [answer1,setAnswer1] = useState("")
    const [answer2,setAnswer2] = useState("")
    const [answer3,setAnswer3] = useState("")
    const [answer4,setAnswer4] = useState("")
   
  



    return (
        <View style={styles.container}>

            {/* <Text>Submit New Question</Text> */}

             {/* Code below is for testing setter for questionvalue, using an input box and button */}
            

            {/* <TextInput
               style={styles.input}
                value={questionInput}
                onChangeText={questionInput => setQuestionInput(questionInput)}
            /> */}


     

{/* 
        <Button onPress={questionValue => setQuestionValue(questionInput)}
            title="submit" /> */}


            <Text>
                Question:
            </Text>


        <Text>
            {questionValue}
         </Text>

         
            <Button
                onPress=""
                title={answer1}
                color="#FFDB58"
                accessibilityLabel="Learn more about this purple button"
            />

             <Button
                onPress=""
                title={answer2}
                color="#FFDB58"
                accessibilityLabel="Learn more about this purple button"
            />

            <Button
                onPress=""
                title={answer3}
                color="#FFDB58"
                accessibilityLabel="Learn more about this purple button"
            />
               <Button
                onPress=""
                title={answer4}
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