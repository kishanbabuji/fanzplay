import * as React from 'react';
import { View, TextField, Text, Button, Colors, Image } from 'react-native-ui-lib';
import { styles } from '../App';

const image3 = require("../assets/output-onlinepngtools.png")

export default function Admin({navigation}) {
    return(
    <View style={styles.container2}>
        <Image source={image3} style={styles.image2}></Image>

        <Button margin-5
          style={{bottom: 100}}
          white50
          backgroundColor={Colors.text}
          color="#2e2f33"
          label="Games List"
          onPress={() => navigation.navigate('Games List')}
          enableShadow={true}
        />
        <Button margin-5
          style={{bottom: 100}}
          white50
          backgroundColor={Colors.text}
          color="#2e2f33"
          label="Add questions"
          onPress={() => navigation.navigate('Add questions')}
          enableShadow={true}
        />
           <Button margin-5
          style={{bottom: 100}}
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