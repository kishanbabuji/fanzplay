import { View, Button,Text, Colors } from "react-native-ui-lib"
import { getDatabase, ref, update } from "firebase/database";
import * as React from 'react';
import { useState } from 'react';
import { db } from "../firebase/firebaseClient";
import { collection, getDocs,updateDoc } from "firebase/firestore";





export default function AddGames() {

    const[question,setQuestion] = useState("")
    const[correctanswer,setCorrectAnswer] = useState("")
    const[answer1,setAnswer1] = useState("")
    const[answer2,setAnswer2] = useState("")
    const[answer3,setAnswer3] = useState("")
    const[answer4,setAnswer4] = useState("")
    const[counter,setCounter] = useState(0)
    const[arr,setArr] = useState([])

    






React.useEffect(async () => {
    questionArr = [];
   
// get the list of questions from the firestore database and add them to the arr state variable
const querySnapshot = await getDocs(collection(db, "questions"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  questionArr.push(doc.data());
});
setArr(questionArr)

    }, [])








     function addGame() {

        //get an instance of the realitime database
        let db = getDatabase()

        //push the currently selected question to the games realtime database table
        update(ref(db, 'games/questionId'), {
            "question": question,
            "answer1": answer1,
            "answer2": answer2,
            "answer3": answer3,
            "answer4": answer4,
            "correctAnswer": correctanswer
        })
        // update(ref(db,'users/questionId'),{
        //     "answered": false,
        //     "correct":false
        // })

        setQuestion("")
        setAnswer1("")
        setAnswer2("")
        setAnswer3("")
        setAnswer4("")
        setCorrectAnswer("")

      
    }

    function loadQuestion(){
 
        if(counter >= arr.length){

        }
        else{
        // set the state variables to reflect the currently selected question
        //in the future we might want to improve this with use of a use reducer hook
        setQuestion(arr[counter].question)
        setAnswer1(arr[counter].answer1)
        setAnswer2(arr[counter].answer2)
        setAnswer3(arr[counter].answer3)
        setAnswer4(arr[counter].answer4)
        setCorrectAnswer(arr[counter].correctanswer)
        setCounter(counter+1)

        }
        

    }





    return (

        <View>

          
            <Button
            color="#2e2f33" 
            backgroundColor= {Colors.text}
                size={Button.sizes.medium}
                onPress={loadQuestion}
                label={"Loads Next Question"}>
            </Button>

            <Text>
               Next Question:
            </Text>

            <Text>
              Question:  {question}
            </Text>
            <Text>
              Correct Answer:   {correctanswer}
            </Text>
            <Text>
                Incorrect Answer: {answer1}
            </Text>
            <Text>
                Incorrect Answer: {answer2}
            </Text>
            <Text>
                Incorrect Answer: {answer3}
            </Text>
         






        
            <Button 
            color="#2e2f33" 
            backgroundColor= {Colors.text}
                size={Button.sizes.medium}
                onPress={addGame}
                label={"Push Question to User"}>
            </Button>




        </View>




    )




}
Colors.loadColors({
    text: "#cddc29",
    text2: "#FFF",
  });