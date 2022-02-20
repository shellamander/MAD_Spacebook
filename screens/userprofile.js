import React, { useState, useEffect } from 'react';
import { Text, Button, View,TextInput } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';




//IMPLEMENT THE PATCH FUNCTION HERE SHAZA

function IDK() {

  //const [token1, setToken] = useState('d57191920ee5a8064700b32f66ce3074');
  const [token1, setToken] = useState("");
  const [id1, setID ]= useState("");
  const [data, setData] = useState([]);
  const [first_name, setFname] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  const  delete1  = async()=>{
    await AsyncStorage.clear();
    console.log("USSSSSS");
}

  

  const test = async () => {
    const store = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    
    setToken(store);
    console.log("imdifferent");
    console.log(store);
  }

  const test1 = async () => {
   //call before i need it otherwise its undefined 
    const storeid= await AsyncStorage.getItem("@spacebook_id");
  
     await setID(storeid);
    console.log("imdifferent");
    console.log(storeid);
  }
 
  console.log(token1)
  console.log("please notice me");
  console.log(id1);

  // useEffect (async() => {
  //   await postbaby();
  //   setData(jeff)
  //   });

  useEffect(async () => {
    await test();
    console.log(token1, "Now do post baby")
    
  }, []); 
  
  useEffect(async () => {
    await test1();
    console.log(id1, "Now do post baby id")
    postbaby();  // if statement async storage 
  }, []);// testing

  console.log("ibegyounoticeme");
  console.log(id1);
  console.log(token1);

  //reference later for r 
  //"user_id": AsyncStorage.getItem(18);
  //var r = 18;
  const postbaby = () => {
    
    console.log("ASh", token1);
    fetch("http://localhost:3333/api/1.0.0/user/" + id1+ {
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
    fetch("http://localhost:3333/api/1.0.0/user/"+id1, {
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
/// CALL GET AGAIN AFTER PATCH SO IT CAN DISPLAY IT 

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
   
    return (<View><Text>Loading baby...</Text>
    <Button title ="Logout"  
                onPress={() => delete1()}> </Button>
    </View>)
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