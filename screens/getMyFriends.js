
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

const Friends = ({navigation}) => {

  const [friend, setFriend] = useState([]);
  const [friendID, setFriendID] = useState([]);
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
      .then(async (FRIENDLY) => {
        setFriend(FRIENDLY)
        setFriendID(FRIENDLY)
        //should do an array list and loop through thelist setting the neame
        console.log(FRIENDLY)
        console.log("im tryna be friend w you " ,friendID)
       })
      .catch((err) => {
          console.log(err);
      })
    }
 
    const goToFriend= async(id)=>{
      let friendPage = id;
      console.log(friendPage);
     // await AsyncStorage.setItem('@spacebook_friend', friendPage);
      navigation.navigate('friendAccount', {"friend_id": id});
        }




//PLEASE CONDITIONALLY RENDER SO AFTER YOU ACCEPTED THE FRIEDN REQUEST IT DISAPPEARS SHAZA
  const getItem = () => {
    {friendID.map(friend2 => (
  
      <View>
        
        <Text style={styles.myButton}  >{friend2.user_id} </Text> 
         
         </View>
      ) ) }
  };

  return (
  
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
     
        {friend.map(friend1 => (
  
          <View>
            
            <TouchableOpacity  onPress={() => goToFriend(friend1.user_id)} style={styles.myButton}  >{friend1.user_givenname} </TouchableOpacity> 
             
             </View>
          ) ) }

          
{friendID.map(friend2 => (
  
  <View>
    
    <Text style={styles.myButton}  >{friend2.user_id} </Text> 
     
     </View>
))}
       
      </View>
    </SafeAreaView>
    
  );
};
// THE RETURN STATEMENT FLATLIST DOESNT DO ANYTHING OTHER THAN REDNER ITEM VIEW 
//MAKE SURE TO JUST ADD A STYLE CONTAINER

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  myButton: {
    padding: 30,
    backgroundColor: 'pink'
  }
});

export default Friends;