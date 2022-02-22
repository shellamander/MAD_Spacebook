import React, { useState, useEffect } from 'react';
import { Text, Button, View, } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


const UserPosts = () => {
  let [data, setData] = useState({});
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      getPost();
  }, [])


  const getPost= async ()=> {

    let token = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    let id= await AsyncStorage.getItem("@spacebook_id")

    console.log("ASh", token);
    fetch("http://localhost:3333/api/1.0.0/user/"+id+"/post", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token, //x-authorization
        //  "session_token":token1,
      },

    })
      .then((response) => {
        if (response.status === 200) {
          console.log("IM HOME HONEY")
          return response.json();
        } else if (response.status === 400) {
          throw 'Invalid email or password';
        } else {
          throw "Something happened";
        }
      }).then(async (post) => {
        console.log("IM WORKINGGG")
        let post_id = post;
        setData(post);

            await setIsLoading(false);
            console.log(isLoading, data)

      })
      .catch((err) => {
        console.log(err);
      })
  }
  

  if(isLoading){
    return (<View><Text>Loading</Text></View>)
  }else{
  // const rawr = data.map((post)=>{   
  //   (post.post_id);  
    return (
        <View>
            <Text>{data.author}</Text>
            <Text>Drafts</Text>
            {data.map(post => (<TouchableOpacity onPress={() => console.log(post.post_id)}>{post.text}</TouchableOpacity> )) }
            <Button
              title="POST"
              onPress={() => getPost()}  // do it again shaza
            />
        </View>
    );
  }
}



//   {/* {data.map(post => (<TouchableOpacity onPress={() => console.log(post.post_id)}>{post.text}</TouchableOpacity> )) }  */}
          
//     )
//   }
// }

export default UserPosts;