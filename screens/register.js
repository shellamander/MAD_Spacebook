 
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
const Login = ({navigation}) => {
    const [first_name, setFname] = useState("");
    const [last_name, setSname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage1, setErrorMessage1] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [errorMessage3, setErrorMessage3] = useState('')




// have a check password field here maybe?





    const login = async () => {
        // await AsyncStorage.setItem('@spacebook_token', "kbsdvkjbwvbj");
        // navigation.navigate("Home");
        //apply some cheeky regex?

if (first_name === "" || last_name == "" || email === "") {

   console.log(" no empty")
   setErrorMessage('* all fields must be filled')

   
}  //necessary for email  // 

// if(!last_name.trim()) {
//     return Alert("last name is emptyyy")
// };
// else if(email !== password1){
//     console.log("validation check boo")
//     setErrorMessage3('* passwords do not match')

// }
else if(password !== password1){
    console.log("validation check boo")
    setErrorMessage3('* passwords do not match')

}


else{

        
        fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
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
                setErrorMessage1('* invalid email or password')
              throw 'Invalid email or password';
            }else{
                setErrorMessage1('*Server Error')
                throw "Something happened";
            }
        }) .then(async(jeff) => {
            let id = jeff.id;
            setErrorMessage2('All registered, click below to be redirected to the login page')
            
            await AsyncStorage.setItem('@user_id', id);
            console.log(id)
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
     

    return (
        <View style={styles.container}>
           
            <Text style={styles.title}>Register</Text>
            <TextInput style={styles.fname}
                onChangeText={(first_name) => setFname(first_name)}
                value={first_name}
                placeholder="Input first name"
            />
            <TextInput
            style={styles.fname}
                onChangeText={(last_name) => setSname(last_name)}
                value={last_name}
                placeholder="Input surname"
            />
            <TextInput
            style={styles.fname}
                onChangeText={(email) => setEmail(email)}
                value={email}
              
                placeholder="Input email"
            />
            <TextInput
            style={styles.fname}
                onChangeText={(pass) => setPassword(pass)}
                value={password}
                placeholder="Input password"
                secureTextEntry
            
            />

<TextInput
            style={styles.fname}
                onChangeText={(pass1) => setPassword1(pass1)}
                value={password1}
                placeholder="Confirm password"
                secureTextEntry
            
            />
            <Text style={{color:"red", fontStyle:"italic"}}>{errorMessage1}</Text>
            <Text style={{color:"red", fontStyle:"italic"}}>{errorMessage3}</Text>
             <Text style={{color:"red", fontStyle:"italic"}}>{errorMessage}</Text>
          
               <TouchableOpacity style={styles.button} title="Login"
                onPress={() => login()}> <Text> Register</Text></TouchableOpacity>
               <Text style={{ fontStyle:"italic"}}>{errorMessage2}</Text>

            <TouchableOpacity style={styles.button} title="Login"
                onPress={() => navigation.navigate("homescreen")}> <Text> Login</Text></TouchableOpacity>
               
           
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: "#F0FFFF",
        textAlign: "center",
    },
    
text:{
    fontStyle:'italic',
    fontWeight: 'bold',
},
    button: {
        fontStyle:'italic',
        fontWeight: 'bold',
        alignItems: 'center',
        backgroundColor: "#61dafb",
        padding: 10,
        width:150,
        flexDirection: 'row',
        marginLeft:100,
        margin:50,
        marginBottom: 10,
        textAlign: "center",
        
    alignItems: "center",
        
      },
    
      title: { 
        marginTop: 100,
        color: "#61dafb",
        textAlign: "center",
        fontSize: 50,
        fontStyle:'italic',
        fontWeight: 'bold'
      },
      title1: {
        marginTop: 10,
        color: "#61dafb",
        textAlign: "center",
        fontSize: 30,
        fontStyle:'italic',
        fontWeight: 'bold'
      },
      fname: {
        fontStyle:'italic',
        fontWeight: 'bold',
        flexDirection: 'row',
        backgroundColor: "#61dafb",
    borderRadius: 5,
    width: "70%",
    height: 45,
    marginBottom: 10,
    textAlign: "center",
    margin:50,
 
    alignItems: "center",
      },
     
}
)
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
 
