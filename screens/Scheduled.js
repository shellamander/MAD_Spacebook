import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,

} from 'react-native';

function Friends() {
  const [search, setSearch] = useState('');
  const [friend, setFriend] = useState('');
  const [text, setText] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    Searchy();
  }, []);

  const Searchy = async () => {
    const token = await AsyncStorage.getItem('@spacebook_token');

    fetch('http://localhost:3333/api/1.0.0/search', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
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
  };

  const Searchfor = async () => {
    const token = await AsyncStorage.getItem('@spacebook_token');

    fetch(`http://localhost:3333/api/1.0.0/search?q=${text}&limit=20&offset=0`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
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
  };

  const addFriend = async (id) => {
    const token = await AsyncStorage.getItem('@spacebook_token');

    fetch(`http://localhost:3333/api/1.0.0/user/${id}/friends`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })

      .then((response) => {
        if (response.status === 201) {
          console.log('im working');
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 403) {
          throw 'we are friends already';
        } else {
          throw 'Something happened';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterDataSource.filter((item) => {
        const itemData = item.user_givenname
          ? item.user_givenname.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
      console.log('HI IM SERACHING FOR MY FRIEND :', newData);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  function ItemView({ item }) {
    // setFriend(item.user_id);
    // console.log("i'm this person" ,search)
    if (global.mode) {
      return (
        <View style={styles.container1}>

          <Text style={styles.itemStyle}>
            {item.user_givenname}
          </Text>
          <TouchableOpacity
            style={{ height: 20, width: 100, backgroundColor: '#61dafb' }}
            onPress={() => addFriend(item.user_id)}
          >
            <Text>Add Friend</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>

        <Text style={styles.itemStyle}>
          {item.user_givenname}
        </Text>
        <TouchableOpacity
          style={{ height: 20, width: 100, backgroundColor: '#61dafb' }}
          onPress={() => addFriend(item.user_id)}
        >
          <Text>Add Friend</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function ItemSeparatorView() {
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
  }

  const getItem = (item) => {
    // Function for click on an item
    alert(`Id : ${item.user_givenname} Title : ${item.user_familyname}`);
  };
  if (global.mode) {
    return (
      <SafeAreaView>
        <View style={styles.container1}>

          <TextInput style={styles.fname1} placeholder="Search for friends" onChangeText={(text) => setText(text)} value={text} />
          <TouchableOpacity style={styles.button} onPress={() => Searchfor()}><Text> Submit </Text></TouchableOpacity>

          <View>
            <FlatList

              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
            />
          </View>

        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>

        <TextInput style={styles.fname1} placeholder="Search for friends" onChangeText={(text) => setText(text)} value={text} />
        <TouchableOpacity style={styles.button} onPress={() => Searchfor()}><Text> Submit </Text></TouchableOpacity>

        <View>
          <FlatList

            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#F0FFFF',

  },

  container1: {
    flex: 1,
    backgroundColor: '#123456',
  },
  button: {
    fontStyle: 'italic',
    fontWeight: 'bold',

    backgroundColor: '#61dafb',
    padding: 10,
    width: 150,
    marginLeft: 100,
    margin: 10,
    marginBottom: 10,

    alignItems: 'center',

  },
  itemStyle: {
    padding: 10,

  },
  fname1: {

    //   marginLeft: 15,
    marginTop: 45,
    // height:30,
    alignItems: 'center',

    width: '100%',
    // SHAZA LOOK
    // borderWidth: 4,
    // borderColor: "#20232a",
    borderRadius: 500,
    backgroundColor: '#61dafb',
    color: '#123456',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Friends;
