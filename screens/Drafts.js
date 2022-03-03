import React, { useState, useEffect  } from 'react';
import { Text, TextInput, View, Button,StyleSheet, FlatList} from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDrawerStatusFromState } from '@react-navigation/drawer';





function IDK({navigation}) {
  const [texty, setText] = useState('');
  const [token1, setToken] = useState('');
  const [draft1, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const test= async () => { 
    console.log("GOT TO HERE NOW")
    const store =  await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    const draft =  await AsyncStorage.getItem("@spacebook_drafts");
    const draft_list = JSON.parse(draft);
    console.log("WHERE MY DRAFTS AT:", draft_list)
    setToken(store);
    setDraft(draft_list);
    setIsLoading(false);
  }


  useEffect(async () => {
    navigation.addListener("focus", async () => {
      await test();
    })
    await test();
    
    console.log("Should be set", token1);
    console.log("All my mad uncles", draft1)
    //here
  },[] );  // testing

//reference later for r 
  //"user_id": AsyncStorage.getItem(18);
//var r = 18;
// LOOP THROUGH FRIENDS AND SHOW USERS POSTS 
//CHECK IF USER LOGGED IN AND RENDER ANOTHER SCREEN INSTEAD FOR STYLE SHEET OR MAYBE
//SHOW THE SAME POST BUT DIFFERENT STYLE 
// FLAT LIST CHECK ID IF ID == USER == USER_LOGGED IN THEN POST.STYLES.LOGGEDIN ELSE STYLES==USER.OLOGGED OUT
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

if(isLoading){
  return(
    <Text>Loading...</Text>
  )
}else{
  return (
    <View>
          <Text style={styles.fname}>Drafts</Text>
          <TextInput
              onChangeText={(texty) => setText(texty)}
              value={texty}
          />
         
          <Button 
              title="POST"
              onPress={() => postbaby()}
              
          />
  
          <FlatList
            data={draft1}
            renderItem={({item}) => (
              <Text>{JSON.stringify(item)}</Text>
            )}
          />
      </View>
  
  )

}

}
  


;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#F0FFFF"
  },
  text: {
      fontFamily: "GillSans-SemiBold",
      color: "#000"
  },

  card: {
    fontFamily: "GillSans-SemiBold",
    backgroundColor: "#61dafb",
    padding: 10,
    margin:10,
    borderRadius:10,
},
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  button: {
      alignItems: 'center',
      backgroundColor: '#F0FFFF',
      padding: 10,
      width:100,
    },
    button1: {
      alignItems: 'center',
      backgroundColor: '#FFF0F5',
      padding: 10,
      width:100,
    },
    title: {
      marginTop: 50,
      //paddingVertical: 8,
     //borderWidth: 4,
      //borderColor: "#20232a",
     // borderRadius: 6,
      //backgroundColor: "#61dafb",
      color: "#61dafb",
      textAlign: "center",
      fontSize: 50,
      fontStyle:'italic',
      fontWeight: 'bold'
    },
    title1: {
      marginTop: 10,
      //paddingVertical: 8,
     //borderWidth: 4,
      //borderColor: "#20232a",
     // borderRadius: 6,
      //backgroundColor: "#61dafb",
      color: "#61dafb",
      textAlign: "center",
      fontSize: 30,
      fontStyle:'italic',
      fontWeight: 'bold'
    },
    fname: {
     
      marginTop: 45,
   
      padding: 1,
      width:300,
        // SHAZA LOOK
     // borderWidth: 4,
      //borderColor: "#20232a",
      borderRadius: 500,
      backgroundColor: "#61dafb",
      color: "#123456",
      textAlign: "center",
      fontSize: 20,
      fontStyle:'italic',
      fontWeight: 'bold',
      textTransform: "uppercase"
    },
}
)

  export default IDK;