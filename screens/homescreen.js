import React, { useState } from 'react';
import { Text, TextInput, View, Button,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Login = ({navigation}) => {
    const [email, setEmail] = useState("shazhands@gmail.com");
    const [password, setPassword] = useState("shazhands");

    const login = async () => {
        // await AsyncStorage.setItem('@spacebook_token', "kbsdvkjbwvbj");
        // navigation.navigate("Home");
        fetch("http://localhost:3333/api/1.0.0/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then((steve) => {
            if(steve.status === 200){
                return steve.json();
            }else if(steve.status === 400){
              throw 'Invalid email or password';
            }else{
                throw "Something happened";
            }
        })
        .then(async(jeff) => {
            let id = jeff.id;
            let token = jeff.token;

            await AsyncStorage.setItem('@spacebook_token', token);
            await AsyncStorage.setItem('@spacebook_id', id);
           // navigation.navigate('Friends');
            navigation.navigate('main');
            console.log("im working");
            console.log(jeff.id);
            console.log(id);
            console.log(token);
            
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <View style={styles.container}>
             <Text style={styles.title}>Spacebook</Text> 
            <Text style={styles.title1}>Login</Text>

            <TextInput
            style={styles.fname}
                onChangeText={(email) => setEmail(email)}
                value={email}
            />
            <TextInput
            style={styles.fname}
                onChangeText={(pass) => setPassword(pass)}
                value={password}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} title="Login"
                onPress={() => login()}> <Text style={styles.text}>Login</Text></TouchableOpacity>
               
           
            <TouchableOpacity style={styles.button} title="Register"
                onPress={() => navigation.navigate("register")}> <Text> Make An Account</Text></TouchableOpacity>
               
            
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

export default Login;