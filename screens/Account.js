import React, { useState, useEffect } from 'react';
import { Text, Button, View, } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';






function IDK() {

  const [token1, setToken] = useState('');
  const [data, setData] = useState([]);

  console.log(token1)

  const test = async () => {
    const store = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    setToken(store);
  }

  // useEffect (async() => {
  //   await postbaby();
  //   setData(jeff)
  //   });

  useEffect(async () => {
    await test();
    //here
  }, []);  // testing

  //reference later for r 
  //"user_id": AsyncStorage.getItem(18);
  //var r = 18;
  const postbaby = () => {
    console.log("ASh", token1);
    fetch("http://localhost:3333/api/1.0.0/user/18/post", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token1, //x-authorization
        //  "session_token":token1,
      },

    })
      .then((steve) => {
        if (steve.status === 200) {
          console.log("IM HOME HONEY")
          return steve.json();
        } else if (steve.status === 400) {
          throw 'Invalid email or password';
        } else {
          throw "Something happened";
        }
      }).then(async (jeff) => {
        console.log("IM WORKINGGG")
        let post_id = jeff;
        setData(jeff);

        await AsyncStorage.setItem('@post_id', post_id);
        console.log("IHDUFIGSIUGB")
        console.log(jeff.text)
        console.log(post_id)

      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (  /// flatlist 

    //
    <View>
      <Text>Drafts</Text>

      <Button
        title="POST"
        onPress={() => postbaby()}

      />

      {data.map(post => <Text>{post.text}</Text>)}
      

    </View>

  )
}

//d57191920ee5a8064700b32f66ce3074

;





export default IDK;