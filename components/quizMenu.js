import {
  ListItem,
  View,
  Text,
  Button,
  Card,
  Colors,
} from "react-native-ui-lib";
import { getDatabase, set, ref, onValue, get, update } from "firebase/database";
import { useState, useContext, useEffect } from "react";
import userInfoContext from "./userInfoContext";
import * as React from "react";
import { ScrollView } from "react-native";

export default function QuizMenu({ navigation }) {
  const [gamesList, setGameList] = useState();
  const [activeGameList, setActiveGameList] = useState();
  const userContext = useContext(userInfoContext);

  useEffect(() => {
    let db = getDatabase();
    let gamesRef = ref(db, "games");
    let userRef = ref(db, "users");

    onValue(gamesRef, async (snapshot) => {
      let temp = [];
      const data = await snapshot.val();
      for (let game in data) {
        console.log(game, "here");
        let tempObj = {};
        tempObj[game] = data[game];
        temp.push(tempObj);
      }
      setGameList(temp);
    });
  }, []);

  let activeGames = null;

  // function signUpUser(gameID){

  //     update(ref(db, `users/${gameID}/${userContext.uid}/${currentQuestion.id}`), {
  //         "answered": true,
  //         "correct": false,
  //     })

  // }

  if (gamesList) {
    activeGames = gamesList.map((game) => (
      <ListItem
        key={Object.keys(game)[0]}
        style={{
          alignItems: "center",
          justifyContent: "space-evenly",
          margin: 25,
        }}
      >
        <Card
          height={160}
          label={"Go to Quiz"}
          onPress={() =>
            navigation.navigate("Quiz", { game: Object.keys(game)[0] })
          }
          useNative
        >
          <Card.Section
            backgroundColor={Colors.text}
            padding-20
            flex-3
            width={250}
            content={[
              {
                text: game[Object.keys(game)[0]]["Home Team"],
                text60: true,
                white: true,
              },
              {
                text: "VS.",
                text70: true,
                white: true,
              },
              {
                text: game[Object.keys(game)[0]]["Away Team"],
                text60: true,
                white: true,
              },
            ]}
            contentStyle={{ alignItems: "center", paddingVertical: 25 }}
          />
        </Card>
      </ListItem>

      // <ListItem key={Object.keys(game)[0]} style={{ minHeight: 50, alignItems: "center", justifyContent: "space-evenly" }}>
      //     <Text> {game[Object.keys(game)[0]]['Home Team']}</Text>
      //     <Button label={"Go to Quiz"} onPress={() => navigation.navigate('Quiz', { "game": Object.keys(game)[0] })} size={"small"} />
      //     {/* <Button label={"Signup"} onPress={() => signUpUser(Object.keys(game)[0]) }/> */}
      //     <Text> {game[Object.keys(game)[0]]['Away Team']}</Text>
      // </ListItem>
    ));
  }

  return (
    <ScrollView>
      <Text text30>My Games:</Text>

      {activeGames}

      <Text text30>Signup for a new Game:</Text>
    </ScrollView>
  );
}
Colors.loadColors({
  text: "#879428",
});
