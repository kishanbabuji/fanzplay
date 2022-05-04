import { StyleSheet } from 'react-native';
import { useState, useContext } from 'react';
import { getDatabase, ref, onValue, get, update, database, increment } from "firebase/database";
import { Button, View, Text, LoaderScreen, Colors } from "react-native-ui-lib"
import * as React from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import userInfoContext from './userInfoContext';
import { PieChart} from 'react-native-chart-kit'
import { Dimensions } from "react-native";
import firebase from "firebase/app";
import "firebase/database";



export default function Quiz({ navigation, route }) {



    const [currentQuestion, setCurrentQuestion] = useState({})
    const [hasSeen, setHasSeen] = useState({})
    const [numCorrect, setNumCorrect] = useState(0)
    const [numSeen, setNumSeen] = useState(0)
    const [homenumCorrect, sethomeNumCorrect] = useState(0)
    const [homenumSeen, sethomeNumSeen] = useState(0)
    const [awaynumCorrect, setawayNumCorrect] = useState(0)
    const [awaynumSeen, setawayNumSeen] = useState(0)
    const [team, setTeam] = useState("")
    const [homeTeam, setHomeTeam] = useState("")
    const [awayTeam, setAwayTeam] = useState("")




    const user = useContext(userInfoContext)


    React.useEffect(() => {
        let db = getDatabase()


        const starCountRef = ref(db, 'users/' + route.params.game + "/" + user.uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setTeam(data.team)
            setNumSeen(data.numberAnswered)
            setNumCorrect(data.numberCorrect)
        });

        const teamRef = ref(db, 'games/' + route.params.game);
        onValue(teamRef, (snapshot) => {
            const data = snapshot.val();
            setHomeTeam(data.HomeTeam)
            setAwayTeam(data.AwayTeam)
            sethomeNumCorrect(data.HomeCorrect)
            sethomeNumSeen(data.HomeAnswered)
            setawayNumCorrect(data.AwayCorrect)
            setawayNumSeen(data.AwayAnswered)
        });


    
    


   




        //database references for the game and user tables
        const games = ref(db, `games/${route.params.game}/questionId`)



        //functions set to update the hasSeen and currentQuestion states on db change 

        onValue(games, async (snapshot) => {
            const data = await snapshot.val()
            if (data != null) {
                let dbData = await (await get(ref(db, "users/" + route.params.game + "/" + user.uid + "/" + data.id))).val()
                if (dbData == null) {
                    update(ref(db, 'users/' + route.params.game + "/" + user.uid + "/" + data.id), {
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


 

    function updateScore(x, y) {
        let db = getDatabase();
        update(ref(db, 'users/' + route.params.game + "/" + user.uid), {
            "numberCorrect": x,
            "numberAnswered": y
        });
    }


 

    const updateTeamScore = async (isCorrect) => {
        let db = getDatabase();
        let isHome = false;
        if(team == homeTeam) isHome = true;

        if(isHome && !isCorrect){
            sethomeNumSeen(homenumSeen+1)
            await update(ref(db, 'games/' + route.params.game), {
                HomeAnswered: increment(1)
            });
        }
        else if(isHome && isCorrect){
            sethomeNumSeen(homenumSeen+1)
            sethomeNumCorrect(homenumCorrect+1)
            await update(ref(db, 'games/' + route.params.game), {
                HomeAnswered: increment(1),
                HomeCorrect:increment(1)
            });
        }
        else if(!isHome && !isCorrect){
            setawayNumSeen(awaynumSeen+1)
            await update(ref(db, 'games/' + route.params.game), {
                AwayAnswered: increment(1)
            });
        }
        else if(!isHome && isCorrect){
            setawayNumSeen(awaynumSeen+1)
            setawayNumCorrect(awaynumCorrect+1)
            await update(ref(db, 'games/' + route.params.game), {
                AwayAnswered: increment(1),
                AwayCorrect:increment(1)
            });
        }

       
      } 


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
            setNumSeen(numSeen + 1)
            setNumCorrect(numCorrect + 1)
            if (team == homeTeam) {
                updateScore(numCorrect + 1, numSeen + 1)
                updateTeamScore(true)

            }
            else {
                updateScore(numCorrect + 1, numSeen + 1)
                updateTeamScore(true)

            }


        } else {
            update(ref(db, 'users/' + route.params.game + "/" + user.uid + "/" + currentQuestion.id), {
                "answered": true,
                "correct": false,
            })

            setHasSeen({
                "answered": true,
                "correct": false,
            })
            setNumSeen(numSeen + 1)
            if (team == homeTeam) {
                updateScore(numCorrect, numSeen + 1)
                updateTeamScore(false)

            }
            else {
                updateScore(numCorrect, numSeen + 1)
                updateTeamScore(false)

            }
        }
    }

    //this function handles the case when a user fails to answer a question in the given time
    //both the local state  (hasSeen) and the users db table are updated 
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
        setNumSeen(numSeen + 1)
        if (team == homeTeam) {
            updateScore(numCorrect, numSeen + 1)
            updateTeamScore(false)
        }
        else {
            updateScore(numCorrect, numSeen + 1)
            updateTeamScore(false)
        }

    }


    const styles = StyleSheet.create({
        container: {

            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: 50,
            alignItems: 'center',
            backgroundColor: "#2e2f33",

        },
        answerButton: {
            width: 300,
            margin: 5,
            backgroundColor: Colors.rgba('#cddc29', 1)

        }




    })



    if (Object.keys(currentQuestion).length != 0 && Object.keys(hasSeen).length != 0) {

        if (!hasSeen.answered) {
            return (
                <View style={styles.container}>
                    <Text
                        style={{
                            marginBottom: 25,
                            width: 300,
                            textAlign: "center"
                        }}



                        color= "white" text30 margin-10 marginB-30 >
                        {currentQuestion.question}
                    </Text>
                    <CountdownCircleTimer




                        colorsTime={[currentQuestion.duration, 5, 2]}
                        isPlaying={true}
                        duration={currentQuestion.duration}
                        colors={["#004777", "#F7B801", "#A30000", '#cddc29']}
                        onComplete={() => handleTimeout()}
                    >
                        {({ remainingTime, color }) => (
                            <Text style={{ color, fontSize: 40 }}>
                                {remainingTime}
                            </Text>
                        )}
                    </CountdownCircleTimer>

                    <View
                        style={{
                            marginTop: 25,
                            justifyContent: "center",
                            alignItems: "center"

                        }}

                    >
                        <Button
                            style={styles.answerButton}
                            fullWidth={true}
                            size={Button.sizes.large}
                            label={currentQuestion.answer1}
                            color={Colors.black}
                            onPress={() => {
                                handleSubmit(currentQuestion.answer1)
                            }}
                            accessibilityLabel="Learn more about this purple button"
                        />

                        <Button
                            style={styles.answerButton}
                            color={Colors.black}

                            margin-5
                            size={Button.sizes.large}
                            onPress={() => {
                                handleSubmit(currentQuestion.answer2);

                            }}
                            fullWidth={true}


                            label={currentQuestion.answer2}
                            accessibilityLabel="Learn more about this purple button"
                        />

                        <Button
                            color={Colors.black}

                            style={styles.answerButton}
                            margin-5
                            size={Button.sizes.large}
                            fullWidth={true}
                            onPress={() => {
                                handleSubmit(currentQuestion.answer3);

                            }}

                            label={currentQuestion.answer3}
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <Button
                            color={Colors.black}

                            style={styles.answerButton}
                            fullWidth={true}

                            margin-5
                            size={Button.sizes.large}
                            onPress={() => {
                                handleSubmit(currentQuestion.answer4);

                            }}

                            label={currentQuestion.answer4}
                            accessibilityLabel="Learn more about this purple button"
                        />

                    </View>


                </View >)




        } else {
            return (
                <View style={styles.container}>
                    <Text color="white" text50 marginB-50 > You Have Already Answered This Question</Text>
                    <Text color="white" text65 > {String(currentQuestion.question)}</Text>
                    <Text color="white"  text65 > {String(currentQuestion.answer1)}</Text>
                    <Text color="white"  text65 > {String(currentQuestion.answer2)}</Text>
                    <Text color="white"  text65 > {String(currentQuestion.answer3)}</Text>
                    <Text color="white" text65 > {String(currentQuestion.answer4)}</Text>
                    <Text color="white" text65 > The correct answer was: {String(currentQuestion.correctAnswer)}</Text>
                  
                    <Text color="white" text50 marginT-50> Score:</Text>
                    <Text color="white" text50>{homeTeam}: {(homenumCorrect / homenumSeen).toFixed(2) * 100 || 0}%</Text>
                    <Text color="white" text50>{awayTeam}: {(awaynumCorrect / awaynumSeen).toFixed(2) * 100 || 0}%</Text>
                    <PieChart
                    data={[
                        { name: homeTeam, population: (homenumCorrect / homenumSeen).toFixed(2) * 100 || 0, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                        { name: awayTeam, population: (awaynumCorrect / awaynumSeen).toFixed(2) * 100 || 0, color: '#8fce00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                    ]}
                    width={400}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16
                        }
                      }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    />
                  

                </ View>

            )
        }


    } else {
        return (
            <LoaderScreen message={'Awaiting Questions for this game'}></LoaderScreen>

        )
    }





}



