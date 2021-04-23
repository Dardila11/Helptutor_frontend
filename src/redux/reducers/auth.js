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
  const payload = action.payload
  switch (action.type) {
    case ADD_TUTOR_GOOGLE: {
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        isLoading: false
      }
    }
    case ADD_STUDENT_GOOGLE: {
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        isLoading: false
      }
    }
    case ADD_TUTOR:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      }
    case GET_TUTOR:
      const tutorInfo = {
        id: payload.user.id,
        first_name: payload.user.first_name,
        last_name: payload.user.last_name,
        gender: payload.user.gender,
        birthday: payload.user.birthday,
        email: payload.user.email,
        interest: payload.interest,
        methodology: payload.methodology,
        skills: payload.skills
      }
      return {
        ...state,
        userInfo: tutorInfo,
        user: {
          id: tutorInfo.id,
          first_name: tutorInfo.first_name,
          last_name: tutorInfo.last_name
        },
        isAuthenticated: true
      }
    case ADD_STUDENT:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      }
    case UPDATE_TUTOR:
      const tutorInfo1 = {
        id: payload.user.id,
        first_name: payload.user.first_name,
        last_name: payload.user.last_name,
        gender: payload.user.gender,
        birthday: payload.user.birthday,
        email: payload.user.email,
        interest: payload.interest,
        methodology: payload.methodology,
        skills: payload.skills
      }
      return {
        ...state,
        userInfo: tutorInfo1,
        user: {
          id: tutorInfo1.id,
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
        user: payload
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        user: {
          id: payload.user.id,
          first_name: payload.user.first_name,
          last_name: payload.user.last_name
        },
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
      return {
        ...state,
        user: payload,
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
