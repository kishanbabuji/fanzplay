import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native-ui-lib';
import Rewards from './rewardsScreen.js';
import Profile from './profileScreen.js';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator()

function Home( {navigation} ) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button margin-5
        white50
        label="Quiz"
        onPress={() => navigation.navigate('Quiz')}
        />
        </View>
    );
}
function HomeTab() {
    return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} 
        options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          />
        <Tab.Screen name="Rewards" component={Rewards}
         options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="gift" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="Profile" component={Profile} 
        options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
    </Tab.Navigator> 
    );
}
export default HomeTab;
 