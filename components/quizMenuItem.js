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




export default function QuizMenuItem(props) {
    const [isExpanded, setIsExpanded] = useState(false)
    let db = getDatabase()

    const [hasSeen, setHasSeen] = useState(false)




    useEffect(() => {
        async function hasBeenJoined() {

            let userGame = await get(ref(db, `/users/${Object.keys(props.game)[0]}/${props.uid}/`))
            userGame = userGame.val()
            console.log(userGame)
            if (userGame["team"] != undefined) {
                setHasSeen(true)
            } else {

                setHasSeen(false)
            }




        }
        hasBeenJoined()





    }, [])


    function handleTeamSet(team) {

        set(ref(db, 'users/' + Object.keys(props.game)[0] + "/" + props.uid), {
            "team": team
        });
        setHasSeen(true)
        setIsExpanded(false)
        props.navigation.navigate("Quiz", { game: Object.keys(props.game)[0] })

    }

    function handleExpansion() {


        if (hasSeen) {
            props.navigation.navigate("Quiz", { game: Object.keys(props.game)[0] })



        } else {
            setIsExpanded(!isExpanded)
        }


    }





    let expandedSection = null

    if (isExpanded) {
        expandedSection = (
            <View style={{ height: 60, backgroundColor: Colors.rgba('#e5e5e5', 1), width: Dimensions.get('window').width - 20, justifyContent: "space-evenly", flexDirection: "row", alignItems: "center", display: "flex" }}>
                <Button
                    fullWidth={true}
                    sizes={Button.sizes.xSmall}
                    onPress={() => {
                        handleTeamSet(props.game[Object.keys(props.game)[0]]["Home Team"])
                    }
                    }
                    label={"Join As  " + props.game[Object.keys(props.game)[0]]["Home Team"]} />
                <Button
                    fullWidth={true}
                    sizes={Button.sizes.xSmall}
                    onPress={() => {


                        handleTeamSet(props.game[Object.keys(props.game)[0]]["Away Team"])
                    }
                    }

                    label={"Join As  " + props.game[Object.keys(props.game)[0]]["Away Team"]} />
            </View>)
    }




    return (
        <View style={{
            borderTopWidth: 0,
            borderStyle: "solid",
            borderWidth: 1,
            margin: 0,
            borderColor: Colors.rgba('#000000', 1),
        }}>
            <Card
                height={60}
                enableShadow={false}
                borderRadius={0}
                label={"Go to Quiz"}
                style={{
                    justifyContent: "center", alignItems: "center", borderWidth: "1",
                    borderStyle: "solid",
                    margin: 0,
                    borderColor: Colors.rgba('#000000', 0.1)
                }}


                onPress={() => {

                    handleExpansion()
                }

                }
                useNative
            >
                <Card.Section
                    backgroundColor={Colors.rgba('#e5e5e5', 1)}
                    width={Dimensions.get('window').width}
                    contentStyle={{ alignItems: "center", flexDirection: "row", justifyContent: "space-evenly", height: 60, width: Dimensions.get('window').width - 20 }}
                    content={[
                        {
                            text: props.game[Object.keys(props.game)[0]]["Home Team"],
                            text80: true,
                        },
                        {
                            text: "VS",
                            text70: true,
                        },
                        {
                            text: props.game[Object.keys(props.game)[0]]["Away Team"],
                            text80: true,
                        },
                    ]}
                >
                </Card.Section>
            </Card>
            {expandedSection}
        </ View>)





}