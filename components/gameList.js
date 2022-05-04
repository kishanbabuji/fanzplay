import { View, ListItem, Text, Button, TextField, Colors } from 'react-native-ui-lib';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";
import { getDatabase, ref, remove } from "firebase/database";

import GameListItem from './gameListItem';




export default function GameList() {

    const [gameList, setGameList] = useState([])


    async function deleteGame(gameID) {

        //delete game from rtdb tables
        //this involves deleting the game from both the users and games table
        let rtdb = getDatabase()
        let gamesRef = ref(rtdb, `games/${gameID}`)
        let usersRef = ref(rtdb, `users/${gameID}`)
        remove(gamesRef)
        remove(usersRef)


        // delete this game from the firestore database
        const querySnapshot = doc(db, "games", gameID)
        await deleteDoc(querySnapshot)
        //remove this game from the gamelist local state
        setGameList(gameList.filter((game) => game.id != gameID))

    }

    const [isExpanded, setIsExpanded] = useState(false)
    const [homeTeam, setHomeTeam] = useState("")
    const [awayTeam, setAwayTeam] = useState("")
    const [joinCode, setJoinCode] = useState("")

    //this variable holds the frontend form where home team, away team, and code to join can be entered 
    let drawer = null
    if (isExpanded) {
        drawer =
            (<View>
                <View style={{ padding: 10 }}>
                    <TextField color="white" value={homeTeam} placeholder={"Home Team"} onChangeText={(homeTeam) => setHomeTeam(homeTeam)}></TextField>
                    <TextField color="white" value={awayTeam} placeholder={"Away Team"} onChangeText={(awayTeam) => setAwayTeam(awayTeam)}></TextField>
                    <TextField color="white" value={joinCode} placeholder={"Code to Join"} onChangeText={(joinCode) => setJoinCode(joinCode)}

                    ></TextField>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button color="#2e2f33" backgroundColor= {Colors.text}label={"Confirm"} onPress={() => AddGame()} />
                    <Button color="#2e2f33" backgroundColor= {Colors.text}label={"Cancel"} onPress={() => setIsExpanded(!isExpanded)} />
                </View>
            </View >)
    }





    async function AddGame() {

        //add a game to the firestore database with attributes entered in the drawer variable
        await setDoc(doc(collection(db, "games")), {
            "AwayTeam": awayTeam,
            "HomeTeam": homeTeam,
            "Join Code": joinCode

        });
        setIsExpanded(false)
        setAwayTeam("")
        setHomeTeam("")
        setJoinCode("")
        updateGames()

    }


    async function updateGames() {
        //this function runs after a game is added and re retreives all of the games currently stored in the firestore games table
        gamesArr = [];
        const querySnapshot = await getDocs(collection(db, "games"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            gamesArr.push({ ...doc.data(), id: doc.id });
        });
        setGameList(gamesArr)
    }



    //this useeffect runs on page render and gathers all the games objects currently stored in the firestore database table
    useEffect(
        () => {
            async function updateGames() {
                gamesArr = [];
                const querySnapshot = await getDocs(collection(db, "games"));
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    gamesArr.push({ ...doc.data(), id: doc.id });
                });
                setGameList(gamesArr)
            }
            updateGames()



        }, [])



    const Games = gameList.map((game) => (
        <GameListItem game={game} key={game.id} deleteGame={deleteGame} />
    ))




    return (
        
        <View backgroundColor= "#2e2f33" style={{ padding: 5 }}>
            <Button color="#2e2f33" backgroundColor= {Colors.text} label={"Add Game"} size={"small"} onPress={() => setIsExpanded(!isExpanded)} />
            {drawer}
            {Games}
        </View >

    )

}
Colors.loadColors({
    text: "#cddc29",
    text2: "#FFF",
  });