import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Button, TextInput, StyleSheet, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Login({ navigation }) {
  const [first_name, setFname] = useState('');
  const [last_name, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');

  const login = async () => {
    if (first_name === '' || last_name == '' || email === '') {
      console.log(' no empty');
      setErrorMessage('* all fields must be filled');
    } else if (password !== password1) {
      console.log('validation check boo');
      setErrorMessage3('* passwords do not match');
    } else {
      fetch('http://localhost:3333/api/1.0.0/user', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } if (response.status === 400) {
            setErrorMessage1('* invalid email or password');
            throw 'Invalid email or password';
          } else {
            setErrorMessage1('*Server Error');
            throw 'Something happened';
          }
        }).then(async (res) => {
          const { id } = res;
          setErrorMessage2('All registered, click below to be redirected to the login page');

          await AsyncStorage.setItem('@user_id', id);
          console.log(id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.fname}
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
      <Text style={{ color: 'red', fontStyle: 'italic' }}>{errorMessage1}</Text>
      <Text style={{ color: 'red', fontStyle: 'italic' }}>{errorMessage3}</Text>
      <Text style={{ color: 'red', fontStyle: 'italic' }}>{errorMessage}</Text>

      <TouchableOpacity
        style={styles.button}
        title="Login"
        onPress={() => login()}
      >
        {' '}
        <Text> Register</Text>
      </TouchableOpacity>
      <Text style={{ fontStyle: 'italic' }}>{errorMessage2}</Text>

      <TouchableOpacity
        style={styles.button}
        title="Login"
        onPress={() => navigation.navigate('homescreen')}
      >
        {' '}
        <Text> Login</Text>
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#F0FFFF',
    textAlign: 'center',
  },

  text: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  button: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    alignItems: 'center',
    backgroundColor: '#61dafb',
    padding: 10,
    width: 150,
    flexDirection: 'row',
    marginLeft: 100,
    margin: 50,
    marginBottom: 10,
    textAlign: 'center',

    alignItems: 'center',

  },

  title: {
    marginTop: 100,
    color: '#61dafb',
    textAlign: 'center',
    fontSize: 50,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  title1: {
    marginTop: 10,
    color: '#61dafb',
    textAlign: 'center',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  fname: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    flexDirection: 'row',
    backgroundColor: '#61dafb',
    borderRadius: 5,
    width: '70%',
    height: 45,
    marginBottom: 10,
    textAlign: 'center',
    margin: 50,

    alignItems: 'center',
  },

});

export default Login; // input
