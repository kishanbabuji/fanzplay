import { View, Button, Text, Colors } from "react-native-ui-lib"
import { getDatabase, set, ref, onValue, get, update } from "firebase/database";
import * as React from 'react';
import { useState } from 'react';
import { db } from "../firebase/firebaseClient";
import { collection, getDocs, updateDoc, getDoc, doc } from "firebase/firestore";
import { StyleSheet, TextInput } from 'react-native';
import { useContext } from "react";

import userInfoContext from './userInfoContext'




export default function LiveGameView(props) {

    const [question, setQuestion] = useState({})
    const [counter, setCounter] = useState(0)
    const [questionsArr, setQuestionsArr] = useState([])

    const userContext = useContext(userInfoContext)




    const user = useContext(userInfoContext)

    //this use effect hook gets all od the questions associated wiht a game in the firestore table
    //these questions are then used to set a local state containing the question infromation for the questiions firestore table
    React.useEffect(() => {


        async function retrieveQuestions() {
            let tempArr = [];

            const querySnapshot = await getDocs(collection(db, "games", props.game.id, "questions"));
            querySnapshot.forEach((doc) => {
                tempArr.push(doc.id);
            });
            let questions = []
            tempArr.forEach(async (id) => {
                let questionDoc = await getDoc(doc(db, "questions", id))
                await questions.push({ ...questionDoc.data(), "id": id })

            })

            setQuestionsArr(questions)





        }
        retrieveQuestions()


    }, [])



    function addGame() {
        //get an instance of the realtime database
        let rtdb = getDatabase()
        //update the realtime database to contain the question stored at the current index
        update(ref(rtdb, `games/${props.game.id}/questionId`), {
            "question": question.question,
            "id": question.id,
            "answer1": question.answer1,
            "answer2": question.answer2,
            "answer3": question.answer3,
            "answer4": question.answer4,
            "duration": question.duration,
            "id": question.id,
            "correctAnswer": question.correctanswer
        })

        
        setQuestion({})
    }

    function loadQuestion() {

        let index = counter % questionsArr.length
        setQuestion(questionsArr[index])
        setCounter(counter + 1)

    }

    return (

        <View style={{paddingTop: 80}}>


            <Button
            color="#2e2f33" 
            backgroundColor= {Colors.text}
                size={Button.sizes.medium}
                onPress={loadQuestion}
                label={"Loads Next Question"}>
            </Button>

            <Text color="white">
                Next Question:
            </Text>

            <Text color="white">
                Question:  {question.question}
            </Text>
            <Text color="white">
                Correct Answer:   {question.correctanswer}
            </Text>
            <Text color="white">
                Incorrect Answer: {question.answer1}
            </Text>
            <Text color="white">
                Incorrect Answer: {question.answer2}
            </Text>
            <Text color="white">
                Incorrect Answer: {question.answer3}
            </Text>








            <Button
            color="#2e2f33" 
            backgroundColor= {Colors.text}
                size={Button.sizes.medium}
                onPress={addGame}
                label={"Push Question to User"}>
            </Button>




        </View>




    )




}
Colors.loadColors({
    text: "#cddc29",
    text2: "#FFF",
  });