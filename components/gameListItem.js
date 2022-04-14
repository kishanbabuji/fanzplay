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
    const [rewards,setRewards]=useState([])
    const [selectedRewards,setSelectedRewards] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const [isExpanded2, setIsExpanded2] = useState(false)

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

            let rewardArr = [];
            const rewardSnapshot = await getDocs(collection(db, "rewards"));
            rewardSnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                rewardArr.push({ ...doc.data(), id: doc.id });
            });

            let selectedRewardsMap = {}
            const rquerySnapshot = await getDocs(collection(db, "games", props.game.id, "questions"));
            rquerySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                selectedRewardsMap[doc.id] = null;
            });
            console.log(rewardArr)
            setSelectedQuestions(selectedQuestionsMap)
            setQuestions(questionArr)
            setRewards(rewardArr)
            setSelectedRewards(selectedRewardsMap)
        }
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

    async function handleRewardUpdate(rewardId) {

        const rewardref = doc(db, "games", props.game.id, "rewards", rewardId)
        //need to add game to current list
        if (rewardId in selectedRewards) {
            await deleteDoc(rewardref);
            let temp = JSON.parse(JSON.stringify(selectedRewards))
            delete temp[rewardId]
            setSelectedRewards(temp)
        } else {
            await setDoc(rewardref, {});

            let temp = JSON.parse(JSON.stringify(selectedRewards))
            temp[rewardId] = null

            setSelectedRewards(temp)
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
    
    let rewardSubList = null
    if (isExpanded2) {

        rewardSubList = rewards.map((reward) => (
            <ListItem style={{ padding: 2, flexDirection: 'row', justifyContent: "space-evenly" }} key={reward.id} >
                <Text> {reward.name} </Text>
                <Checkbox value={reward.id in selectedRewards}
                    onValueChange={() => handleRewardUpdate(reward.id)} ></Checkbox>
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
                <Button style = {{ width: 80,height: 40}} size={"xSmall"} label={"Edit Questions"} onPress={() => setIsExpanded(!isExpanded)} />
                <Button  style = {{ width: 80,height: 40}}size={'xSmall'} label={"Edit Rewards"} onPress={() => setIsExpanded2(!isExpanded2)} />
                <Button  style = {{ width: 80,height: 40}} size={'xSmall'} label={"Go Live"} onPress={() => handleLive()} />

                <Button style = {{ width: 80,height: 40}}  size={'xSmall'} label={"Delete"} onPress={() => props.deleteGame(props.game.id)} />

            </ListItem >
            {subList}
            {rewardSubList}
            {gameView}
        </View >






    )





}