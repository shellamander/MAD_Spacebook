import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Image, TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChangeImage from './Published';

function UserProfile({ navigation }) {
  // eslint-disable-next-line camelcase
  const [first_name, setFname] = useState('');
  const [last_name, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data1, setData1] = useState({});

  useEffect(() => {
    getUser();
    setImagePFP();
  }, []);

  const getUser = async () => {
    const id = await AsyncStorage.getItem('@spacebook_id');
    const token = await AsyncStorage.getItem('@spacebook_token');
    const pfp = await AsyncStorage.getItem('@spacebook_pfp');
    console.log(pfp);
    console.log(id);

    fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 400) {
          throw 'Invalid email or password';
        } else {
          throw 'Something happened';
        }
      }).then(async (user) => {
        await setData(user);
        await setPhoto(pfp);
        await setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setImagePFP = async () => {
    const token = await AsyncStorage.getItem('@spacebook_token'); // call before i need it otherwise its undefined
    const id = await AsyncStorage.getItem('@spacebook_id');

    console.log('ASh', token);
    fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
      method: 'get',
      headers: {
        'Content-Type': 'image/png',
        'X-Authorization': token, // x-authorization
        //  "session_token":token1,
      },

    })
      .then((response) => response.blob())
      .then(async (image) => {
        const data11 = URL.createObjectURL(image);
        setData1(data11);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const update = async () => {
    const token = await AsyncStorage.getItem('@spacebook_token'); // call before i need it otherwise its undefined
    const id = await AsyncStorage.getItem('@spacebook_id');
    console.log('ASh', token);
    fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({
        first_name,
        last_name,

      }),
    })

      .then((response) => {
        if (response.status === 200) {
          setImagePFP();
        } else if (steve.status === 400) {
          throw 'Invalid email or password';
        } else {
          throw 'Something happened';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return (<View><Text>Loading</Text></View>);
  }
  return (
    <View style={styles.container}>

      <Image style={styles.profileImage} source={{ uri: data1 }} />

      <ChangeImage />

      <TextInput
        style={styles.fname}
        onChangeText={(first_name) => setFname(first_name)}
        value={first_name}
        placeholder="Input first name"
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.fname}
        onChangeText={(last_name) => setSname(last_name)}
        value={last_name}
        placeholder="Input last name"
        placeholderTextColor="#000"
      />

      <TextInput
        style={styles.fname}
        onChangeText={(email) => setEmail(email)}
        value={email}
        placeholder="Input email"
        placeholderTextColor="#000"
      />

      <TextInput
        style={styles.fname}
        onChangeText={(password) => setPassword(password)}
        value={password}
        placeholder="Input password"
        placeholderTextColor="#000"
      />

      <TouchableOpacity
        style={styles.button}
        title="Login"
        onPress={() => update()}
      >
        {' '}
        <Text> Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        title="Login"
        onPress={() => navigation.goBack()}
      >
        {' '}
        <Text> return</Text>
      </TouchableOpacity>

    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFFF',
    textAlign: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    marginLeft: 100,
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

export default UserProfile;
