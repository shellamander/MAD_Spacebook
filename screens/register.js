 
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
const Login = ({navigation}) => {
    const [first_name, setFname] = useState("");
    const [last_name, setSname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        // await AsyncStorage.setItem('@spacebook_token', "kbsdvkjbwvbj");
        // navigation.navigate("Home");
        fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'post',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "first_name":first_name,
                "last_name": last_name,
                "email": email,
                "password": password
            })
        })
        .then((steve) => {
            if(steve.status === 201){
                return steve.json();
            }else if(steve.status === 400){
              throw 'Invalid email or password';
            }else{
                throw "Something happened";
            }
        })
       
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <View>
            <Text>Login</Text>
            <TextInput
                onChangeText={(first_name) => setFname(first_name)}
                value={first_name}
            />
            <TextInput
                onChangeText={(last_name) => setSname(last_name)}
                value={last_name}
            />
            <TextInput
                onChangeText={(email) => setEmail(email)}
                value={email}
            />
            <TextInput
                onChangeText={(pass) => setPassword(pass)}
                value={password}
            />
            <Button
                title="register"
                onPress={() => login()}
            />
           
        </View>
    )

}
 
// const Login = ({navigation}) => { // you used an arrow function shaza

//  //const Reno=()= >{
//     const [first_name, setFname] = useState("");
//     const [last_name, setSname] = useState("");
//     const [email, setEmail] = useState(" ");
//     const [password, setPassword] = useState("");
    
//  //}

 
 
 
//     useEffect(() => {
//         console.log(email, password);
//     })
    
//         const login = async () => {
//             // await AsyncStorage.setItem('@spacebook_token', "kbsdvkjbwvbj");
//             // navigation.navigate("Home");
//             fetch("http://localhost:3333/api/1.0.0/user", {
//                 method: 'post',
//                 header: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
                    
//                     "first_name":first_name,
//                     "last_name" :last_name,
//                     "email": email,
//                     "password": password,
//                     // reno
//                 })
//             })
//             .then((steve) => {
//                 if(steve.status === 201){
//                     return steve.json();
//                 }else{
//                     throw "Something happened";
//                 }
//             })
//             .then((responseJson) => {
//                 console.log("User created with ID: ", responseJson);
//                 this.props.navigation.navigate("Login");
//          })
//          .catch((error) => {
//              console.log(error);
//          })
//      }





 
//     return (<View style={styles.container}>
//         <Text style={styles.title}>SpaceBook</Text>
//         <TextInput style={styles.fname}
//             placeholder="First Name"
//             placeholderTextColor="#123456"
//             autoCapitalize="none"
//             //value={email}
//             onChangeText={(fn) => setFname(fn)}
//             value={first_name}
//             // value={Reno.first_name}
//         />
//         <TextInput style={styles.fname}
//             placeholder="Surname"
//             placeholderTextColor="#123456"
//             autoCapitalize="none"
//             //value={email}
//             onChangeText={(sn) => setSname(sn)}
//             value={last_name}
//         />
 
//         <TextInput style={styles.fname}
//             //underlineColorAndroid = "transparent"
//             placeholder="Email"
//             placeholderTextColor="#123456"
//             autoCapitalize="none"
            
//   onChangeText={(email) => setEmail(email)}
//   value={email}
            
 
//         />
 
 
//         <TextInput style={styles.fname}
//             //underlineColorAndroid = "transparent"
//             placeholder="Password"
//             placeholderTextColor="#123456"
//             autoCapitalize="none"
//             //value={email}
            
//   onChangeText={(pass) => setPassword(pass)}
//   value={password}
 
//         />
 
 
 
 
//         {/* <Button title="Signup"  
//       color="#61dafb" onPress={signup} /> */}
 
 
//         <View style={styles.container}>
//             {/*onPress={onPress}*/}
 
//             <TouchableOpacity onPress={()=>login()} >
//                 <Text style={styles.fname}>Register</Text>
//             </TouchableOpacity>
//         </View>
 
 
 
 
 
 
 
 
 
//     </View>);
 
//     /*change button to touchable opacity to styule*/
// }
 
 
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24,
//         backgroundColor: "#123456"
 
//     },
//     title: {
//         marginTop: 100,
//         //paddingVertical: 8,
//         //borderWidth: 4,
//         //borderColor: "#20232a",
//         // borderRadius: 6,
//         //backgroundColor: "#61dafb",
//         color: "#61dafb",
//         textAlign: "center",
//         fontSize: 50,
//         fontStyle: 'italic',
//         fontWeight: 'bold'
//     },
 
//     fname: {
 
//         marginTop: 45,
 
//         padding: 1,
//         width: 300,  // SHAZA LOOK
//         // borderWidth: 4,
//         //borderColor: "#20232a",
//         borderRadius: 500,
//         backgroundColor: "#61dafb",
//         color: "#123456",
//         textAlign: "center",
//         fontSize: 20,
//         fontStyle: 'italic',
//         fontWeight: 'bold',
//         textTransform: "uppercase"
//     },
 
 
 
 
// })
// //}
 
 
 
 
 
export default Login;  //input
 
