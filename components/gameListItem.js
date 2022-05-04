import { View, ListItem, Text, Button, Checkbox, Colors } from 'react-native-ui-lib';
import React, { useState, useContext, useEffect } from 'react';
import { collection, getDoc, getDocs, updateDoc, doc, deleteField, setDoc, deleteDoc,getFirestore } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";
import LiveGameView from './liveGameView';
import { useLinkProps } from '@react-navigation/native';
import { getDatabase, database, set, ref, onValue, get, update, remove,query } from "firebase/database";


export default function GameListItem(props) {

    const [questions, setQuestions] = useState([])
    const [selectedQuestions, setSelectedQuestions] = useState([])
    const [rewards, setRewards] = useState([])
    const [selectedRewards, setSelectedRewards] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const [isExpanded2, setIsExpanded2] = useState(false)
    const [winningTeam,setWinningTeam] = useState("")
    const [users, setUsers] = useState([])

    const [isLive, setIsLive] = useState(false)

    useEffect(() => {
        // this function stores all the current questions and rewards from the firestore db in local state variables
        async function getGames() {

            //get all questions stored in the questions table of the firestore database
            let questionArr = [];
            const questionSnapshot = await getDocs(collection(db, "questions"));
            questionSnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                questionArr.push({ ...doc.data(), id: doc.id });
            });

            //get the currently selected questions from the games/props.game.id/questions firebase table
            let selectedQuestionsMap = {}
            const querySnapshot = await getDocs(collection(db, "games", props.game.id, "questions"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                selectedQuestionsMap[doc.id] = null;
            });

            //get all questions stored in the rewards table of the firestore database
            let rewardArr = [];
            const rewardSnapshot = await getDocs(collection(db, "rewards"));
            rewardSnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                rewardArr.push({ ...doc.data(), id: doc.id });
            });

            //get the currently selected questions from the games/props.game.id/rewards firebase table
            let selectedRewardsMap = {}
            const rquerySnapshot = await getDocs(collection(db, "games", props.game.id, "rewards"));
            rquerySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                selectedRewardsMap[doc.id] = null;
            });
            setSelectedQuestions(selectedQuestionsMap)
            setQuestions(questionArr)
            setRewards(rewardArr)
            setSelectedRewards(selectedRewardsMap)
        }

        async function isGameLive() {

            //get the game from real time db with the associated game id (passed in a a prop)
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
        isGameLive()
        getGames()


    }, [])


    function handleLive() {


        let rtdb = getDatabase()

        if (isLive) {
            //remove live db game
            setIsLive(false)
        } else {
            //add game to live db
            update(ref(rtdb, `games/${props.game.id}`), {
                "AwayTeam": props.game["AwayTeam"],
                "HomeTeam": props.game["HomeTeam"],
                "Code to Join": props.game["Join Code"],
                "HomeCorrect": 0,
                "HomeAnswered": 0,
                "AwayCorrect": 0,
                "AwayAnswered": 0
            })


            setIsLive(true)
        }



    }

    async function handleGameEnd(){
    //initialize function values for home/away # answered and # correct
    //update function values to current score in database for the game
    //calculate winning team based off higher % correct
    // for each user in the realtime database if they were on the winning team add gameid/reward to the user's reward collection
    


    let rtdb = getDatabase()
    let homeC =0
    let homeA =0
    let awayC =0
    let awayA =0
    var tempWinner = ""

    let gamesRef = ref(rtdb, `games/${props.game.id}`)
    let usersRef = ref(rtdb, `users/${props.game.id}`)
    const gameScoreRef = ref(rtdb, `games/${props.game.id}`);

         onValue(gameScoreRef, (snapshot) => {
        const data = snapshot.val();
      
        if(snapshot.val() != undefined){
        homeC = data.HomeCorrect
        homeA = data.HomeAnswered
        awayC = data.AwayCorrect
        awayA = data.AwayAnswered
        if(homeA==0 && homeC == 0){
             tempWinner=data.AwayTeam
             setWinningTeam(data.AwayTeam)
            }
        else if(awayA==0 && awayC == 0){
             setWinningTeam(data.HomeTeam)
              tempWinner=data.HomeTeam
        }
        else if(homeC/homeA >= awayC/awayA) {
            setWinningTeam(data.HomeTeam)
            tempWinner=data.HomeTeam
        }
        else {
            setWinningTeam(data.AwayTeam)
            tempWinner=data.AwayTeam
        }
        }
    })
   

     
    const dbRef = ref(rtdb, `users/${props.game.id}`);
    let temp = []
    var counter =0; 
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
      if(childSnapshot.val().team == tempWinner) {
        db.collection("users")
        .doc(childSnapshot.key)
        .collection("rewards")
        .doc(props.game.id)
        .set(selectedRewards,{ merge: true })
      }
      //if user is on winning team
      //add rewards to firestore db
   
      });
    }, {
       onlyOnce: true
    });

 


    }






    async function handleListUpdate(questionID) {

        const questionRef = doc(db, "games", props.game.id, "questions", questionID)
        if (questionID in selectedQuestions) {
            await deleteDoc(questionRef);
            //make a deep copy of the selectedQuestions variable
            let temp = JSON.parse(JSON.stringify(selectedQuestions))
            //delete the to be deleted question from the selected questions list
            delete temp[questionID]
            setSelectedQuestions(temp)
        } else {
            await setDoc(questionRef, {});
            //make a deep copy of the selectedQuestions variable
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
            //make a deep copy of the selectedRewards variable

            let temp = JSON.parse(JSON.stringify(selectedRewards))
            delete temp[rewardId]
            setSelectedRewards(temp)
        } else {
            await setDoc(rewardref, {});
            //make a deep copy of the selectedRewards variable
            let temp = JSON.parse(JSON.stringify(selectedRewards))
            temp[rewardId] = null

            setSelectedRewards(temp)
        }
    }





    let subList = null
    if (isExpanded) {

        subList = questions.map((question) => (
            <ListItem style={{top: 20, padding: 2, flexDirection: 'row', justifyContent: "space-evenly" }} key={question.id} >
                <Text style={{paddingTop: 30}}color="#fff"> {question.question} </Text>
                <Checkbox style={{left: 20, marginTop: 30}} color="#cddc29"value={question.id in selectedQuestions}
                    onValueChange={() => handleListUpdate(question.id)} ></Checkbox>
            </ListItem >

        ))
    }

    let rewardSubList = null
    if (isExpanded2) {

        rewardSubList = rewards.map((reward) => (
            <ListItem style={{ top:30, padding: 2, flexDirection: 'row', justifyContent: "space-evenly" }} key={reward.id} >
                <Text color="#fff"> {reward.name} </Text>
                <Checkbox style={{left: 10}}color="#cddc29" value={reward.id in selectedRewards}
                    onValueChange={() => handleRewardUpdate(reward.id)} ></Checkbox>
            </ListItem >

        ))
    }

    let gameView = null

    if (isLive) {

        gameView = (<LiveGameView game={props.game} />)



    }

    return (
        <View  style={{
            flexDirection: 'column', padding: 50
        }}>

            < ListItem 

                style={{
                    paddingTop: 5, justifyContent: 'space-between', backgroundColor: "#2e2f33", 
                }}
                back
            >

                <ListItem.Part >
                    <Text color="white">{props.game["HomeTeam"]}</Text>
                    <Text color="white"> vs.</Text>
                </ListItem.Part>
                <ListItem.Part>
                    <Text style={{paddingRight: 10}}color="white">{props.game["AwayTeam"]}</Text>
                </ListItem.Part>
                
                <ListItem.Part middle column >            
                    <Button color="#2e2f33" backgroundColor= {Colors.text}style={{ width: 200, height: 30 }} size={"xSmall"} label={"Edit Questions"} onPress={() => setIsExpanded(!isExpanded)} />
               
                
                    <Button color="#2e2f33" backgroundColor= {Colors.text}style={{ width: 200, height: 30 }} size={'xSmall'} label={"Edit Rewards"} onPress={() => setIsExpanded2(!isExpanded2)} />
              
                    <Button color="#2e2f33" backgroundColor= {Colors.text}style={{ width: 200, height: 30 }} size={'xSmall'} label={"Go Live"} onPress={() => handleLive()} />

              
                    <Button color="#2e2f33" backgroundColor= {Colors.text}style={{ width: 200, height: 30 }} size={'xSmall'} label={"Delete Game"} onPress={() => props.deleteGame(props.game.id)} />
                    <Button color="#2e2f33" backgroundColor= {Colors.text}style={{ width: 200, height: 30 }} size={'xSmall'} label={"End Game"} onPress={() => handleGameEnd()} />
                
                </ListItem.Part>

                

            </ListItem >
            {subList}
            {rewardSubList}
            {gameView}
        </View >






    )





}
Colors.loadColors({
    text: "#cddc29",
    text2: "#FFF",
  });