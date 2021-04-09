import {
  ADD_TUTOR,
  ADD_STUDENT,
  ADD_TUTOR_GOOGLE,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  ACTION_RUNNING,
  FINISHED_LOADING,
  ACTION_END,
  UPDATE_INFORMATION
} from '../actions/types_auth'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  isRunning: false,
  user: {
    id: -1,
    first_name: '',
    last_name: ''
  }
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TUTOR_GOOGLE: {
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false
      }
    }
    case ADD_TUTOR:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case ADD_STUDENT:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case UPDATE_INFORMATION: 
      return {
        ...state,
        user: action.payload
      }
    case FINISHED_LOADING:
      return {
        ...state,
        requestInProgress: false
      }
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    case ACTION_RUNNING:
      return {
        ...state,
        isRunning: true
      }
    case ACTION_END:
      return {
        ...state,
        isRunning: false
      }
    default:
      return state
  }
}

export default auth
