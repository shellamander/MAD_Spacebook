import * as React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import friendRequests from './friendRequests';
import getMyFriends from './getMyFriends';





const Tab = createMaterialTopTabNavigator();



function FriendScreen({navigation}) {
  return (
    <Tab.Navigator>
    <Tab.Screen name="friendRequests1" component={friendRequests} />
    <Tab.Screen name="getMyFriends" component={getMyFriends} />
    
     
  </Tab.Navigator>

  )
}
  





    // return (
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <Text>POSTS!</Text>
    //     <Button title="Go to friends" onPress={() => navigation.navigate("Drafts")} />
    //   </View>
    // );
 // }
  // states   
  

  export default FriendScreen;