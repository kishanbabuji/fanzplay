import * as React from 'react';
import { View, TextField, Text, Button } from 'react-native-ui-lib';

export default function Admin({navigation}) {
    return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Admin</Text>
          <Button margin-5
        white50
        label="Edit"
        onPress={() => navigation.navigate('Edit')}
        />

      <Button margin-5
        white50
        label="Add Games"
        onPress={() => navigation.navigate('Add Games')}
      />
         <Button margin-5
        white50
        label="Add questions"
        onPress={() => navigation.navigate('Add questions')}
      />
           <Button
        margin-5
        white50
        label="logout"

        onPress={() => navigation.navigate('Login')}
      />
        </View>
    );
}