import * as React from 'react';
import { View, TextField, Text, Button, Colors } from 'react-native-ui-lib';
import { styles } from '../App';

export default function Admin({navigation}) {
    return(
    <View style={{backgroundColor: '#2e2f33', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
        <Button margin-5
          white50
          backgroundColor={Colors.text}
          color="#2e2f33"
          label="Games List"
          onPress={() => navigation.navigate('Games List')}
          enableShadow={true}
        />
        <Button margin-5
          white50
          backgroundColor={Colors.text}
          color="#2e2f33"
          label="Add questions"
          onPress={() => navigation.navigate('Add questions')}
          enableShadow={true}
        />
           <Button margin-5
          white50
          backgroundColor={Colors.text}
          color="#2e2f33"
          label="Upload Rewards"
          onPress={() => navigation.navigate('Add Rewards')}
          enableShadow={true}
        />
       
 
        </View>
    );
    
}
Colors.loadColors({
      text: "#cddc29",
      text2: "#FFF",
    });