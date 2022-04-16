import { StyleSheet, TextInput } from 'react-native';
import { useState, useContext } from 'react';
import { getDatabase, set, ref, onValue, get, update } from "firebase/database";
import { Button, View, Text, LoaderScreen } from "react-native-ui-lib"
import * as React from 'react';
import { firebase } from "../firebase/firebaseClient.js"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import userInfoContext from './userInfoContext';




export default function Quiz({ navigation, route }) {



    const [currentQuestion, setCurrentQuestion] = useState({})
    const [hasSeen, setHasSeen] = useState({})


    const user = useContext(userInfoContext)


    React.useEffect(() => {
        let db = getDatabase()


        //database references for the game and user tables
        const games = ref(db, `games/${route.params.game}/questionId`)



        //functions set to update the hasSeen and currentQuestion states on db change 

        onValue(games, async (snapshot) => {
            const data = await snapshot.val()
            if (data != null) {
                console.log("here")
                let dbData = await (await get(ref(db, "users/" + route.params.game + "/" + user.uid + "/" + data.id))).val()
                if (dbData == null) {
                    set(ref(db, 'users/' + route.params.game + "/" + user.uid + "/" + data.id), {
                        "answered": false,
                        "correct": false,
                    });

                    let updatedVal = {
                        "answered": false,
                        "correct": false,
                    }

                    setHasSeen(
                        updatedVal
                    )



                } else if (Object.keys(currentQuestion).length == 0) {
                    setHasSeen(
                        dbData,
                    )
                }
                setCurrentQuestion(
                    data
                )
            }


        })

        const answered = ref(db, `users/${route.params.game}/${user.uid}/${currentQuestion.id}`)
        onValue(answered, async (snapshot) => {
            setHasSeen(await snapshot.val())

        })






        // react effect cleanup function to close db connection and avoid memory leak
        return () => {
            off(ref(db, 'games', 'questionId'))
        }


    }, [])


    function handleSubmit(answer) {

        let db = getDatabase()

        if (answer == currentQuestion.correctAnswer) {
            update(ref(db, 'users/' + route.params.game + "/" + user.uid + "/" + currentQuestion.id), {
                "answered": true,
                "correct": true,
            })
            setHasSeen({
                "answered": true,
                "correct": true,
            })

        } else {
            update(ref(db, 'users/' + route.params.game + "/" + user.uid + "/" + currentQuestion.id), {
                "answered": true,
                "correct": false,
            })

            setHasSeen({
                "answered": true,
                "correct": false,
            })
        }
    }

    function handleTimeout() {
        let db = getDatabase()

        update(ref(db, 'users/' + route.params.game + "/" + user.uid + "/" + currentQuestion.id), {
            "answered": true,
            "correct": false,
        })
        setHasSeen({
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



    if (Object.keys(currentQuestion).length != 0 && Object.keys(hasSeen).length != 0) {

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



