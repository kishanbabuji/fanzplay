import { ListItem, View, Text, Button } from "react-native-ui-lib";
import { getDatabase, set, ref, onValue, get, update } from "firebase/database";
import { useState } from "react";
import React, { useEffect } from "react";

export default function QuizMenu({ navigation }) {

    const [gamesList, setGameList] = useState()



    useEffect(() => {

        let db = getDatabase()
        let gamesRef = ref(db, "games")


        onValue(gamesRef, async (snapshot) => {

            let temp = []
            const data = await snapshot.val()
            for (let game in data) {

                tempObj = {}
                tempObj[game] = data[game]
                temp.push(tempObj)
            };
            setGameList(temp)

        })



    }, [])




    let activeGames = null

    if (gamesList) {
        activeGames = gamesList.map((game) =>
        (
            <ListItem key={Object.keys(game)[0]} style={{ minHeight: 50, alignItems: "center", justifyContent: "space-evenly" }}>
                <Text> {game[Object.keys(game)[0]]['Home Team']}</Text>
                <Button label={"Go to Quiz"} onPress={() => navigation.navigate('Quiz', { "game": Object.keys(game)[0] })} size={"small"} />
                <Text> {game[Object.keys(game)[0]]['Away Team']}</Text>
            </ListItem>


        )
        )




    }



    return (<View>

        {activeGames}




    </View>)



}