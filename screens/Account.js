import React, { useState, useEffect } from 'react';
import { Text, TextInput, Button, View, StyleSheet } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-Icons';
import Drafts from './Drafts';
import { SafeAreaView } from 'react-native-safe-area-context';


const UserPosts = ({route,navigation}) => {
  let [data, setData] = useState({});
  const [friend, setFriend] = useState([]);
  let [frienddata, setFriendData] = useState({});
  let [isLoading, setIsLoading] = useState(true);
  let [texty1, setText1] = useState([]);
  let [practice, setPractice] = useState([]);
  const [friendpost, setFriendPost] = useState([]);
  
  const [texty, setText] = useState('');
  const [draft, setDraft] = useState();
  const [sob, setSobbing] = useState();





  
  const test= async () => { 
   setSobbing();////////// 


  }



  useEffect(async() => {
   
    await test();
    Searchy();
    getPost();
    (async () => {
      const draft = await AsyncStorage.getItem("@spacebook_drafts");
      setDraft(JSON.parse(draft))
     
    })()

    getFriendPost(); //you are undefined for some unhappy reason
  }, [])

  console.log('draft', draft)


  const getPost = async () => {

    let token = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    let id = await AsyncStorage.getItem("@spacebook_id")

    console.log("ASh", token);
    fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post", {
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

        let post_id = post;
        setData(post);

   


      })
      .catch((err) => {
        console.log(err);
        //post this as a string rather than throwing it 
      })
  }


  const likePost = async (id, post) => {
    let token = await AsyncStorage.getItem("@spacebook_token");

    fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post/" + post + "/like", {
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
        } else if (response.status === 403) {
          throw 'you liked this already';
        } else {
          throw "Something happened";
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const dislikePost = async (id, post) => {
    let token = await AsyncStorage.getItem("@spacebook_token");

    fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post/" + post + "/like", {
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
  const postbaby = async () => {

    let token = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
    let id = await AsyncStorage.getItem("@spacebook_id")
    fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post", { // change id 
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token, //x-authorization
        //  "session_token":token1,
      },
      body: JSON.stringify({

        "text": texty,

      })
    })
      .then((steve) => {
        if (steve.status === 201) {
          console.log("IM HOME HONEY")
          return steve.json();
        } else if (steve.status === 400) {
          throw 'Invalid email or password';
        } else {
          throw "Something happened";
        }
      }).then(async (jeff) => {
        //console.log("IM WORKINGGG")
        let post_id = jeff.id;


        await AsyncStorage.setItem('@post_id', post_id);
        console.log(post_id)
        getPost();

      })
      .catch((err) => {
        console.log(err);
      })
  }


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
        console.log(user);
        await setFriendPost(user);
        await setIsLoading(false);
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

  
   
  const saveDraft = async (texty) => {
    const allDrafts = [...draft, texty] //spread operator 
    setDraft(allDrafts)
    await AsyncStorage.setItem("@spacebook_drafts", JSON.stringify(allDrafts));
  }


  if (isLoading) {
    return (<View><Text>Loading</Text></View>)
  } else {
    // const rawr = data.map((post)=>{   
    //   (post.post_id);  
    //SHAZA
    // I CANT LIKE MY OWN [POST]
    // I CANT LIKE SOMEONES COMMENT ON MY OWN WALL
    // CONDITONAL RENDERING OVER HERE 
    //include mine and peoples posts
    //we need a view with space allocated via flex:8 
    return (
      //my scroll wont work booo :(

       

         <View>
        <View>
  

</View>

        <Text style={styles.title}>My Feed</Text>
        
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <TextInput style={styles.fname1} onChangeText={(texty) => setText(texty)} value={texty} />
          <TouchableOpacity style={{ marginTop: 48 }} onPress={() => saveDraft(texty)}> <FontAwesome name="plus" color="red" size={20} /></TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 48 }} onPress={() => postbaby()}> <FontAwesome name="plus" color="green" size={20} /></TouchableOpacity>

        </View>



         <View style={{ flex: 4 }}>

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => console.log(item.post_id)}>{item.text}</TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 5, }} onPress={() => deletePost(item.author.user_id, item.post_id)}> <FontAwesome name="trash-o" color="black" size={20} /></TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: "FFF" }} onPress={() => updatePost(item.author.user_id, item.post_id)}> <Text> Update</Text></TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.post_id.toString()}
          /> 
           </View>
<View style={{ flex: 8 }}>
<FlatList
            data={friendpost}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => console.log(item.post_id)}>{item.text}</TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 5, }} onPress={() => deletePost(item.author.user_id, item.post_id)}> <FontAwesome name="trash-o" color="black" size={20} /></TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: "FFF" }} onPress={() => updatePost(item.author.user_id, item.post_id)}> <Text> Update</Text></TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.post_id.toString()}
          />


</View>


       
        {draft.map(draft => (
          <View>{draft}</View>
        ))}

      </View>
    );
  }
}



//   {/* {data.map(post => (<TouchableOpacity onPress={() => console.log(post.post_id)}>{post.text}</TouchableOpacity> )) }  */}

//     )
//   }
// }


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginTop: 50,
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

    marginTop: 45,


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
    marginTop: 45,
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