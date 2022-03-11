import React, { useState } from 'react';
import {
  Text, Switch, TextInput, View, Button, StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  global.mode = true;
  const [isEnabled, setIsEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const login = async () => {
    // await AsyncStorage.setItem('@spacebook_token', "kbsdvkjbwvbj");
    // navigation.navigate("Home");
    if (email === '' || password === '') {
      console.log(' no empty');
      setErrorMessage('* all fields must be filled');
    } else {
      fetch('http://localhost:3333/api/1.0.0/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } if (response.status === 400) {
            setErrorMessage1('* invalid email or password');
            throw 'Invalid email or password';
          } else {
            setErrorMessage1('*Server Error');
            throw 'Something happened';
          }
        })
        .then(async (res) => {
          const { id } = res;
          const { token } = res;

          await AsyncStorage.setItem('@spacebook_token', token);
          await AsyncStorage.setItem('@spacebook_id', id);

          navigation.navigate('main');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (global.mode) {
    return (

      <View style={styles.container1}>
        <Text style={styles.title}>Spacebook</Text>
        <Text style={styles.title1}>Login</Text>

        <TextInput
          style={styles.fname}
          onChangeText={(email) => setEmail(email)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.fname}
          onChangeText={(pass) => setPassword(pass)}
          value={password}
          secureTextEntry
          placeholder="Password"
        />
        <View style={{ alignItems: 'center' }}>
          <Text>Dark Mode</Text>
          <Switch value={isEnabled} onValueChange={toggleSwitch} />
        </View>
        <Text style={{ color: 'red', fontStyle: 'italic' }}>{errorMessage}</Text>
        <Text style={{ color: 'red', fontStyle: 'italic' }}>{errorMessage1}</Text>

        <TouchableOpacity
          style={styles.button}
          title="Login"
          onPress={() => login()}
        >
          {' '}
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          title="Register"
          onPress={() => navigation.navigate('register')}
        >
          {' '}
          <Text> Make An Account</Text>
        </TouchableOpacity>

      </View>
    );
  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Spacebook</Text>
      <Text style={styles.title1}>Login</Text>

      <TextInput
        style={styles.fname}
        onChangeText={(email) => setEmail(email)}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.fname}
        onChangeText={(pass) => setPassword(pass)}
        value={password}
        secureTextEntry
        placeholder="Password"
      />
      <View style={{ alignItems: 'center' }}>
        <Text>Dark Mode</Text>
        <Switch value={isEnabled} onValueChange={toggleSwitch} />
      </View>
      <Text style={{ color: 'red', fontStyle: 'italic' }}>{errorMessage}</Text>
      <Text style={{ color: 'red', fontStyle: 'italic' }}>{errorMessage1}</Text>

      <TouchableOpacity
        style={styles.button}
        title="Login"
        onPress={() => login()}
      >
        {' '}
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        title="Register"
        onPress={() => navigation.navigate('register')}
      >
        {' '}
        <Text> Make An Account</Text>
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
  container1: {
    flex: 1,
    backgroundColor: '#123456',
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

export default Login;
