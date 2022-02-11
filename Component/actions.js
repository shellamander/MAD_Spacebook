import { AsyncStorage } from '@react-native-community/async-storage ';

// export const getToken = (token) => ({
//     type: 'GET_TOKEN',
//     token,
// });

// export const saveToken = token => ({
//     type: 'SAVE_TOKEN',
//     token
// });

// export const removeToken = () => ({
//     type: 'REMOVE_TOKEN',
// });

// export const loading = bool => ({
//     type: 'LOADING',
//     isLoading: bool,
// });

export const SET_USER_NAME ='SET_USER_NAME';
export const SET_USER_AGE ='SET_USER_AGE';

export const setAge = age=> dispatch=>
 {dispatch({
     type:SET_USER_AGE,
     payload:age,
 });
};

export const setName = name => dispatch=>
 {dispatch({
     type:SET_USER_NAME,
     payload:name,
 });
};