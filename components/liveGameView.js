import { View, Button, Text } from "react-native-ui-lib"
import { getDatabase, set, ref, onValue, get, update } from "firebase/database";
import * as React from 'react';
import { useState } from 'react';
import { db } from "../firebase/firebaseClient";
import { collection, getDocs, updateDoc, getDoc, doc } from "firebase/firestore";
import { StyleSheet, TextInput } from 'react-native';
import { useContext } from "react";

import userInfoContext from './userInfoContext'









// const listItems = numbers.map((number) =>
//   <li>{number}</li>
// );




export default function LiveGameView(props) {

    const [question, setQuestion] = useState({})
    const [counter, setCounter] = useState(0)
    const [questionsArr, setQuestionsArr] = useState([])

    const userContext = useContext(userInfoContext)




    const user = useContext(userInfoContext)


    React.useEffect(() => {

        console.log(questionsArr, "here")

        async function retrieveQuestions() {
            let tempArr = [];
            // const docRef = doc(db, "questions","rBVuIuaFuy1SRWFIqDPR");
            // const docSnap = await getDoc(docRef);

            const querySnapshot = await getDocs(collection(db, "games", props.game.id, "questions"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                tempArr.push(doc.id);
                //   console.log(doc.id, " => ", doc.data());
            });
            let questions = []
            tempArr.forEach(async (id) => {
                let questionDoc = await getDoc(doc(db, "questions", id))
                await questions.push({ ...questionDoc.data(), "id": id })

            })
            console.log(questions, "questions")

            setQuestionsArr(questions)





        }
        retrieveQuestions()


    }, [])



    function addGame() {

        let rtdb = getDatabase()

        update(ref(rtdb, `games/${props.game.id}/questionId`), {
            "question": question.question,
            "id": question.id,
            "answer1": question.answer1,
            "answer2": question.answer2,
            "answer3": question.answer3,
            "answer4": question.answer4,
            "duration": question.duration,
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

        <View>


            <Button
                size={Button.sizes.medium}
                onPress={loadQuestion}
                label={"Loads Next Question"}>
            </Button>

            <Text>
                Next Question:
            </Text>

            <Text>
                Question:  {question.question}
            </Text>
            <Text>
                Correct Answer:   {question.correctanswer}
            </Text>
            <Text>
                Incorrect Answer: {question.answer1}
            </Text>
            <Text>
                Incorrect Answer: {question.answer2}
            </Text>
            <Text>
                Incorrect Answer: {question.answer3}
            </Text>








            <Button
                size={Button.sizes.medium}
                onPress={addGame}
                label={"Push Question to User"}>
            </Button>




        </View>




    )




}