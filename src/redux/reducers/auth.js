import {
    ADD_TUTOR
  } from '../actions/types_auth';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    isRunning: false,
    user: null,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case ADD_TUTOR:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true
        };
    //   case ACTION_RUNNING:
    //     return {
    //       ...state,
    //       isRunning: true,
    //     };
    //   case ACTION_END:
    //     return {
    //       ...state,
    //       isRunning: false,
    //     };
      default:
        return state;
    }
  }