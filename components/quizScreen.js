import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { getDatabase, set, ref, onValue, get, update } from "firebase/database";
import { Button, View, Text, LoaderScreen } from "react-native-ui-lib"
import * as React from 'react';
import { firebase } from "../firebase/firebaseClient.js"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'




export default function Quiz({ navigation, route }) {



    const [currentQuestion, setCurrentQuestion] = useState("")
    const [hasSeen, setHasSeen] = useState("")


    React.useEffect(async () => {
        let db = getDatabase()


        //database references for the game and user tables
        const games = ref(db, `games/${route.params.game}/questionId`)
        const answered = ref(db, "users/questionId")



        //functions set to update the hasSeen and currentQuestion states on db change 
        onValue(answered, async (snapshot) => {
            setHasSeen(await snapshot.val())

        })
        onValue(games, async (snapshot) => {
            const data = await snapshot.val()
            console.log(data)
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


    const styles = StyleSheet.create({
        container: {
            margin: 20,
            flex: 1,
            flexDirection: "column",
            alignItems: 'center',
        },
        answerButton: {
            width: 300,
            color: "white"

        }




    })




    if (currentQuestion && hasSeen) {
        if (!hasSeen.answered) {
            return (
                <View style={styles.container}>


                    <CountdownCircleTimer
                        colorsTime={[currentQuestion.duration, 5, 2]}
                        isPlaying={true}
                        duration={currentQuestion.duration}
                        colors={["#004777", "#F7B801", "#A30000"]}
                        onComplete={() => handleTimeout()}
                    >
                        {({ remainingTime, color }) => (
                            <Text style={{ color, fontSize: 40 }}>
                                {remainingTime}
                            </Text>
                        )}
                    </CountdownCircleTimer>
                    <Text text30 margin-10 marginB-30 >
                        {currentQuestion.question}
                    </Text>
                    <View>
                        <Button
                            style={styles.answerButton}

                            margin5
                            size={Button.sizes.large}
                            label={currentQuestion.answer1}
                            onPress={() => handleSubmit(currentQuestion.answer1)}
                            accessibilityLabel="Learn more about this purple button"
                        />

                        <Button
                            style={styles.answerButton}

                            margin-5
                            size={Button.sizes.large}
                            onPress={() => handleSubmit(currentQuestion.answer2)}

                            label={currentQuestion.answer2}
                            accessibilityLabel="Learn more about this purple button"
                        />

                        <Button
                            style={styles.answerButton}
                            margin-5
                            size={Button.sizes.large}
                            onPress={() => handleSubmit(currentQuestion.answer3)}

                            label={currentQuestion.answer3}
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <Button
                            style={styles.answerButton}

                            margin-5
                            size={Button.sizes.large}
                            onPress={() => handleSubmit(currentQuestion.answer4)}

                            label={currentQuestion.answer4}
                            accessibilityLabel="Learn more about this purple button"
                        />

                    </View>


                </View >)




        } else {
            return (
                <View style={styles.container}>
                    <Text text50 marginT-50 marginB-50 > You Have Already Answered This Question</Text>
                    <Text text30 > Your answer was {String(hasSeen.correct)}</Text>
                </ View>

            )
        }


    } else {
        return (
            <LoaderScreen message={'Awaiting Questions for this game'}></LoaderScreen>
        )
    }





}



