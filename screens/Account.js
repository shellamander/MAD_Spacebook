import React, { useState, useEffect } from 'react';
import {
  Text, Switch, TextInput, Button, View, StyleSheet,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-Icons';

import Getfred from './getFriendPost';

function UserPosts({ route, navigation }) {
  const [data, setData] = useState([]);
  const [friend, setFriend] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [friendpost, setFriendPost] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [texty, setText] = useState('');
  const [draft, setDraft] = useState('');

  const test = async () => {

  };

  useEffect(async () => {
    await test();
    Search();
    getFriendPost();

    getPost();

    (async () => {
      const draft = await AsyncStorage.getItem('@spacebook_drafts');
    })();

    getFriendPost(); // you are undefined for some unhappy reason
  }, []);

  console.log('draft', draft);

  const getPost = async () => {
    const token = await AsyncStorage.getItem('@spacebook_token'); // call before i need it otherwise its undefined
    const id = await AsyncStorage.getItem('@spacebook_id');

    console.log('ASh', token);
    fetch(`http://localhost:3333/api/1.0.0/user/${id}/post`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token, // x-authorization
        //  "session_token":token1,
      },

    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 400) {
          throw 'Invalid email or password';
        } else {
          throw 'Something happened';
        }
      }).then(async (post) => {
        setData(post);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likePost = async (id, post) => {
    const token = await AsyncStorage.getItem('@spacebook_token');

    fetch(`http://localhost:3333/api/1.0.0/user/${id}/post/${post}/like`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })

      .then((response) => {
        if (response.status === 200) {
          console.log('im working and ive rejected you');
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 403) {
          throw 'you liked this already';
        } else {
          throw 'Something happened';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dislikePost = async (id, post) => {
    const token = await AsyncStorage.getItem('@spacebook_token');

    fetch(`http://localhost:3333/api/1.0.0/user/${id}/post/${post}/like`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })

      .then((response) => {
        if (response.status === 200) {
          console.log('im working and ');
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 403) {
          throw 'you havent even liked it';
        } else {
          throw 'Something happened';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = async (id, post) => {
    const token = await AsyncStorage.getItem('@spacebook_token');

    fetch(`http://localhost:3333/api/1.0.0/user/${id}/post/${post}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })

      .then((response) => {
        if (response.status === 200) {
          console.log('ive deleted this post  ');
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 403) {
          throw 'you havent even liked it';
        } else {
          throw 'Something happened';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postbaby = async () => {
    if (texty === '') {
      setErrorMessage('* this post is empty');
    } else {
      const token = await AsyncStorage.getItem('@spacebook_token'); // call before i need it otherwise its undefined
      const id = await AsyncStorage.getItem('@spacebook_id');
      fetch(`http://localhost:3333/api/1.0.0/user/${id}/post`, { // change id
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body: JSON.stringify({

          text: texty,

        }),
      })
        .then((response) => {
          if (response.status === 201) {
            console.log('IM HOME HONEY');
            return response.json();
          } if (response.status === 400) {
            throw 'Invalid email or password';
          } else {
            throw 'Something happened';
          }
        }).then(async (res) => {
          getPost();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const Search = async () => {
    const token = await AsyncStorage.getItem('@spacebook_token');
    const id = await AsyncStorage.getItem('@spacebook_id');

    fetch(`http://localhost:3333/api/1.0.0/user/${id}/friends`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 403) {
          throw 'we are friends already';
        } else {
          throw 'Something happened';
        }
      })
      .then(async (Friends) => {
        setFriend(Friends);
        await AsyncStorage.setItem('@spacebook_friends', Friends);

        getFriendPost(Friends);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFriendPost = async (friendPosts) => {
    const token = await AsyncStorage.getItem('@spacebook_token');

    friendPosts?.forEach((element) => {
      fetch(`http://localhost:3333/api/1.0.0/user/${element.user_id}/post`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } if (response.status === 400) {
            throw 'Invalid email or password';
          } else {
            throw 'Something happened';
          }
        }).then(async (user) => {
          console.log('check', user);
          await setFriendPost(user);
          await setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    });
  };

  const move = async (post_id) => {
    console.log('I AM IDP', post_id);
    await AsyncStorage.setItem('@spacebook_postEdit', post_id);
    navigation.navigate('editPosts');
  };

  const saveDraft = async () => {
    const allDrafts = [...draft, texty]; // spread operator
    setDraft(allDrafts);
    await AsyncStorage.setItem('@spacebook_drafts', JSON.stringify(allDrafts));
  };

  if (global.mode) {
    return (

      <View style={styles.container1}>

        <Text style={styles.title}>My Feed</Text>

        <View>
          <TextInput style={styles.fname1} onChangeText={(texty) => setText(texty)} value={texty} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => saveDraft(texty)}>
              {' '}
              <Text style={styles.button}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => postbaby()}>
              {' '}
              <Text style={styles.button}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ color: 'red', fontStyle: 'italic' }}>{errorMessage}</Text>

        <Getfred />

        <View style={{ flex: 3 }}>

          <FlatList
            data={data}
            renderItem={({ item }) => (

              <View style={styles.card}>

                <View style={{ flexDirection: 'row' }}>

                  <TouchableOpacity onPress={() => console.log('ARE YOU EVEN SHOWING', item.post_id)}>{item.text}</TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => deletePost(item.author.user_id, item.post_id)}>
                    {' '}
                    <FontAwesome name="trash-o" color="black" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: 'FFF' }} onPress={() => move(item.post_id)}>
                    {' '}
                    <Text> Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.post_id.toString()}
          />

        </View>

      </View>
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>My Feed</Text>

      <View>
        <TextInput style={styles.fname1} onChangeText={(texty) => setText(texty)} value={texty} />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => saveDraft(texty)}>
            {' '}
            <Text style={styles.button1}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => postbaby()}>
            {' '}
            <Text style={styles.button1}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{ color: 'red', fontStyle: 'italic' }}>{errorMessage}</Text>

      <View style={{ flex: 8 }}>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>{item.text}</TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => deletePost(item.author.user_id, item.post_id)}>
                  {' '}
                  <FontAwesome name="trash-o" color="black" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'FFF' }} onPress={() => move(item.post_id)}>
                  {' '}
                  <Text> Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.post_id.toString()}
        />

      </View>

      <View style={{ flex: 3 }}>
        <FlatList
          data={friendpost}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => console.log(item.post_id)}>{item.text}</TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => deletePost(item.author.user_id, item.post_id)}>
                  {' '}
                  <FontAwesome name="trash-o" color="black" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'FFF' }} onPress={() => updatePost(item.author.user_id, item.post_id)}>
                  {' '}
                  <Text> Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.post_id.toString()}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    flex: 1,
    backgroundColor: '#F0FFFF',
  },
  container1: {
    // flexGrow: 1,
    flex: 1,
    backgroundColor: '#123456',
  },
  text: {
    fontFamily: 'GillSans-SemiBold',
    color: '#000',
  },

  card: {
    // fontFamily: "GillSans-SemiBold",
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#61dafb',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    height: 100,

  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F0FFFF',
    padding: 10,
    margin: 30,
    width: 100,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '"#61dafb"',
    padding: 10,
    margin: 30,
    width: 100,
  },
  title: {

    color: '#61dafb',
    textAlign: 'center',
    fontSize: 50,
    fontStyle: 'italic',
    fontWeight: 'bold',
    flex: 1,
  },
  title1: {
    marginTop: 10,

    color: '#61dafb',
    textAlign: 'center',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  fname: {

    // marginTop: 45,

    padding: 1,
    width: 300,
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
  fname1: {

    marginLeft: 15,
    // marginTop: 45,
    height: 30,

    padding: 1,
    width: 300,
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

export default UserPosts;
