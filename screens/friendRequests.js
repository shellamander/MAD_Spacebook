
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

const Friends1 = () => {
  const [search, setSearch] = useState([]);
  const [friend, setFriend] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  
  useEffect(() => {
    Searchy();
}, [])

  const Searchy= async()=>{

 
  let token = await AsyncStorage.getItem("@spacebook_token");

  
    fetch("http://localhost:3333/api/1.0.0/friendrequests", {
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
        //should do an array list and loop through thelist setting the neame
        console.log(FRIENDLY)
        console.log("im tryna be friend w you " ,friend)
       })
      .catch((err) => {
          console.log(err);
      })
    }
 
    const acceptFriend= async(id)=>{
      let token = await AsyncStorage.getItem("@spacebook_token");

        fetch("http://localhost:3333/api/1.0.0/friendrequests/"+id,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
            })
          
          .then((response) => {
            if (response.status === 200) {
               console.log("im working and ive accepted you");
            } else if (response.status === 401) {
                throw 'Unauthorised';
            }else if (response.status === 403) {
              throw 'we are friends already';
          } else {
                throw "Something happened";
            }
        })
        .catch((err) => {
            console.log(err);
        })
      }
          

      const rejectFriend= async(id)=>{
        let token = await AsyncStorage.getItem("@spacebook_token");
  
          fetch("http://localhost:3333/api/1.0.0/friendrequests/"+id,{
              method: 'delete',
              headers: {
                  'Content-Type': 'application/json',
                  'X-Authorization': token
              }
              })
            
            .then((response) => {
              if (response.status === 200) {
                 console.log("im working and ive rejected you");
              } else if (response.status === 401) {
                  throw 'Unauthorised';
              }else if (response.status === 403) {
                throw 'we are friends already';
            } else {
                  throw "Something happened";
              }
          })
          .catch((err) => {
              console.log(err);
          })
        }

//PLEASE CONDITIONALLY RENDER SO AFTER YOU ACCEPTED THE FRIEDN REQUEST IT DISAPPEARS SHAZA
  const getItem = (item) => {
    // Function for click on an item
    console.log(friend)
    alert('Id : ' + item.user_givenname + ' Title : ' + item.user_familyname);
  };

  return (
  
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
     
        
        {friend.map(friend1 => (
          <View>
            
            <TouchableOpacity onPress={() => console.log(friend1)} style={styles.myButton}>{friend1.first_name}</TouchableOpacity> 
            <TouchableOpacity  onPress={() => acceptFriend(friend1.user_id)}> <Text> ACCEPT FRIEND</Text></TouchableOpacity>
            <TouchableOpacity  onPress={() => rejectFriend(friend1.user_id)}> <Text> REJECT FRIEND</Text></TouchableOpacity>
          </View>
          ) ) }
      
        
       
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

export default Friends1;