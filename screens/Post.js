import * as React from 'react';

//import { createDrawerNavigator } from '@react-navigation/drawer';
//import { Text, View, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PublishedScreen from './Published';
import Drafts from './Drafts';





const Tab = createMaterialTopTabNavigator();
// const Drawer = createDrawerNavigator();


// function IDK({navigation}) {
//   return (
    
//     <Drawer.Navigator>
//     <Drawer.Screen name="Drafts" component={Drafts} />
//     <Drawer.Screen name="Published" component={PublishedScreen} />
//     <Drawer.Screen name="Scheduled" component={ScheduledScreen} />
     
//   </Drawer.Navigator>


//   )
//   }
  




function PostScreen({navigation}) {
  return (
    <Tab.Navigator>
        
    <Tab.Screen name="Drafts" component={Drafts} />
   
     
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
  

  export default PostScreen;