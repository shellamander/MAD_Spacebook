import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();

import Maybe1 from './Friends';
import PostScreen from './Post';
import IDK from './Account';
import UserProfile from './userprofile';

export default function Main()
{
    const [state, setState ]= useState("");

    const test = async () => {
        const tokenval= await AsyncStorage.getItem('@spacebook_token');   // will help define login state  so it doesnt run anything yet woohoo
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
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Friends" component={Maybe1} />
            <Tab.Screen name="Posts" component={PostScreen} />
            <Tab.Screen name="Account" component={IDK} />
            <Tab.Screen name="Profile" component={UserProfile} />
        </Tab.Navigator>
    )
}
// function Inside() {
//         return (
//           <NavigationContainer>
//             <Tab.Navigator screenOptions={{  // i changed something here 
//               headerShown: false
//             }}>
//  {state==null?(

//              <Tab.Screen name="Friends" component={FriendScreen} /><Tab.Screen name="Posts" component={PostScreen} /><Tab.Screen name="Account" component={AccountScreen} /><Tab.Screen name="Profile" component={UserProfile} />
//  ): (    <><Tab.Screen name="homescreen"  /> 
//  </> )
// }

//             </Tab.Navigator>
//             </NavigationContainer>
          
//         );
//           }

//           export default Inside;

    //       <NavigationContainer>

    //   <Stack.Navigator>
    //     {state==null?(     // if no token exists dont show the navigator ???
    //       <Stack.Screen name="ryan" component={Ryan}  /> 
          

    //     ) : (
    //       <><Stack.Screen name="hey" component={Inside} options={{ headerShown: false }}
    //       navigationOptions={{ gesturesEnabled: false }} /> 
    //       </>
    //     )  } 
       
        
    //   </Stack.Navigator>
    //   </NavigationContainer>
      