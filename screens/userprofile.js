import React, { useState, useEffect } from 'react';
import { Text, Button, View,TextInput } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';




//IMPLEMENT THE PATCH FUNCTION HERE SHAZA

function IDK() {

  const [token1, setToken] = useState('d57191920ee5a8064700b32f66ce3074');
  const [data, setData] = useState([]);
  const [first_name, setFname] = useState("");
  const [isLoading, setIsLoading] = useState(true);
//   const [last_name, setSname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
 
 
  //var test123="";
  


//   const [first_name, setFname] = useState("");
//   const [last_name, setSname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const tryme= ()=>{
//       postbaby();
//   }


//   useEffect(() => {
//     console.log("I have been mounted")
//     postbaby();
//   }, [])

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
  }, []);  // testing

  //reference later for r 
  //"user_id": AsyncStorage.getItem(18);
  //var r = 18;
  const postbaby = () => {
    
    console.log("ASh", token1);
    fetch("http://localhost:3333/api/1.0.0/user/18", {
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
        console.log(jeff)
        let post_id = jeff;
       //test123= jeff.first_name ;
       //console.log(test123);
        

        await AsyncStorage.setItem('@post_id', post_id);
        setData(post_id);
        setIsLoading(false);
        //setData1(post_id.first_name);
        console.log("IHDUFIGSIUGB");
        console.log(data1);
        console.log(jeff);
        console.log(post_id.first_name);

      })
      .catch((err) => {
        console.log(err);
      })
  }


  const update = () => {
    
    console.log("ASh", token1);
    fetch("http://localhost:3333/api/1.0.0/user/18", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token1,
    },
    body: JSON.stringify({
        "first_name":first_name,
        // "last_name": last_name,
        // "email": email,
        // "password": password
    })
})

// PATCH DOESNT RRETURN ANYTHING, YOU NEED TO ACC UPDATED IT BY CALLING GET AGAIN SO YOU CAN PHYSICALLY SEE THE CHNAGE
//GET RID OF THIS SHAZA (BELOWW)
      .then((steve) => {
        if (steve.status === 200) {
            //request or call function to  do another request
          console.log("IM HOME HONEY")
          return steve.json();
        } else if (steve.status === 400) {
          throw 'Invalid email or password';
        } else {
          throw "Something happened";
        }
      }).then(async (jeffy) => {
        console.log("IM WORKINGGG")
        console.log(jeffy)
        let post_id = jeffy;
       //test123= jeff.first_name ;
       //console.log(test123);
        

        await AsyncStorage.setItem('@post_id', post_id);
        setData(post_id);
        //setData1(post_id.first_name);
        console.log("IHDUFIGSIUGB");
       // console.log(data1);
        console.log(jeffy);
        console.log(post_id.first_name);

      })
      .catch((err) => {
        console.log(err);
      })
  }

 //
//<Text>{test123}</Text>// IM OVER HEREEEEEEEEEE
if(isLoading){
    return (<View><Text>Loading baby...</Text></View>)
}else{
    return (  /// flatlist 
        //
    
        //
        <View>
          <Text>Drafts</Text>
    
           {/* <Button
            title="POST"
            onPress={() => postbaby()}
    
          />  */}
    
    
    
    <TextInput onChangeText={(first_name) => setFname(first_name)}
                    value={first_name} placeholder={data.first_name} placeholderTextColor="#000" />
    <Text>{data.last_name}</Text>
    <Text>{data.email}</Text>
    <Text>{data.user_id}</Text>
    <Button title="Update" onPress={() => update()}
    />
          
    
        </View>
    
      )
    }

}

  
//{data.map(post => <Text>{post.first_name}</Text>)} 

//d57191920ee5a8064700b32f66ce3074

;





export default IDK;