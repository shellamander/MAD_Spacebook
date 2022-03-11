
import React, { useState, useEffect } from 'react';
import { Text,Switch, TextInput, Button, View, StyleSheet } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-Icons';
import ListComponent from "./ListComponent"

import Drafts from './Drafts';
import { SafeAreaView } from 'react-native-safe-area-context';



const UserPosts = ({route,navigation}) => {
  //global.mode=false;
  //DATA WAS A LET SAHA
  const [data, setData] = useState([]);
  const [friend, setFriend] = useState([]);
  let [frienddata, setFriendData] = useState({});
  let [isLoading, setIsLoading] = useState(true);
  let [texty1, setText1] = useState([]);
  let [practice, setPractice] = useState([]);
  const [friendpost, setFriendPost] = useState([]);
  const all = friendpost.concat(data);
 
  
  
  const [texty, setText] = useState('');
  const [draft, setDraft] = useState();
  useEffect(async() => {

  
     Searchy();
  getFriendPost();


 
    (async () => {
    
      const draft = await AsyncStorage.getItem("@spacebook_drafts");
     
    
    })()

    getFriendPost(); //you are undefined for some unhappy reason
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
          await AsyncStorage.setItem('@spacebook_friends', FRIENDLY);
          console.log("I AM FRIEDNLSY" , FRIENDLY);
      
          //should do an array list and loop through thelist setting the neame
          console.log(FRIENDLY)
       
         getFriendPost(FRIENDLY);
         })
        .catch((err) => {
            console.log(err);
        })
      }


      const  getFriendPost = async (sotired) => {
        console.log("LOOK HERE",sotired);
      //     //<FlatList
      // data={sotired}
      // renderItem={({item}) => (
      //   setPractice(JSON.stringify(item.user_id))
        
      let token = await AsyncStorage.getItem("@spacebook_token");
      // )}
      // ///>
      sotired?.forEach(element => {
      
      
        fetch("http://localhost:3333/api/1.0.0/user/" + element.user_id + "/post", {
          method: 'get',
          headers: {
              'Content-Type': 'application/json',
              'X-Authorization': token
          }
          })
          .then((response) => {
              if (response.status === 200) {
                  return response.json();
              } else if (response.status === 400) {
                  throw 'Invalid email or password';
              } else {
                  throw "Something happened";
              }
          }).then(async (user) => {
              console.log("check",user);
              await setFriendPost(user);
              await setIsLoading(false);
              console.log("IM PATHETIC ", all)
              //console.log(data)
             
               
            
             })
          .catch((err) => {
             setIsLoading(false);
              console.log(err);
          })
      }
      
        
      );
      
      
      //  console.log("IM A PRACTICE GIRL",practice.user_id);
      //     console.log("who ami i ",friend_id);
      //     console.log("who ami i ",friend_id);
      //     let token = await AsyncStorage.getItem("@spacebook_token");
          
      //     const {friend_id } = route.params;
      //     console.log("who ami i ",friend_id);
      //lets loop through async storage
        }
        if(global.mode){
  return(

    <View style={styles.container1}>
  
    <FlatList
          data={friendpost}
          renderItem={({ item }) => (
            
            <View style={styles.card}>
           
              <View style={{ flexDirection: 'row' }}>
                
                <TouchableOpacity onPress={() => console.log("ARE YOU EVEN SHOWING",item.post_id)}>{item.text}</TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 5, }} onPress={() => deletePost(item.author.user_id, item.post_id)}> <FontAwesome name="trash-o" color="black" size={20} /></TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "FFF" }} onPress={() => updatePost(item.author.user_id, item.post_id)}> <Text> Update</Text></TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.post_id.toString()}
        // removeClippedSubviews={true} // Unmount components when outside of window 
        // initialNumToRender={2} // Reduce initial render amount
        // maxToRenderPerBatch={1} // Reduce number in each render batch
        // updateCellsBatchingPeriod={100} // Increase time between renders
        // windowSize={7}
       />
          
        
    
    
    </View>

  )
          }
          else{
            return(

              <View style={styles.container}>
            
              <FlatList
                    data={friendpost}
                    renderItem={({ item }) => (
                      
                      <View style={styles.card}>
                     
                        <View style={{ flexDirection: 'row' }}>
                          
                          <TouchableOpacity onPress={() => console.log("ARE YOU EVEN SHOWING",item.post_id)}>{item.text}</TouchableOpacity>
                          <TouchableOpacity style={{ marginLeft: 5, }} onPress={() => deletePost(item.author.user_id, item.post_id)}> <FontAwesome name="trash-o" color="black" size={20} /></TouchableOpacity>
                          <TouchableOpacity style={{ backgroundColor: "FFF" }} onPress={() => updatePost(item.author.user_id, item.post_id)}> <Text> Update</Text></TouchableOpacity>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.post_id.toString()}
                  // removeClippedSubviews={true} // Unmount components when outside of window 
                  // initialNumToRender={2} // Reduce initial render amount
                  // maxToRenderPerBatch={1} // Reduce number in each render batch
                  // updateCellsBatchingPeriod={100} // Increase time between renders
                  // windowSize={7}
                 />
                    
                  
              
              
              </View>
          
            )

                    }
          
        };
        
const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
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
    //fontFamily: "GillSans-SemiBold",
    fontStyle:'italic',
    fontWeight: 'bold',
    fontSize:20,
    backgroundColor: "#61dafb",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    height: 100

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
    width: 100,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    padding: 10,
    width: 100,
  },
  title: {
    // marginTop: 50,
    //paddingVertical: 8,
    //borderWidth: 4,
    //borderColor: "#20232a",
    // borderRadius: 6,
    //backgroundColor: "#61dafb",
    color: "#61dafb",
    textAlign: "center",
    fontSize: 50,
    fontStyle: 'italic',
    fontWeight: 'bold',
    flex: 1
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
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  fname: {

    // marginTop: 45,


    padding: 1,
    width: 300,
    // SHAZA LOOK
    // borderWidth: 4,
    //borderColor: "#20232a",
    borderRadius: 500,
    backgroundColor: "#61dafb",
    color: "#123456",
    textAlign: "center",
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textTransform: "uppercase"
  },
  fname1: {

    marginLeft: 15,
    // marginTop: 45,
    height: 30,

    padding: 1,
    width: 300,
    // SHAZA LOOK
    // borderWidth: 4,
    //borderColor: "#20232a",
    borderRadius: 500,
    backgroundColor: "#61dafb",
    color: "#123456",
    textAlign: "center",
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textTransform: "uppercase"
  },
}
)

        export default UserPosts;