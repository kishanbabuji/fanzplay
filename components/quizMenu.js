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
import { ScrollView,StyleSheet } from "react-native";
import {
    Modal,
  } from "react-native";

export default function QuizMenu({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
  const [gamesList, setGameList] = useState();
  const [activeGameList, setActiveGameList] = useState();
  const userContext = useContext(userInfoContext);
  const[homeTeam,setHomeTeam] = useState();
  const[awayTeam,setAwayTeam] = useState();
  const[gameID,setGameID] = useState();

  let db = getDatabase()

  function addUsertoHome(){
   
    set(ref(db, 'users/' + gameID + "/" + userContext.uid), {
        "team" : homeTeam
    });
      
  }

  function addUsertoAway(){
   
    set(ref(db, 'users/' + gameID + "/" + userContext.uid), {
        "team" : awayTeam
    });
      
  }


  useEffect(() => {
    let db = getDatabase();
    let gamesRef = ref(db, "games");
    let userRef = ref(db, "users");

    onValue(gamesRef, async (snapshot) => {
      let temp = [];
      const data = await snapshot.val();
      for (let game in data) {
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
          onPress={() =>{
            setHomeTeam(game[Object.keys(game)[0]]["Home Team"]),
            setAwayTeam(game[Object.keys(game)[0]]["Away Team"]),
            console.log(Object.keys(game)),
            setGameID(Object.keys(game)[0]),
            navigation.navigate("Quiz", { game: Object.keys(game)[0] }),
            setModalVisible(true)}
            
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
           <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
             <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>
                    Select your team!
                  </Text>
                  <Button
                    backgroundColor={Colors.text}
                    onPress={() => {
                         addUsertoHome(),
                        setModalVisible(!modalVisible)
                    }}
                    label={homeTeam}
                    enableShadow
                  ></Button>
                    <Button
                    backgroundColor={Colors.text}
                    onPress={() => {
                        addUsertoAway(),
                        setModalVisible(!modalVisible)
                    }}
                    label={awayTeam}
                    enableShadow
                  ></Button>
                </View>
              </View>
            </Modal>


      {activeGames}


    </ScrollView>
  );
}
Colors.loadColors({
  text: "#879428",
});
const styles = StyleSheet.create({
    picker: {
      width: 300, 
      height:200, 
    },
    PickerItem:{
      height:100,
      color:'red',
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
