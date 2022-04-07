import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native-ui-lib';
import React from 'react';
import { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Rewards from './rewardsScreen'
import Profile from './profileScreen'
import Admin from './adminScreen'
import userInfoContext from './userInfoContext';
import Login from './login';


const Tab = createBottomTabNavigator()

function HomeScreen({ navigation }) {
    return(

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button margin-5
        white50
        label="Quiz Menu"
        onPress={() => navigation.navigate('Quiz Menu')}
        />
        </View>
    );
}
function HomeTab() {
  const userContext = useContext(userInfoContext)
  console.log(userContext.isAdmin)
    return (
    <Tab.Navigator>
     {!userContext.isAdmin ? (<Tab.Screen name="Home" component={HomeScreen} 
        options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          />):null}

        {!userContext.isAdmin ? (<Tab.Screen name="Rewards" component={Rewards}
         options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="gift" color={color} size={size} />
            ),
          }}
        />):null}

        <Tab.Screen name="Profile" component={Profile} 
        options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
          {userContext.isAdmin ? (<Tab.Screen name="Admin" component={Admin} 
        options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />):null}
    </Tab.Navigator> 
    );
}
export default HomeTab;