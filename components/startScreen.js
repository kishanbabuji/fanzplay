import * as React from 'react';
import { View, TextField, Text, Button, Card } from 'react-native-ui-lib';
import {StyleSheet, ScrollView} from 'react-native';
import {Component,useContext} from 'react';
import userInfoContext from './userInfoContext';

// const userContext = useContext(userInfoContext)

export default function startScreen({Navigation}){
    return(
        <View>
            <Button
           onPress={() => navigation.navigate('Login')}
            >

            </Button>
        </View>
    )

}