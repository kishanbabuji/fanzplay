



import * as React from "react";
import {
  View,
  TextField,
  Text,
  Button,
  Card,
  ListItem,
  Modal,
} from "react-native-ui-lib";
import { StyleSheet, ScrollView, Image } from "react-native";
import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import {  db } from "../firebase/firebaseClient";



export default function Rewards({ navigation }) {
  const [rewards, setRewards] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [rewardName, setRewardName] = useState("");
  const rewardImage = require("../assets/reward.png");
  const qr = require("../assets/QR.png");
  React.useEffect(async () => {
    let tempArray = [];
    const querySnapshot = await getDocs(collection(db, "rewards"));
    querySnapshot.forEach((doc) => {
      tempArray.push(doc.data());
    });
    setRewards(tempArray);
  }, []);

  console.log(rewards);

  return (
    <View
      style={{
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2e2f33",
      }}
    >
      <ScrollView>
        {rewards.map((element) => (
          <ListItem
            key={element["link"]}
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
              margin: 35,
            }}
          >
            <Card
              flex-center
              height={160}
              onPress={() => {
                setModalVisible(!modalVisible);
                setRewardName(element["name"]);
              }}
              useNative
              activeOpacity={1}
              activeScale={0.96}
              padding={5}
              enableShadow
              width={300}
            >
              <Card.Section
                backgroundColor="#cddc29"
                padding-20
                imageSource={rewardImage}
                contentStyle={{ alignItems: "center" }}
                imageStyle={{
                  height: "100%",
                  width: "100%",
                  resizeMode: "contain",
                }}
              />
              <Card.Section
                backgroundColor="#cddc29"
                padding-5
                // flex-3
                content={[
                  {
                    text60: true,
                    text: element["name"],
                    white: true,
                  },
                ]}
                contentStyle={{ alignItems: "center" }}
              />
            </Card>
            <Modal
              animationType="slide"
              // transparent={true}
              visible={!modalVisible}
              onRequestClose={() => {
                setModalVisibleCred(!modalVisibleCred);
              }}
              backgroundColor="#2e2f33"
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Image style={styles.image} source={qr}></Image>
                  <Text text40>{rewardName}</Text>
                  <Button
                    backgroundColor={"#FB4020"}
                    onPress={() => setModalVisible(!modalVisible)}
                    label={"Close!"}
                    enableShadow
                  ></Button>
                </View>
              </View>
            </Modal>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
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
  image: {
    width: 400,
    height: 450,
  },
});
