import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput
  
} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';

const Friends = () => {
  const [search, setSearch] = useState('');
  const [friend, setFriend] = useState('');
  const [text, setText] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
 

  
  useEffect(() => {
    Searchy();
}, [])

  const Searchy= async()=>{

 
  let token = await AsyncStorage.getItem("@spacebook_token");

  
    fetch("http://localhost:3333/api/1.0.0/search", {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
        })
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const Searchfor= async()=>{

 
    let token = await AsyncStorage.getItem("@spacebook_token");
  
    
      fetch("http://localhost:3333/api/1.0.0/search?q="+text+"&limit=20&offset=0", {
          method: 'get',
          headers: {
              'Content-Type': 'application/json',
              'X-Authorization': token
          }
          })
        .then((response) => response.json())
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    }
 
    const addFriend= async(id)=>{
      let token = await AsyncStorage.getItem("@spacebook_token");

        fetch("http://localhost:3333/api/1.0.0/user/"+id+"/friends" ,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
            })
          
          .then((response) => {
            if (response.status === 201) {
               console.log("im working");
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
          



  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.user_givenname
          ? item.user_givenname.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
      console.log("HI IM SERACHING FOR MY FRIEND :", newData)
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    //setFriend(item.user_id);
    //console.log("i'm this person" ,search)
    return (
      <View style={styles.container}>
       
      <Text style={styles.itemStyle}>
          {item.user_givenname}
      </Text>
      <TouchableOpacity
       style={{ height: 20, width:100, backgroundColor:'#FF5733' }} onPress={() => addFriend(item.user_id)}
      >
        <Text>Add Friend</Text>
      </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.user_givenname + ' Title : ' + item.user_familyname);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        /> */}

        {/* {draft.map(draft => (
          <View>{draft}</View>
        ))} */}
        
         <TextInput style={styles.fname1} onChangeText={(text) => setText(text) }value={text}/>
         <TouchableOpacity onPress={() => Searchfor()}>{ <Text> Submit </Text>}</TouchableOpacity> 
        <FlatList
        
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
         
          
        />
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  fname1: {
     
    marginLeft: 15,
    marginTop:45,
  height:30,
 
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
});

export default Friends;
