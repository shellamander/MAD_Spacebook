
import React, { useState, useEffect } from 'react';
import { Text, Button, View,TextInput, Image } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Imagey from './images';

function IDK() {
  const [token1, setToken] = useState('d57191920ee5a8064700b32f66ce3074');
  const [photo, setPhoto] = useState(null);
  const [isLoading, setLoading] = useState(true);
  console.log(token1)

  const test = async () => {
    const store = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    await setToken(store);
  }

  // useEffect (async() => {
  //   await postbaby();
  //   setData(jeff)
  //   });

  useEffect(async () => {
    await test();
    console.log(token1, "Now do post baby")
    postbaby();
  }, []); 

  const postbaby = () => {
    
    console.log("ASh", token1);
    fetch("http://localhost:3333/api/1.0.0/user/18/photo", {
      method: 'get',
      headers: {
        'Content-Type': 'image/png',
        'X-Authorization': token1, //x-authorization
        //  "session_token":token1,
      },

    })
      .then((steve) => {
       return steve.blob();
      })
      .then(async (jeff) => {
        let data = URL.createObjectURL(jeff);
        setPhoto(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  if(isLoading){
    return (<View><Text>Loading...</Text></View>)
  }else{
    return (
      <View>
        <Imagey/>
        <Text>Here</Text>
        <Image style={{width: 100, height: 100}} source={{uri:photo}} /> 
      </View>
    );
  }
}

  export default IDK;