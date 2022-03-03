import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {FontAwesome} from '@expo/vector-Icons';


// GET END POINT PICTURES FUUUUUUU
// LOOK AT YOUR HISTORY AND BRING BACK YOUR PATCH REQUEST BOO 
// prevent them from empty strings 
const UserProfile = ({route,navigation}) => {
    let [data, setData] = useState({});
    let [photo, setPhoto] = useState({});
    let [isLoading, setIsLoading] = useState(true);
    let [data1, setData1] = useState([]);
    
       
  
    

    useEffect(async () => {
        await getUser();
        
     
    }, [])

    
    const getUser = async () => {

        let token = await AsyncStorage.getItem("@spacebook_token");
        const {friend_id } = route.params;
        console.log(friend_id);

      
        fetch("http://localhost:3333/api/1.0.0/user/" + friend_id, {
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
            console.log(user);
            await setData(user);
            //await setIsLoading(false);
            //console.log(data)
            
             await getPost();
          
           })
        .catch((err) => {
            console.log(err);
        })
    }

   
  const getPost= async ()=> {

    let token = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    const {friend_id } = route.params;
    console.log(friend_id);

    console.log("ASh", token);
    fetch("http://localhost:3333/api/1.0.0/user/"+friend_id+"/post", {
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
        
        //let post_id = post;
        await setData1(post);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //post this as a string rather than throwing it 
      })
  }
  const likePost= async(id,post)=>{
    let token = await AsyncStorage.getItem("@spacebook_token");

      fetch("http://localhost:3333/api/1.0.0/user/"+id+"/post/"+post+"/like",{
          method: 'post',
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
            throw 'you liked this already';
        } else {
              throw "Something happened";
          }
      })
      .catch((err) => {
          console.log(err);
      })
    }

    const dislikePost= async(id,post)=>{
      let token = await AsyncStorage.getItem("@spacebook_token");
  
        fetch("http://localhost:3333/api/1.0.0/user/"+id+"/post/"+post+"/like",{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
            })
          
          .then((response) => {
            if (response.status === 200) {
               console.log("im working and ");
            } else if (response.status === 401) {
                throw 'Unauthorised';
            }else if (response.status === 403) {
              throw 'you havent even liked it';
          } else {
                throw "Something happened";
            }
        })
        .catch((err) => {
            console.log(err);
        })
      }
        
   
// move the throw error to be viible 
//check for a;ll the error codes
    if(isLoading){
        return (<View><Text>Loading</Text></View>)
        
    }else{
        return (
            <View style={{alignItems:'center'}}>
                <View style={{flex: 1}}> 
                    <Text>{data.first_name} {data.last_name}</Text>
                    <Text>You have {data.friend_count} friends</Text>
                </View>
                
                
                <View style={{flex: 2}}>
                    <FlatList
                        data={data1}
                        renderItem={({item}) => (
                            <View style={styles.card}>
                                <View style={{flexDirection:'row'}}> 
                                    <TouchableOpacity onPress={() => console.log(item.post_id)}>{item.text}</TouchableOpacity> 
                                    <TouchableOpacity style={{ marginLeft:15 }} onPress={() => likePost(item.author.user_id, item.post_id)}> <FontAwesome name="thumbs-up" color="green" size={20}/></TouchableOpacity>
                                    <TouchableOpacity style={{ height: 20, width:60, marginLeft:15,  }} onPress={() => dislikePost(item.author.user_id, item.post_id)}> <FontAwesome name="thumbs-down" color="red" size={20}/></TouchableOpacity>
                                    </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.post_id.toString()}
                    />
             

                </View>

            </View>

                
           
            
        )
        
    }
    
    
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0FFFF"
    },
    card: {
        fontFamily: "GillSans-SemiBold",
        backgroundColor: "#61dafb",
        padding: 10,
        margin:10,
        borderRadius:10,
        height: 100
      
    },
    text: {
        fontFamily: "GillSans-SemiBold",
        color: "#000"
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
}
)

export default UserProfile;


// <FlatList
// data={data1}
// renderItem={({item}) => (
//   <View style={styles.card}>
//     <View style={{flexDirection:'row'}}> 
//       <TouchableOpacity onPress={() => console.log(item.post_id)}>{item.text}</TouchableOpacity> 
//       <TouchableOpacity style={{ marginLeft:15 }} onPress={() => likePost(item.author.user_id, item.post_id)}> <FontAwesome name="thumbs-up" color="green" size={20}/></TouchableOpacity>
//       <TouchableOpacity style={{ height: 20, width:60, marginLeft:15,  }} onPress={() => dislikePost(item.author.user_id, item.post_id)}> <FontAwesome name="thumbs-down" color="red" size={20}/></TouchableOpacity>
//       <TouchableOpacity style={{ marginLeft:5,  }}  onPress={() => deletePost(item.author.user_id, item.post_id)}> <FontAwesome name="trash-o" color="black" size={20}/></TouchableOpacity>
//       <TouchableOpacity style={{ backgroundColor:"FFF"}}  onPress={() => updatePost(item.author.user_id, item.post_id)}> <Text> Update</Text></TouchableOpacity>
//     </View>
//   </View>
// )}
// keyExtractor={(item) => item.post_id.toString()}
// />

//PATCH REQUEST IS DOWN THERE SHAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

// import React, { useState, useEffect } from 'react';
// import { Text, Button, View,TextInput } from 'react-native';
// //import { TouchableOpacity } from 'react-native-gesture-handler'
// import AsyncStorage from '@react-native-async-storage/async-storage';




// //IMPLEMENT THE PATCH FUNCTION HERE SHAZA

// function IDK() {

//   //const [token1, setToken] = useState('d57191920ee5a8064700b32f66ce3074');
//   const [data, setData] = useState([]);
//   const [first_name, setFname] = useState("");
//   const [isLoading, setIsLoading] = useState(true);


//   const  delete1  = async()=>{
//     await AsyncStorage.clear();
//     console.log("USSSSSS");
//     // naVIGATE TO LOGIN HERE SHAZA DONT FORGET YA USELESS CHIMP
//     // ACC   IMPLEMENT THE LOGOUT ENDPOINT SO ITDS NOT JUST LOCALLY SIGNED OUT
// }

  

// //   const test = async () => {
// //     const store = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    
// //     setToken(store);
// //     console.log("imdifferent");
// //     console.log(store);
// //   }

// //   const test1 = async () => {
// //    //call before i need it otherwise its undefined 
// //     const storeid= await AsyncStorage.getItem("@spacebook_id");
  
// //      await setID(storeid);
// //     console.log("imdifferent");
// //     console.log(storeid);
// //   }
 
// //   console.log(token1)
// //   console.log("please notice me");
// //   console.log(id1);

//   // useEffect (async() => {
//   //   await postbaby();
//   //   setData(jeff)
//   //   });

// //   useEffect(async () => {
// //     // await test();
// //     // console.log(token1, "Now do post baby")
    
// //   }, []); 
  
//   useEffect(async () => {
//     getUser();  // if statement async storage 
//   }, []);// testing

// //   console.log("ibegyounoticeme");
// //   console.log(id1);
// //   console.log(token1);

//   //reference later for r 
//   //"user_id": AsyncStorage.getItem(18);
//   //var r = 18;
//   const getUser = async () => {
    
//     let id = await AsyncStorage.get("@spacebook_id");
//     let token = await AsyncStorage.get("@spacebook_token");
//     fetch("http://localhost:3333/api/1.0.0/user/" + id+ {
//       method: 'get',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Authorization': token, //x-authorization
//         //  "session_token":token1,
//       },

//     })
//       .then((steve) => {
//         if (steve.status === 200) {
//           console.log("IM HOME HONEY")
//           return steve.json();
//         } else if (steve.status === 400) {
//           throw 'Invalid email or password';
//         } else {
//           throw "Something happened";
//         }
//       }).then(async (user) => {
//         console.log("IM WORKINGGG")
//         //test123= jeff.first_name ;
//         //console.log(test123);
        
//         setData(user);
//         setIsLoading(false);
//         //setData1(post_id.first_name)

//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }


//   const update = () => {
    
//     console.log("ASh", token1);
//     fetch("http://localhost:3333/api/1.0.0/user/"+id1, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Authorization': token1,
//     },
//     body: JSON.stringify({
//         "first_name":first_name,
//         // "last_name": last_name,
//         // "email": email,
//         // "password": password
//     })
// })
// /// CALL GET AGAIN AFTER PATCH SO IT CAN DISPLAY IT 

// // PATCH DOESNT RRETURN ANYTHING, YOU NEED TO ACC UPDATED IT BY CALLING GET AGAIN SO YOU CAN PHYSICALLY SEE THE CHNAGE
// //GET RID OF THIS SHAZA (BELOWW)
//       .then((steve) => {
//         if (steve.status === 200) {
//             //request or call function to  do another request
//           console.log("IM HOME HONEY")
//           return steve.json();
//         } else if (steve.status === 400) {
//           throw 'Invalid email or password';
//         } else {
//           throw "Something happened";
//         }
//       }).then(async (jeffy) => {
//         console.log("IM WORKINGGG")
//         console.log(jeffy)
//         let post_id = jeffy;
//        //test123= jeff.first_name ;
//        //console.log(test123);
        

//         await AsyncStorage.setItem('@post_id', post_id);
//         setData(post_id);
//         //setData1(post_id.first_name);
//         console.log("IHDUFIGSIUGB");
//        // console.log(data1);
//         console.log(jeffy);
//         console.log(post_id.first_name);

//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }

//  //
// //<Text>{test123}</Text>// IM OVER HEREEEEEEEEEE


// if(isLoading){
   
//     return (<View><Text>Loading baby...</Text>
//     <Button title ="Logout"  
//                 onPress={() => delete1()}> </Button>
//     </View>)
// }else{
//     return (  /// flatlist 
//         //
    
//         //
//         <View>
//           <Text>Drafts</Text>
    
//            {/* <Button
//             title="POST"
//             onPress={() => postbaby()}
    
//           />  */}
    
    
    
//     <TextInput onChangeText={(first_name) => setFname(first_name)}
//                     value={first_name} placeholder={data.first_name} placeholderTextColor="#000" />
//     <Text>{data.last_name}</Text>
//     <Text>{data.email}</Text>
//     <Text>{data.user_id}</Text>
//     <Button title="Update" onPress={() => update()}
//     />
          
    
//         </View>
    
//       )
//     }

// }

  
// //{data.map(post => <Text>{post.first_name}</Text>)} 

// //d57191920ee5a8064700b32f66ce3074

// ;





// export default IDK;