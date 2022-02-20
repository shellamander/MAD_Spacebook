import React, { useState, useEffect } from 'react';
import { Text, Button, View, } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';






function IDK() {

  const [token1, setToken] = useState('');
  const [id1, setID ]= useState("");
  const [data, setData] = useState([]);

  console.log(token1);
  console.log(id1);
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
   // testing

  //reference later for r 
  //"user_id": AsyncStorage.getItem(18);
  //var r = 18;
  const postbaby = () => {
    console.log("ASh", token1);
    fetch("http://localhost:3333/api/1.0.0/user/"+id1+"/post", {
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
  const rawr = data.map((post)=>{   
     (post.post_id);   
});   

  return (  /// flatlist 

     console.log("ijust wanna check "),
     
    <View>
      <Text>Drafts</Text>

      <Button
        title="POST"
        onPress={() => postbaby()}

      />

      
    
        {data.map(post => (<TouchableOpacity onPress={() => console.log(post.post_id)}>{post.text}</TouchableOpacity> )) } 
        
        
    
      

    </View>

  )
}

//d57191920ee5a8064700b32f66ce3074
//HOW TO ITERATE SINGULALRY E.G THE KEY ERROR I KEEP GETTING

;





export default IDK;