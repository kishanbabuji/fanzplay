import { ListItem, View, Text, Button } from "react-native-ui-lib";
import { getDatabase, set, ref, onValue, get, update } from "firebase/database";
import { useState,useContext } from "react";
import React, { useEffect, useContext } from "react";
import userInfoContext from './userInfoContext'

export default function QuizMenu({ navigation }) {

    const [gamesList, setGameList] = useState()
    const [activeGameList,setActiveGameList] = useState()
    const userContext = useContext(userInfoContext)



    useEffect(() => {

        let db = getDatabase()
        let gamesRef = ref(db, "games")
        let userRef = ref(db,"users")
       
        onValue(gamesRef, async (snapshot) => {
            let temp = []
            const data = await snapshot.val()
            for (let game in data) {
                console.log(game, "here")
                let tempObj = {}
                tempObj[game] = data[game]
                temp.push(tempObj)
            };
            setGameList(temp)
        })
    }, [])




    let activeGames = null

    // function signUpUser(gameID){

    //     update(ref(db, `users/${gameID}/${userContext.uid}/${currentQuestion.id}`), {
    //         "answered": true,
    //         "correct": false,
    //     })


    // }




    if (gamesList) {
        activeGames = gamesList.map((game) =>
        (
            <ListItem key={Object.keys(game)[0]} style={{ minHeight: 50, alignItems: "center", justifyContent: "space-evenly" }}>
                <Text> {game[Object.keys(game)[0]]['Home Team']}</Text>
                <Button label={"Go to Quiz"} onPress={() => navigation.navigate('Quiz', { "game": Object.keys(game)[0] })} size={"small"} />
                {/* <Button label={"Signup"} onPress={() => signUpUser(Object.keys(game)[0]) }/> */}
                <Text> {game[Object.keys(game)[0]]['Away Team']}</Text>
            </ListItem>


        )
        )
    }



    return (<View>

        <Text>
            My Games:
        </Text>

        {activeGames}

        <Text>
            Signup for a new Game:
        </Text>
        




    </View>)



}