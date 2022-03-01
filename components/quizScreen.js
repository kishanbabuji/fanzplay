import { StyleSheet, Text, TextInput } from 'react-native';
import { useState } from 'react';
import { getDatabase, set, ref, onValue, get, update } from "firebase/database";
import { Button, View } from "react-native-ui-lib"
import * as React from 'react';
import { firebase } from "../firebase/firebaseClient.js"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'




export default function Quiz() {

    const [currentQuestion, setCurrentQuestion] = useState("")
    const [hasSeen, setHasSeen] = useState("")


    React.useEffect(async () => {
        let db = getDatabase()


        //database references for the game and user tables
        const games = ref(db, 'games/questionId')
        const answered = ref(db, "users/questionId")



        //functions set to update the hasSeen and currentQuestion states on db change 
        onValue(answered, async (snapshot) => {
            setHasSeen(await snapshot.val())

        })
        onValue(games, async (snapshot) => {
            const data = await snapshot.val()
            setCurrentQuestion(data)

        })

        // react effect cleanup function to close db connection and avoid memory leak
        return () => {
            off(ref(db, 'users', 'questionId'))

            off(ref(db, 'games', 'questionId'))
        }


    }, [])




    function handleSubmit(answer) {

        let db = getDatabase()

        if (answer == currentQuestion.correctAnswer) {
            update(ref(db, 'users/questionId'), {
                "answered": true,
                "correct": true,
            })

        } else {
            update(ref(db, 'users/questionId'), {
                "answered": true,
                "correct": false,
            })

        }
    }

    function handleTimeout() {
        let db = getDatabase()

        update(ref(db, 'users/questionId'), {
            "answered": true,
            "correct": false,
        })


    }


    if (currentQuestion && hasSeen) {
        console.log("here", hasSeen)

        if (!hasSeen.answered) {
            return (
                <View >

                    <CountdownCircleTimer
                        isPlaying={true}
                        duration={currentQuestion.duration}
                        colors={["#004777"]}
                        onComplete={() => handleTimeout()}
                    >
                        {({ remainingTime, color }) => (
                            <Text style={{ color, fontSize: 40 }}>
                                {remainingTime}
                            </Text>
                        )}
                    </CountdownCircleTimer>


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
                        Question:  {currentQuestion.question}
                    </Text>
                    <Button
                        size={Button.sizes.medium}
                        label={currentQuestion.answer1}
                        onPress={() => handleSubmit(currentQuestion.answer1)}
                        color="#FFDB58"
                        accessibilityLabel="Learn more about this purple button"
                    />

                    <Button
                        size={Button.sizes.medium}
                        onPress={() => handleSubmit(currentQuestion.answer2)}

                        label={currentQuestion.answer2}
                        color="#FFDB58"
                        accessibilityLabel="Learn more about this purple button"
                    />

                    <Button
                        size={Button.sizes.medium}
                        onPress={() => handleSubmit(currentQuestion.answer3)}

                        label={currentQuestion.answer3}
                        color="#FFDB58"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <Button
                        size={Button.sizes.medium}
                        onPress={() => handleSubmit(currentQuestion.answer4)}

                        label={currentQuestion.answer4}
                        color="#FFDB58"
                        accessibilityLabel="Learn more about this purple button"
                    />


                </View >)




        } else {
            return (
                <View>
                    <Text>Has answered</Text>
                    <Text> Answer Was {String(hasSeen.correct)}</Text>
                </View>

            )
        }


    } else {
        return (
            <View>
                <Text>Awaiting Questions for this game</Text>
            </View>
        )
    }





}



