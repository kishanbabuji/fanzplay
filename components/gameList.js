import { View, ListItem, Text, Button, TextField } from 'react-native-ui-lib';

import React, { useState, useContext, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";
import GameListItem from './gameListItem';
import AddGames from './addGames';



export default function GameList() {

    const [gameList, setGameList] = useState([])


    async function deleteGame(gameID) {
        console.log(gameID)
        const querySnapshot = doc(db, "games", gameID)
        await deleteDoc(querySnapshot)
        setGameList(gameList.filter((game) => game.id != gameID))

    }

    const [isExpanded, setIsExpanded] = useState(false)
    const [homeTeam, setHomeTeam] = useState("")
    const [awayTeam, setAwayTeam] = useState("")
    const [joinCode, setJoinCode] = useState("")

    let drawer = null
    if (isExpanded) {
        drawer =
            (<View>
                <View style={{ padding: 10 }}>
                    <TextField value={homeTeam} placeholder={"Home Team"} onChangeText={(homeTeam) => setHomeTeam(homeTeam)}></TextField>
                    <TextField value={awayTeam} placeholder={"Away Team"} onChangeText={(awayTeam) => setAwayTeam(awayTeam)}></TextField>
                    <TextField value={joinCode} placeholder={"Code to Join"} onChangeText={(joinCode) => setJoinCode(setJoinCode)}

                    ></TextField>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button label={"Confirm"} onPress={() => AddGame()} />
                    <Button label={"Cancel"} onPress={() => setIsExpanded(!isExpanded)} />
                </View>
            </View >)
    }





    async function AddGame() {

        await setDoc(doc(collection(db, "games")), {
            "Away Team": awayTeam,
            "Home Team": homeTeam,
            "Join Code": joinCode

        });
        setIsExpanded(false)
        setAwayTeam("")
        setHomeTeam("")
        setJoinCode("")
        updateGames()

    }


    async function updateGames() {
        gamesArr = [];
        const querySnapshot = await getDocs(collection(db, "games"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            gamesArr.push({ ...doc.data(), id: doc.id });
        });
        setGameList(gamesArr)
    }



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
        <View style={{ padding: 5 }}>
            <Button label={"Add Game"} size={"small"} onPress={() => setIsExpanded(!isExpanded)} />
            {drawer}
            {Games}
        </View >

    )





}