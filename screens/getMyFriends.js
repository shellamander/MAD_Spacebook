
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity
  
} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import { useImperativeHandle } from 'react/cjs/react.production.min';

const Friends = ({navigation}) => {

  const [friend, setFriend] = useState([]);
  const [friendID, setFriendID] = useState([]);
  const [practice, setPractice] = useState([]);
  console.log("RARARARA",friendID)


  
  useEffect(() => {
    Searchy();
}, [])

  const Searchy= async()=>{

 
  let token = await AsyncStorage.getItem("@spacebook_token");
  let id = await AsyncStorage.getItem("@spacebook_id");

  
    fetch("http://localhost:3333/api/1.0.0/user/"+id+"/friends", {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
        })
        .then((response) => {
          if (response.status === 200) {
             console.log("im working: fRIEND EDITION");
             return response.json();
          } else if (response.status === 401) {
              throw 'Unauthorised';
          }else if (response.status === 403) {
            throw 'we are friends already';
        } else {
              throw "Something happened";
          }
      })
      .then(async (Friend) => {
        setFriend(Friend)
        await AsyncStorage.setItem('@spacebook_friends', Friend);
    
        setFriendID(Friend)
        Flist();
       })
      .catch((err) => {
          console.log(err);
      })
    }
 
    const goToFriend= async(id)=>{
 
   
      navigation.navigate('friendAccount', {"friend_id": id});
 
        }

        const Flist= async()=>{

          {friend.map(async friend1 => (
  
      
             await AsyncStorage.setItem('@spacebook_friends', friend1)
           
               
            
            ) ) }
  
            console.log("I HOPE IM SUCCESSFULLY SETTING THIS "+ AsyncStorage.getItem('@spacebook_friends'));
            }
    
 const getItem = () => {
    {friendID.map(friend2 => (
  
      <View>
        
        <Text style={styles.myButton}  >{friend2.user_id} </Text> 
         
         </View>
      ) ) }
  };

  if (global.mode) {
  return (
  
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container1}>
      <Text style={styles.title1}>My Friends</Text>
     
        {friend.map(friend1 => (
             
          <View>
          
            <TouchableOpacity  onPress={() => goToFriend(friend1.user_id)} style={styles.fname}  ><Text style={{textAlign:"center"}}> {friend1.user_givenname}</Text> </TouchableOpacity> 
             
             </View>
          ) ) }

          

       
      </View>
    </SafeAreaView>
    
  );

        }

        else{

          return (
  
            <SafeAreaView style={{flex: 1}}>
              <View style={styles.container}>
              <Text style={styles.title1}>My Friends</Text>
             
                {friend.map(friend1 => (
                     
                  <View>
                  
                    <TouchableOpacity  onPress={() => goToFriend(friend1.user_id)} style={styles.fname}  ><Text style={{textAlign:"center"}}> {friend1.user_givenname}</Text> </TouchableOpacity> 
                     
                     </View>
                  ) ) }
        
                  
        
               
              </View>
            </SafeAreaView>
            
          );
        }



};


const styles = StyleSheet.create({
  container: {
      flex: 4,
      backgroundColor: "#F0FFFF",
      textAlign: "center",
  },

  container1: {
    // flexGrow: 1,
    flex: 1,
    backgroundColor: "#123456",
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

export default Friends;