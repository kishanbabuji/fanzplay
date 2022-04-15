import {
  ListItem,
  View,
  Text,
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
  let db = getDatabase()



  async function handleGameJoin() {
    let db = getDatabase();
    let gameRef = await get(ref(db, "games"));


    const data = gameRef.val();
    for (let game in data) {
      if (joinCode == data[game]["Code to Join"]) {

        console.log(userContext.uid)
        set(ref(db, 'users/' + game + "/" + userContext.uid), {
          test: "yo"
        });
        console.log("ehhrsajkdfhjosaijf")
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
    <ScrollView>

      <View style={{
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        padding: 5

      }}>
        <Text >Enter Code to Join Game</Text>
        <TextField placeholder="Code To Join" text70 style={{ width: 150 }} value={joinCode}
          onChangeText={(joinCode) => setJoinCode(joinCode)} />

        <Button backgroundColor={Colors.rgba('#43aa8b', 1)} fullWidth={true} label={"submit"}
          onPress={() => {
            handleGameJoin()
          }}


        ></Button>

      </View>

      <Text text70 style={{ padding: 5, }}>Currently Active Games</Text>
      <View>
        {activeGames}
      </View>


    </ScrollView >
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
