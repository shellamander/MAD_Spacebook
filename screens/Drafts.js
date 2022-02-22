import React, { useState, useEffect  } from 'react';
import { Text, TextInput, View, Button} from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDrawerStatusFromState } from '@react-navigation/drawer';












function IDK() {
  const [texty, setText] = useState('');
  const [token1, setToken] = useState('');
  console.log(token1)

  const test= async () => { 
    const store =  await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    setToken(store);
  }


  console.log(texty)
  useEffect(async () => {
    await test();
    console.log("Should be set", token1);
    //here
  },[] );  // testing

//reference later for r 
  //"user_id": AsyncStorage.getItem(18);
//var r = 18;
  const postbaby = () => {
    console.log("ASh", token1);
    fetch("http://localhost:3333/api/1.0.0/user/18/post", { // change id 
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token1, //x-authorization
          //  "session_token":token1,
      },
      body: JSON.stringify({
        
        
        "text": texty,
        
        
        //hardcoded this for now //id 
      })
  })
  .then((steve) => {
      if(steve.status === 201){
        console.log("IM HOME HONEY")
          return steve.json();
      }else if(steve.status === 400){
        throw 'Invalid email or password';
      }else{
          throw "Something happened";
      }
  }) .then(async(jeff) => {
    //console.log("IM WORKINGGG")
      let post_id = jeff.id;
      
      
      await AsyncStorage.setItem('@post_id', post_id);
      console.log(post_id)
      
  })
  .catch((err) => {
      console.log(err);
  })
}


return (  /// flatlist 

  
  //
  <View >
        <Text>Drafts</Text>
        <TextInput
            onChangeText={(texty) => setText(texty)}
            value={texty}
        />
       
        <Button 
            title="POST"
            onPress={() => postbaby()}
            
        />
        
    </View>

)}
  


//d57191920ee5a8064700b32f66ce3074

;



  export default IDK;