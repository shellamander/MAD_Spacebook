import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet } from 'react-native'
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
 //ASK ASH WHY DOING AN ARROW FUNCTION TO MY BUTTON MADE IT HAPPY
 
const Homescreen = () => { // you used an arrow function shaza
  
 
  return ( <View style={styles.container}>
      <Text style={styles.title}>SpaceBook Login</Text>
     
     
     
      <TextInput style = {styles.fname}
               //underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#123456"
               autoCapitalize = "none"
               //value={email}
               //onChange={e=> setEmail(e.target.value) }
               
               />
 
 
      <TextInput style = {styles.fname}
               //underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#123456"
               autoCapitalize = "none"
               //value={email}
               //onChange={e=> setPassword(e.target.value) }
               
               />
 

  </View>
    );  

}
 
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#123456"
     
    },
    title: {
      marginTop: 100,
      //paddingVertical: 8,
     //borderWidth: 4,
      //borderColor: "#20232a",
     // borderRadius: 6,
      //backgroundColor: "#61dafb",
      color: "#61dafb",
      textAlign: "center",
      fontSize: 50,
      fontStyle:'italic',
      fontWeight: 'bold'
    },
 
    fname: {
     
      marginTop: 45,
   
      padding: 1,
      width:300,  // SHAZA LOOK
     // borderWidth: 4,
      //borderColor: "#20232a",
      borderRadius: 500,
      backgroundColor: "#61dafb",
      color: "#123456",
      textAlign: "center",
      fontSize: 20,
      fontStyle:'italic',
      fontWeight: 'bold',
      textTransform: "uppercase"
    },
 
   
 
 
  })
//}
 
 
 
 
 
  export default Homescreen;  //input
