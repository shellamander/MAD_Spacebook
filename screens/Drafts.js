import React, { useState, useEffect  } from 'react';
import { Text, TextInput, View, Button,StyleSheet, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDrawerStatusFromState } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-Icons';


function IDK({navigation}) {
  const [texty, setText] = useState('');
  const [token1, setToken] = useState('');
  const [draft1, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [idPost, setID] = useState('');


  const test= async () => { 

    const store =  await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    const draft =  await AsyncStorage.getItem("@spacebook_drafts");
     await AsyncStorage.setItem("@spacebook_postEdit",idPost);
    const draft_list = JSON.parse(draft);


    //
    setToken(store);
    setDraft(draft_list);
    setIsLoading(false);
  }


  useEffect(async () => {
    navigation.addListener("focus", async () => {
      await test();
    })
    await test();
    
   
    //here
  },[] );  // testing



const updatePost = (author, post_id) => {
    
      console.log("ASh", token1);
      fetch("http://localhost:3333/api/1.0.0/user/"+author+"/post"+post_id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token1,
      },
      body: JSON.stringify({
          "text":text,
       
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("ive updated  ");
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 403) {
          throw 'only update your own posts';
        } else {
          throw "Something happened";
        }
      })
      .catch((err) => {
        console.log(err);
      })
  })
}
 
const deletePost = async (id, post) => {
  let token = await AsyncStorage.getItem("@spacebook_token");

  fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post/" + post, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    }
  })

    .then((response) => {
      if (response.status === 200) {
        console.log("ive deleted this post  ");
      } else if (response.status === 401) {
        throw 'Unauthorised';
      } else if (response.status === 403) {
        throw 'you havent even liked it';
      } else {
        throw "Something happened";
      }
    })
    .catch((err) => {
      console.log(err);
    })
}
const move= async()=>{

  await AsyncStorage.setItem("@spacebook_postEdit",idPost);
  navigation.navigate("editPosts")
}
const postbaby = async() => {

    let id = await AsyncStorage.getItem("@spacebook_id");
    if (texty === "" ) {

    
      setErrorMessage('* this post is empty')
   
      
   } else{
    fetch("http://localhost:3333/api/1.0.0/user/"+id+"/post", { // change id 
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token1, //x-authorization
          //  "session_token":token1,
      },
      body: JSON.stringify({
        
        
        "text": texty,
      
      })
  })
  .then((response) => {
      if(response.status === 201){
       
          return steve.json();
      }else if(response.status === 400){
        throw 'Invalid email or password';
      }else{
          throw "Something happened";
      }
  }) 
  .catch((err) => {
      console.log(err);
  })
}
  }

if(global.mode){
  return(
    <View style={styles.container1}>
    <Text style={styles.title}>Drafts</Text>
    <Text>{global.mode}</Text>
    <TextInput
    style={styles.card}
    placeholder="write here :)"
        onChangeText={(texty) => setText(texty)}
        value={texty}
    />
     <Text style={{color:"red", fontStyle:"italic"}}>{errorMessage}</Text>
  
     <TouchableOpacity style={styles.button} onPress={() => postbaby()}> <Text> Post</Text></TouchableOpacity>
          
     <View style={{flex:1}}>
    <FlatList
      data={draft1}
      renderItem={({item}) => (
        <View style={styles.card}>
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity >{JSON.stringify(item)}</TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5, }} onPress={() => deletePost(JSON.stringify(item.author.user_id, item.post_id))}> <FontAwesome name="trash-o" color="black" size={20} /></TouchableOpacity>
            


            
          </View>
        </View>
      
      )}
    />
    </View>
</View>
  )
}else{
  return (
    <View style={styles.container}>
          <Text style={styles.title}>Drafts</Text>
          <Text>{global.mode}</Text>
          <TextInput
          style={styles.card}
          placeholder="write here :)"
              onChangeText={(texty) => setText(texty)}
              value={texty}
          />
              <Text style={{color:"red", fontStyle:"italic"}}>{errorMessage}</Text>
         <TouchableOpacity style={styles.button} onPress={() => postbaby()}> <Text> Post</Text></TouchableOpacity>
          
   <View style={{flex:1}}>
          <FlatList
            data={draft1}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => console.log(item.post_id)}>{JSON.stringify(item)}</TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 5, }} onPress={() => deletePost(item.author.user_id, item.post_id)}> <FontAwesome name="trash-o" color="black" size={20} /></TouchableOpacity>
       
                </View>
              </View>
              
            
            )}
          />
          </View>
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
  container1: {
     flex: 1,
    backgroundColor: "#123456"
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
    fontStyle:'italic',
    fontWeight: 'bold',
    alignItems: 'center',
    backgroundColor: "#61dafb",
    padding: 10,
    width:150,
    flexDirection: 'row',
    marginLeft:120,
    margin:30,
    marginBottom: 10,
    textAlign: "center",
    
alignItems: "center",
    
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