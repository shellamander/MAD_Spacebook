
import React, { useState, useEffect } from 'react';
import { Text, Button, View,TextInput, Image } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Imagey from './images';

function IDK() {
  const [token1, setToken] = useState('');
  const [id1, setID ]= useState("");
  const [photo, setPhoto] = useState(null);
  const [isLoading, setLoading] = useState(true);
  console.log(token1)

  const test = async () => {
    const store = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    
    setToken(store);
    console.log("imdifferent");
    console.log(store);
  }

  const test1 = async () => {
   //call before i need it otherwise its undefined 
    const storeid= await AsyncStorage.getItem("@spacebook_id");
  
     setID(storeid);
    console.log("imdifferent");
    console.log(storeid);
  }

  useEffect(async () => {
    await test();
    console.log(token1, "Now do post baby")
    
  }, []); 
  
  useEffect(async () => {
    await test1();
    console.log(id1, "Now do post baby id")
    postbaby();
  }, []);

  const postbaby = () => {
    
    console.log("ASh", token1);
    fetch("http://localhost:3333/api/1.0.0/user/"+id1+"/photo", {
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
  //make one screen 