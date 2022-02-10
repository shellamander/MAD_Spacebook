import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet } from 'react-native'
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
 //ASK ASH WHY DOING AN ARROW FUNCTION TO MY BUTTON MADE IT HAPPY
 
const Homescreen1 = ({navigation}) => { // you used an arrow function shaza
  const [email, setEmail] = useState(" ");
  const [password, setPassword]= useState("");
 //const[userToken, setUserToken] = React.useState(null);
 //const[isLoading, setIsLoading] = React.useState(true);

 /*useEffect(()=> {
   setTimeout(() => {
     setIsLoading(false)
   }, 1000);
 }, []);
 */
 
 
  const signup = () => {
     //get stuff out of state
     const data = {  // look into lets
       
       "email": email,
       "password": password
     }
     console.log(data);
     //send to server
  } 
 
 
 
 
 
  useEffect(() => {
    console.log(email, password);
  })
 
  return ( <View style={styles.container}>
      <Text style={styles.title}>SpaceBook Login</Text>
     
     
     
      <TextInput style = {styles.fname}
               //underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#123456"
               autoCapitalize = "none"
               value={email}
               onChange={e=> setEmail(e.target.value) }
               
               />
 
 
      <TextInput style = {styles.fname}
               //underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#123456"
               autoCapitalize = "none"
               value={password}
               onChange={e=> setPassword(e.target.value) }
               
               />
 
      <View> </View>
     
       
      {/* <Button title="Signup"  
      color="#61dafb" onPress={signup} /> */}
 
 
    <View style={styles.container}>
   
  <TouchableOpacity onPress={signup} >
  <Text style={styles.fname}>Login</Text>
  </TouchableOpacity>
  </View>
 
  <View style={styles.container}>
   
  <TouchableOpacity onPress={()=>navigation.navigate('register')} >
  <Text style={styles.fname}>Register</Text>
  </TouchableOpacity>
  </View>
 
 
    </View>);
   
 /*change button to touchable opacity to styule*/  
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
 
 
 
 
 
  export default Homescreen1;  //input
