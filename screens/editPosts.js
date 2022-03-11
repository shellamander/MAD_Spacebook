import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet, Image,TextInput,Button,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangeImage from './Published';
import { TouchableOpacity } from 'react-native-gesture-handler';



// GET END POINT PICTURES FUUUUUUU
// LOOK AT YOUR HISTORY AND BRING BACK YOUR PATCH REQUEST BOO
const UserProfile = ({route,navigation}) => {
    let [data, setData] = useState({});
    let [photo, setPhoto] = useState({});
    const [text, setText] = useState("");
   
    let [data1, setData1] = useState({});
    
    
       
  
    

    useEffect(() => {
       postbaby();
   
    }, [])

    
    const postbaby = async () => {

        let token = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
        let id = await AsyncStorage.getItem("@spacebook_id")
        let post_id=  await AsyncStorage.getItem("@spacebook_postEdit");
        fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post/"+post_id, { // change id 
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
          }).then(async (res) => {
           
    setData1(res);
    
          })
          .catch((err) => {
            console.log(err);
          })
      };

    const updatePost = async() => {
       
    console.log("god im tired", post_id)
        let id = await AsyncStorage.getItem("@spacebook_id");
        let token = await AsyncStorage.getItem("@spacebook_token");
        let post_id=  await AsyncStorage.getItem("@spacebook_postEdit");
        console.log("god im tired 200", post_id)
        fetch("http://localhost:3333/api/1.0.0/user/"+id+"/post/"+post_id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({
            "text":text,
          
        })
    })
        .then((response) => {
          if (response.status === 200) {
            console.log("ive updated  ");
          } else if (response.status === 401) {
            console.log("ive 401  ");
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
    
  }

  
        return (
            <View style={styles.container}> 

<View style={{ flex: 3}}>
  <Text style={styles.fname}>{data1.text}</Text>

    </View >
      <View style={{ flex: 3}}>
        <TextInput  style={styles.fname} onChangeText={(text) => setText(text)}
                    value={text} placeholder="Edit Post" placeholderTextColor="#000" />


<TouchableOpacity style={styles.button} title="Login"
                onPress={() => updatePost()}> <Text> Update</Text></TouchableOpacity>

                 <TouchableOpacity style={styles.button} title="Login"
                onPress={() => navigation.goBack()}> <Text> return</Text></TouchableOpacity>
               </View>
     
            </View>
            
        )
        
    }
    
    
    

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#F0FFFF",
      textAlign: "center",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    alignItems: 'center',
   marginLeft:100
},
  
text:{
  fontStyle:'italic',
  fontWeight: 'bold',
},
  button: {
      fontStyle:'italic',
      fontWeight: 'bold',
      alignItems: 'center',
      backgroundColor: "#61dafb",
      padding: 10,
      width:150,
      flexDirection: 'row',
      marginLeft:100,
      margin:50,
      marginBottom: 10,
      textAlign: "center",
      
  alignItems: "center",
      
    },
  
    title: { 
      marginTop: 100,
      color: "#61dafb",
      textAlign: "center",
      fontSize: 50,
      fontStyle:'italic',
      fontWeight: 'bold'
    },
    title1: {
      marginTop: 10,
      color: "#61dafb",
      textAlign: "center",
      fontSize: 30,
      fontStyle:'italic',
      fontWeight: 'bold'
    },
    fname: {
      fontStyle:'italic',
      fontWeight: 'bold',
      flexDirection: 'row',
      backgroundColor: "#61dafb",
  borderRadius: 5,
  width: "70%",
  height: 45,
  marginBottom: 10,
  textAlign: "center",
  margin:50,

  alignItems: "center",
    },
   
}
)

export default UserProfile;




    
  
     