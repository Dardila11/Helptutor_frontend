import { 
  ADD_TUTOR, 
  UPDATE_TUTOR, 
  GET_TUTOR,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS } from '../actions/types_auth'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  isRunning: false,
  user: null,
  userInfo: null
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
    case GET_TUTOR:
      return {
        ...state,
        userInfo: action.payload,
        isAuthenticated: true
      }
      case USER_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload,
        };
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
        };
      case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
          localStorage.removeItem('token');
          return {
            ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          };
    default:
      return state
  }
}

export default auth