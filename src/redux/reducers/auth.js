import { ADD_TUTOR, UPDATE_TUTOR } from '../actions/types_auth'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  isRunning: false,
  user: null
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TUTOR:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case UPDATE_TUTOR:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
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
      return state
  }
}

export default auth