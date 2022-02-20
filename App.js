import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import HomeScreen from './screens/homescreen';
import RegisterScreen from './screens/register';
import Apphomescreen from './screens/apphomescreen';
import AccountScreen from './screens/Account';
import FriendScreen from './screens/Friends';
import PostScreen from './screens/Post';
import UserProfile from './screens/userprofile';





import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();
const Tab1 = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function Ryan () {
  return (
    
      <Stack.Navigator screenOptions={{  // i changed something here 
        headerShown: false
      }}>
        <Stack.Screen name="homescreen" component={HomeScreen}  />
        
        <Stack.Screen name="register" component={RegisterScreen} />
      </Stack.Navigator>
      
    
  );
    }






 

function App()
{
  const [state, setState ]= useState("");


  const test = async () => {
    
    const tokenval= await AsyncStorage.getItem('@spacebook_token');
    if (tokenval=== undefined || tokenval=== null){ 
      console.log("error PLS") 
     setState(null);

    }

    if (tokenval!== undefined && tokenval!== null){ 
      console.log("Hi i should be wokring") 
     setState(tokenval);

    }

  
    
  }

  useEffect(() => {
    
   test();
    
  }, []); 


  
  return (
    <NavigationContainer>

      <Tab.Navigator>
        {state==null?(     // if no token exists dont show the navigator ???
          <Tab.Screen name="ryan" component={Ryan} options={{ headerShown: false }}
          navigationOptions={{ gesturesEnabled: false }} /> 

        ) : (
          <><Tab.Screen name="Friends" component={FriendScreen} /><Tab.Screen name="Posts" component={PostScreen} /><Tab.Screen name="Account" component={AccountScreen} /><Tab.Screen name="Profile" component={UserProfile} /></>
        ) }
       
        
      </Tab.Navigator>
      </NavigationContainer>
      
    
  );
}



// aDDED THIS COMMENT

export default App;