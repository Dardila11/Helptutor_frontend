import {
  ADD_TUTOR,
  ADD_STUDENT,
  ADD_TUTOR_GOOGLE,
  ADD_STUDENT_GOOGLE,
  UPDATE_TUTOR,
  GET_TUTOR,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  ACTION_RUNNING,
  FINISHED_LOADING,
  ACTION_END,
  UPDATE_USER_INFORMATION
} from 'src/redux/types/types_auth'

const userInfoData = {
  first_name: '',
  last_name: '',
  interest: '',
  methodology: '',
  skills: '',
  sex: '',
  birthday: '',
  email: ''
}

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  isRunning: false,
  userInfo: userInfoData,
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
    case ADD_STUDENT_GOOGLE: {
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
    case GET_TUTOR:
      const data = action.payload
      const tutorInfo = {
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        gender: data.user.gender,
        birthday: data.user.birthday,
        email: data.user.email,
        interest: data.interest,
        methodology: data.methodology,
        skills: data.skills
      }
      return {
        ...state,
        userInfo: tutorInfo,
        user: {
          first_name: tutorInfo.first_name,
          last_name: tutorInfo.last_name
        },
        isAuthenticated: true
      }
    case ADD_STUDENT:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case UPDATE_TUTOR:
      const data1 = action.payload
      const tutorInfo1 = {
        first_name: data1.user.first_name,
        last_name: data1.user.last_name,
        gender: data1.user.gender,
        birthday: data1.user.birthday,
        email: data1.user.email,
        interest: data1.interest,
        methodology: data1.methodology,
        skills: data1.skills
      }
      return {
        ...state,
        userInfo: tutorInfo1,
        user: {
          first_name: tutorInfo1.first_name,
          last_name: tutorInfo1.last_name
        },
        isAuthenticated: true
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
        isLoading: false,
        userInfo: null
      }
    case ACTION_RUNNING:
      return {
        ...state,
        isRunning: true
      }
    case UPDATE_USER_INFORMATION:
      const newUserInfo = action.payload
      return {
        ...state,
        user: newUserInfo,
        isAuthenticated: true
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
