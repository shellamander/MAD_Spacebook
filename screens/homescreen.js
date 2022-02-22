import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        <View>
            <Text>Login</Text>
            <TextInput
                onChangeText={(email) => setEmail(email)}
                value={email}
            />
            <TextInput
                onChangeText={(pass) => setPassword(pass)}
                value={password}
            />
            <Button
                title="Login"
                onPress={() => login()}
            />
            <Button 
                title="Register"
                onPress={() => navigation.navigate("register")}
            />
        </View>
    )

}

export default Login;