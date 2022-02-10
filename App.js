//import 'react-native-gesture-handler';
//import * as React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/homescreen';
import RegisterScreen from './screens/register';
import Apphomescreen from './screens/apphomescreen';
import AccountScreen from './screens/Account';
import FriendScreen from './screens/Friends';
import PostScreen from './screens/Post'



//SET ITEM AND GET ITEM INA SYNSTORAGE TOKEN BOYS// stringify/ flat list// stringify then json parse
// conditional loading and rendering set to true but set to false for compnet did mount
//scrollview pagination for search through friends
//stylesheets// customise view  ask brandon maybe?// use an ui library / bootstrap ? -- higher marks
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// DRAW NAV  IS TOP LEVEL,,, MAD SEXY ,,, USE?

/*const nah =()=> {
  return(
    <Apphomescreen /> 
  )
  }
  */


/*const MyTabs =()=>{
return(
  <Tab.Navigator>
    <Tab.Screen name="idk" component={IDK}/>
    <Tab.Screen name="maybe" component={Maybe}/>

  </Tab.Navigator>
)


}
*/




//export default MyTabs;

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';





/*function PostScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Posts!</Text>
    </View>
  );
}
*/
const Tab = createMaterialTopTabNavigator();
const Tab1 = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function Ryan () {
  return (
    
      <Stack.Navigator screenOptions={{  // i changed something here shaza
        headerShown: false
      }}>
        <Stack.Screen name="homescreen" component={HomeScreen} />
        <Stack.Screen name="ryan1" component={Ryan} 
                    navigationOptions={{ gesturesEnabled: false }} />
        <Stack.Screen name="register" component={RegisterScreen} />
      </Stack.Navigator>
      
    
  );
}



function Goliath () {
  return (
    
    <Tab1.Navigator>
        
    <Tab1.Screen name="Drafts" component={Drafts} />
    <Tab1.Screen name="Published" component={PublishedScreen} />
    <Tab1.Screen name="Scheduled" component={ScheduledScreen} />
     
  </Tab1.Navigator>
    
  );
}

//in appp i call the stack navigator within tab screen 
const App=() =>{
  return (
    <NavigationContainer>
      <Tab.Navigator>
        
        <Tab.Screen name="Friends" component={FriendScreen} />
        <Tab.Screen name="Posts" component={PostScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="ryan" component={Ryan} options={{ headerShown: false }}
                    navigationOptions={{ gesturesEnabled: false }} />  
      </Tab.Navigator>
      </NavigationContainer>
      
    
  );
}

// aDDED THIS COMMENT

export default App;