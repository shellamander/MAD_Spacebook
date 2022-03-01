
import React, { useState, useEffect } from 'react';
import { Text, Button, View,TextInput, Image } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Imagey from './images';

function imageProfile() {
  let [data, setData] = useState({});
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setImagePFP();
  }, [])

  const setImagePFP = async () => {
    let token = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    let id= await AsyncStorage.getItem("@spacebook_id")

    
    console.log("ASh", token);
    fetch("http://localhost:3333/api/1.0.0/user/"+id+"/photo", {
      method: 'get',
      headers: {
        'Content-Type': 'image/png',
        'X-Authorization': token, //x-authorization
        //  "session_token":token1,
      },

    })
      .then((response) => {
       return response.blob();
      })
      .then(async (image) => {
        let data1 = URL.createObjectURL(image);
        setData(data1);
        setIsLoading(false);
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
        <Image style={{width: 100, height: 100}} source={{uri:data}} /> 
      </View>
    );
  }
}

  export default imageProfile;
  //make one screen 