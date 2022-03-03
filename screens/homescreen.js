import React, { useState } from 'react';
import { Text, TextInput, View, Button,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Alert } from 'react-native-gesture-handler';


const Login = ({navigation}) => {
    const [email, setEmail] = useState("shazhands@gmail.com");
    const [password, setPassword] = useState("shazhands");
    const goodbyeMessage = <Text> Goodbye, JSX! </Text>;
    const [errorMessage, setErrorMessage] = useState('');

    const login = async () => {
        // await AsyncStorage.setItem('@spacebook_token', "kbsdvkjbwvbj");
        // navigation.navigate("Home");
      
        if ( !email && password== null || undefined){
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
                setErrorMessage("Invalid email or password")
              throw 'Invalid email or password';
            }else{
                setErrorMessage("Servero error")
                throw "Server error";
                
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
    else{
        Alert.alert('Alert', 'Password must be minimum 8 characters');
        return;
    }
}

    return (
        <View style={[styles.container, {flexDirection:"column"}]}>
            <Text style={styles.title}>Spacebook</Text>
            <Text style={styles.title1}>Login</Text>
            {errorMessage ?<Text>{errorMessage}</Text>:null}
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
            <View>
            <TouchableOpacity  style={styles.title2} title="Login"
                onPress={() => login()}> <Text>Login</Text></TouchableOpacity>
               
           
            <TouchableOpacity  style={styles.fname} title="Register"
                onPress={() => navigation.navigate("register")}> <Text> Make An Account</Text></TouchableOpacity>
               
               </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0FFFF"
    },
    text: {
        fontFamily: "GillSans-SemiBold",
        color: "#000"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#F0FFFF',
        padding: 10,
        width:100,
      },
      button1: {
        alignItems: 'center',
        backgroundColor: '#FFF0F5',
        padding: 10,
        width:100,
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
      title1: {
        marginTop: 10,
        //paddingVertical: 8,
       //borderWidth: 4,
        //borderColor: "#20232a",
       // borderRadius: 6,
        //backgroundColor: "#61dafb",
        color: "#61dafb",
        textAlign: "center",
        fontSize: 30,
        fontStyle:'italic',
        fontWeight: 'bold'
      },
      title2: {
        marginTop: 10,
        borderRadius: 300,
        backgroundColor: "#61dafb",
        color: "#123456",
        textAlign: "center",
        fontSize: 30,
        fontStyle:'italic',
        fontWeight: 'bold'
      },
      fname: {
       
        marginTop: 45,
        flex:-5,
        padding: 1,
        
          // SHAZA LOOK
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
      button: {
       marginTop:45,
        marginLeft: 15,
        flex:-5,
        padding: 1,
        width:150,
          // SHAZA LOOK
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
}
)

export default Login;