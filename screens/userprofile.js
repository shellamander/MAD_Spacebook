import React, { useState, useEffect } from 'react';
import { Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

// GET END POINT PICTURES FUUUUUUU
const UserProfile = ({navigation}) => {
    let [data, setData] = useState({});
    let [photo, setPhoto] = useState({});
    let [isLoading, setIsLoading] = useState(true);
  
    

    useEffect(() => {
        getUser();
    }, [])

    
    const getUser = async () => {
        let id = await AsyncStorage.getItem("@spacebook_id");
        let token = await AsyncStorage.getItem("@spacebook_token");
        let pfp= await AsyncStorage.getItem("@spacebook_pfp")
        console.log(pfp);
        console.log(id);

      
        fetch("http://localhost:3333/api/1.0.0/user/" + id, {
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
            await setData(user);
            await setPhoto(pfp);
            await setIsLoading(false);
            console.log("hey shawty" , photo);
            console.log(isLoading, data)
           })
        .catch((err) => {
            console.log(err);
        })
    }

    const logout = async () => {
        //let id = await AsyncStorage.getItem("@spacebook_id");
        let token = await AsyncStorage.getItem("@spacebook_token");
        //let pfp= await AsyncStorage.getItem("@spacebook_pfp")
        //console.log(pfp);
        console.log("do i even reach here");

      
        fetch("http://localhost:3333/api/1.0.0/logout/" , {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
        })
        .then(async (response) => {
            if (response.status === 200) {
                console.log("we out")
                await AsyncStorage.removeItem("@spacebook_token")
                navigation.navigate('homescreen');
            } else if (response.status === 400) {
                throw 'Invalid email or password';
            } else {
                throw "Something happened";
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
// move the throw error to be viible 
//check for a;ll hte error codes
    if(isLoading){
        return (<View><Text>Loading</Text></View>)
    }else{
        return (
            <View style={{alignItems:'center'}}> 


{/* <Text>{pfp}</Text>  <Image source={require()} // lets stosre image in async storage to get it  */}

                 

                <Text>{data.first_name}</Text>
                <TouchableOpacity onPress={() => logout()}> <Text> Logout</Text></TouchableOpacity>
                
                
            </View>
        )
    }
    
}

export default UserProfile;


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