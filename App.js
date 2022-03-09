import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/homescreen';
import RegisterScreen from './screens/register';
import Main from './screens/main';
import EditScreen from './screens/editDetails';
import FriendPage from './screens/friendPage';



const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{  // i changed something here 
        headerShown: false
      }}>
        <Stack.Screen name="homescreen" component={HomeScreen}  />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="edit" component={EditScreen} />
        <Stack.Screen name="friendAccount" component={FriendPage} /> 
        <Stack.Screen name="main" component={Main} />
      </Stack.Navigator>
      </NavigationContainer> 
    
  );
    }








// aDDED THIS COMMENT

export default App;
