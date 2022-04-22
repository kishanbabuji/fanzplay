import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button } from "react-native-ui-lib";
import React from "react";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Rewards from "./rewardsScreen";
import Profile from "./profileScreen";
import Admin from "./adminScreen";
import userInfoContext from "./userInfoContext";
import Login from "./login";
import QuizMenu from "./quizMenu";
import styles from "../App.js";

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.containter}>
      <Button
        margin-5
        color="#2e2f33"
        label="Quiz Menu"
        onPress={() => navigation.navigate("Quiz Menu")}
      />
    </View>
  );
}
function HomeTab() {
  const userContext = useContext(userInfoContext);
  return (
    <Tab.Navigator {...{ screenOptions }}>
      {!userContext.isAdmin ? (
        <Tab.Screen
          name="Home"
          component={QuizMenu}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            tabBarActiveTintColor: "#cddc29",
            headerStyle: { backgroundColor: "#2e2f33" },
            headerTintColor: "#fff",
          }}
        />
      ) : null}

      {!userContext.isAdmin ? (
        <Tab.Screen
          name="Rewards"
          component={Rewards}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="gift" color={color} size={size} />
            ),
            tabBarActiveTintColor: "#cddc29",
            headerStyle: { backgroundColor: "#2e2f33" },
            headerTintColor: "#fff",
          }}
        />
      ) : null}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#cddc29",
          headerStyle: { backgroundColor: "#2e2f33" },
          headerTintColor: "#fff",
        }}
      />
      {userContext.isAdmin ? (
        <Tab.Screen
          name="Admin"
          component={Admin}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
            tabBarActiveTintColor: "#cddc29",
            headerStyle: { backgroundColor: "#2e2f33" },
            headerTintColor: "#fff",
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}

const screenOptions = {
  tabBarStyle: {
    backgroundColor: "#2e2f33",
  },
  // tabBarItemStyle:{
  //   backgroundColor:'#00ff00',
  //   margin:5,
  //   borderRadius:10,
  // }
};
export default HomeTab;
