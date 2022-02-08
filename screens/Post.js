import * as React from 'react';
import { Text, View, Button } from 'react-native';

function IDK({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>POSTS!</Text>
        <Button title="Go to friends" onPress={() => navigation.navigate("Friends")} />
      </View>
    );
  }
  // states   

  export default IDK;