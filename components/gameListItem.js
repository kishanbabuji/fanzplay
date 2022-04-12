import { View, ListItem, Text, Button, Checkbox } from 'react-native-ui-lib';
import React, { useState, useContext, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, deleteField, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";
import LiveGameView from './liveGameView';
import { useLinkProps } from '@react-navigation/native';
import { getDatabase, set, ref, onValue, get, update, remove } from "firebase/database";

export default function GameListItem(props) {

    const [questions, setQuestions] = useState([])
    const [selectedQuestions, setSelectedQuestions] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const [isLive, setIsLive] = useState(false)

    useEffect(() => {
        async function getGames() {

            let questionArr = [];
            const questionSnapshot = await getDocs(collection(db, "questions"));
            questionSnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                questionArr.push({ ...doc.data(), id: doc.id });
            });

            let selectedQuestionsMap = {}
            const querySnapshot = await getDocs(collection(db, "games", props.game.id, "questions"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                selectedQuestionsMap[doc.id] = null;
            });

            setSelectedQuestions(selectedQuestionsMap)
            setQuestions(questionArr)

        }

        async function isLive() {

            let rtdb = getDatabase()
            let gamesRef = ref(rtdb, `games/${props.game.id}`)

            get(gamesRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setIsLive(true)
                } else {
                    setIsLive(false)
                }
            }).catch((error) => {
                console.error(error);
            });


        }
        isLive()






        getGames()




    }, [])


    function handleLive() {


        let rtdb = getDatabase()

        if (isLive) {
            //remove live db game
            let gamesRef = ref(rtdb, `games/${props.game.id}`)
            remove(gamesRef)

            setIsLive(false)
        } else {
            //add game to live db
            update(ref(rtdb, `games/${props.game.id}`), {
                "Away Team": props.game["Away Team"],
                "Home Team": props.game["Home Team"],
                "Code to Join": props.game["Join Code"]
            })


            setIsLive(true)
        }



    }







    async function handleListUpdate(questionID) {

        const questionRef = doc(db, "games", props.game.id, "questions", questionID)
        //need to add game to current list
        if (questionID in selectedQuestions) {
            await deleteDoc(questionRef);
            let temp = JSON.parse(JSON.stringify(selectedQuestions))
            delete temp[questionID]
            setSelectedQuestions(temp)
        } else {
            await setDoc(questionRef, {});

            let temp = JSON.parse(JSON.stringify(selectedQuestions))
            temp[questionID] = null

            setSelectedQuestions(temp)
        }
    }





    let subList = null
    if (isExpanded) {

        subList = questions.map((question) => (
            <ListItem style={{ padding: 2, flexDirection: 'row', justifyContent: "space-evenly" }} key={question.id} >
                <Text> {question.question} </Text>
                <Checkbox value={question.id in selectedQuestions}
                    onValueChange={() => handleListUpdate(question.id)} ></Checkbox>
            </ListItem >

        ))


    }

    let gameView = null

    if (isLive) {

        gameView = (<LiveGameView game={props.game} />)



    }







    return (
        <View style={{
            flexDirection: 'column',
        }}>

            < ListItem

                style={{
                    padding: 5, justifyContent: 'space-between', backgroundColor: "#e5e5e5"
                }}
                back
            >

                <ListItem.Part>
                    <Text>{props.game["Home Team"]}</Text>
                </ListItem.Part>
                <ListItem.Part>
                    <Text>{props.game["Away Team"]}</Text>
                </ListItem.Part>
                <Button size={'small'} label={"Edit Questions"} onPress={() => setIsExpanded(!isExpanded)} />
                <Button size={'small'} label={"Go Live"} onPress={() => handleLive()} />

                <Button size={'small'} label={"Delete"} onPress={() => props.deleteGame(props.game.id)} />

            </ListItem >
            {subList}
            {gameView}
        </View >






    )





}