import * as React from 'react';
import { View, TextField, Text, Button } from 'react-native-ui-lib';

export default function Profile({navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>My Profile</Text>
          <Button margin-5
          white50
          label="Logout"
          onPress={() => navigation.navigate('Login')}
        />
        </View>
      );
}