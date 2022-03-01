import { View, Button } from "react-native-ui-lib"
import { getDatabase, set, ref, onValue, get, update } from "firebase/database";
import * as React from 'react';



export default function AddGames() {

    function addGame() {
        let db = getDatabase()

        console.log("here")
        update(ref(db, 'games/questionId'), {
            "question": "best player",
            "answer1": "leaky",
            "answer2": "caleb",
            "answer3": "kerwin",
            "answer4": "Mark Aiello",
            "correctAnswer": "leaky"
        })
    }





    return (

        <View>

            <Button
                size={Button.sizes.medium}
                onPress={addGame}
                label={"Add Game"}>

            </Button>



        </View>




    )




}