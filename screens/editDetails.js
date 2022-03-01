import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet, Image,TextInput,Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';


// GET END POINT PICTURES FUUUUUUU
// LOOK AT YOUR HISTORY AND BRING BACK YOUR PATCH REQUEST BOO
const UserProfile = () => {
    let [data, setData] = useState({});
    let [photo, setPhoto] = useState({});
    const [first_name, setFname] = useState("");
    const [last_name, setSname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let [isLoading, setIsLoading] = useState(true);
    let [data1, setData1] = useState({});
    
       
  
    

    useEffect(() => {
        getUser();
        setImagePFP();
    }, [])

    
    const getUser = async () => {
        let id = await AsyncStorage.getItem("@spacebook_id");
        let token = await AsyncStorage.getItem("@spacebook_token");
        let pfp= await AsyncStorage.getItem("@spacebook_pfp")
        console.log(pfp);
        console.log(id);

      
        fetch("http://localhost:3333/api/1.0.0/user/"+id, {
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

   
        const setImagePFP = async () => {
          let token = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
          let id= await AsyncStorage.getItem("@spacebook_id")
      
          
          console.log("ASh", token);
          fetch("http://localhost:3333/api/1.0.0/user/"+id+"/photo", {
            method: 'get',
            headers: {
              'Content-Type': 'image/png',
              'X-Authorization': token, //x-authorization
              //  "session_token":token1,
            },
      
          })
            .then((response) => {
             return response.blob();
            })
            .then(async (image) => {
              let data11 = URL.createObjectURL(image);
              setData1(data11);
              setIsLoading(false);
              console.log("ROARRRRRRRRRRRRRRRRRRRRRRR")
            })
            .catch((err) => {
              console.log(err);
            })
        }

        const update = async() => {
            let token = await AsyncStorage.getItem("@spacebook_token"); //call before i need it otherwise its undefined 
            let id= await AsyncStorage.getItem("@spacebook_id")
                console.log("ASh", token);
                fetch("http://localhost:3333/api/1.0.0/user/"+id, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token,
                },
                body: JSON.stringify({
                    "first_name":first_name,
                    "last_name": last_name,
                     //"email": email,
                    // "password": password
                })
            })
           
                  .then((steve) => {
                    if (steve.status === 200) {
                       
                        
                      console.log("IM HOME HONEY")
                      return steve.json();
                    } else if (steve.status === 400) {
                      throw 'Invalid email or password';
                    } else {
                      throw "Something happened";
                    }
                  }).then(async (jeffy) => {
                   
                    setData1(jeffy);
                    //setData1(post_id.first_name);
                    console.log("IHDUFIGSIUGB");
                   // console.log(data1);
                    console.log(jeffy);
                    console.log(post_id.first_name);
                    {getUser}
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



       
        <Image style={styles.profileImage} source={{uri:data1}} />
        <Text>SHALALALALALALALA</Text>
        <TextInput onChangeText={(first_name) => setFname(first_name)}
                    value={first_name} placeholder={data.first_name} placeholderTextColor="#000" />
<TextInput onChangeText={(last_name) => setSname(last_name)}
                    value={last_name} placeholder={data.last_name} placeholderTextColor="#000" />

<TextInput onChangeText={(email) => setEmail(email)}
                    value={email} placeholder={data.email} placeholderTextColor="#000" />

<TextInput onChangeText={(password) => setPassword(password)}
                    value={password} placeholder={data.password} placeholderTextColor="#000" />

    <Button title="Update" onPress={() => update()}
    />
     
            </View>
            
        )
        
    }
    
    
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0FFFF"
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




    
  
     