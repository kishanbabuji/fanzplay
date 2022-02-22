import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './components/signup';
import * as React from 'react';


import { initializeApp } from 'firebase/app';
import { firebase } from './firebase/firebaseClient';
export default function App() {

  const app = firebase

  return (
    <View style={styles.container}>
      <Text>fanz play</Text>
      <Signup />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
