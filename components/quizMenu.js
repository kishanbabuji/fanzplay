import {
  ListItem,
  View,
  Text,
  Image,
  Button,
  TextField,
  Card,
  Colors,
} from "react-native-ui-lib";
import { getDatabase, set, ref, onValue, get, update } from "firebase/database";
import { useState, useContext, useEffect } from "react";
import userInfoContext from "./userInfoContext";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Modal,
} from "react-native";
import { Dimensions } from "react-native";
import QuizMenuItem from "./quizMenuItem"


export default function QuizMenu({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [gamesList, setGameList] = useState();
  const [activeGameList, setActiveGameList] = useState();
  const userContext = useContext(userInfoContext);

  const [joinCode, setJoinCode] = useState("")

  const [showJoin, setShowJoin] = useState(false)
  let db = getDatabase()



  async function handleGameJoin() {
    let db = getDatabase();
    let gameRef = await get(ref(db, "games"));


    const data = gameRef.val();
    for (let game in data) {
      if (joinCode == data[game]["Code to Join"]) {
        await set(ref(db, 'users/' + game + "/" + userContext.uid), {
          numberCorrect: 0,
          numberAnswered: 0
        });
        setGameList([...gamesList, data[game]])
      }

    }

    setJoinCode("")

  }



  useEffect(() => {
    let db = getDatabase();
    //let gamesRef = ref(db, "games");
    let userRef = ref(db, "users");

    onValue(userRef, async (snapshot) => {
      let temp = [];
      const data = await snapshot.val();
      for (let game in data) {
        // is the user currently registered for a game
        if (userContext.uid in data[game]) {
          let gamesRef = ref(db, `games/${game}`)
          let userGame = await get(gamesRef)

          let tempObj = {}
          tempObj[game] = userGame.val()
          temp.push(tempObj);
        }

      }

      setGameList(temp);
    });
  }, []);

  let activeGames = null;



  if (gamesList) {
    activeGames = gamesList.map((game) => (

      < QuizMenuItem key={Object.keys(game)[0]} uid={userContext.uid} game={game} navigation={navigation} >

      </QuizMenuItem >

    ));
  }

  return (
    <>
      <ScrollView style={{ marginLeft: 5, marginRight: 5 }}>

        <Text text70 style={{ padding: 5, }}>Currently Active Games</Text>
        <View
          style={{ marginLeft: 5, marginRight: 5 }}


        >
          {activeGames}
        </View>
        <Text text70 style={{ marginLeft: 10, marginTop: 10 }}>Join a New Game</Text>
        <View style={{
          width: Dimensions.get('window').width - 20,
          bottom: 0,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          height: 100,
          marginLeft: 10,
          marginTop: -25,
          marginRight: 10

        }}>

          <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            marginRight: 5,
            marginLeft: 5

          }}>
            <Text text80 >Enter Code:</Text>
            <TextField text70 style={{ width: 150, height: 50 }} value={joinCode}
              onChangeText={(joinCode) => setJoinCode(joinCode)} />

          </View>
          <Button backgroundColor={Colors.rgba('#43aa8b', 1)}

            style={{ height: 40, marginBottom: 10, marginTop: 10 }}

            fullWidth={true} label={"submit"}
            onPress={() => {
              handleGameJoin()
            }}


          ></Button>

        </View>

      </ScrollView >

    </>
  );
}
Colors.loadColors({
  text: "#879428",
});
const styles = StyleSheet.create({
  picker: {
    width: 300,
    height: 200,
  },
  PickerItem: {
    height: 100,
    color: 'red',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    // height: 40,
    // margin: 12,
    width: 200,
    // borderWidth: 1,
    // padding: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
