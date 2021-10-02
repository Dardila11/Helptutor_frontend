import {
  AUTH_ERROR,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOADING_ACTION,
  STOP_ACTION
} from './types'

export const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: Boolean(localStorage.getItem('token')),
  isLoading: false,
  isRunning: false,
  user: { first_name: '', last_name: '', photo: '' },
  roles: [false, false, false]
}

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
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
        isAuthenticated: false,
        isLoading: false,
        user: null,
        roles: []
      }
    case LOADING_ACTION:
      return {
        ...state,
        isRunning: true
      }
    case STOP_ACTION:
      return {
        ...state,
        isRunning: false
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
