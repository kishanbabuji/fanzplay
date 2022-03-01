import React from 'react';
import { View, TextField, Text, Button } from 'react-native-ui-lib';

export default function Login({navigation}) {
    return (
  
      <View flex paddingH-25 paddingT-120>
        <Text blue50 text20>Login</Text>
        <TextField text50 placeholder="username" grey10 />
        <TextField text50 placeholder="password" secureTextEntry grey10 />
        <Button margin-5
        white50
        label="Login"
        onPress={()=> navigation.navigate('Home')}
        />
      </View>
    );
  }