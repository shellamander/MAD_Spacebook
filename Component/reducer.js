import * as actions from './actions';

export const initialState = {
    
  name: '',
  age:0,
  };



  function userReducer(state = initialState,action){
    switch(action.type){
           case actions.SET_USER_NAME:
           return {...state, name:action.payload};
           case actions.SET_USER_AGE:
           return {...state, age:action.payload};
           default:
             return state;

    }

  }
  export default userReducer;
  //isLoggedIn: false,
  //userId: '',
  //token: '',
//   export const SET_LOGIN_STATE = "SET_LOGIN_STATE"


// export default function appReducer(state = initialState, action) {
//     // The reducer normally looks at the action type field to decide what happens
//     switch (action.type) {
//         case actions.
//       // Do something here based on the different types of actions
//       default:
//         // If this reducer doesn't recognize the action type, or doesn't
//         // care about this specific action, return the existing state unchanged
//         return state
//     }
//   }