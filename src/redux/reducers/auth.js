import {
  ADD_TUTOR,
  ADD_STUDENT,
  ADD_TUTOR_GOOGLE,
  ADD_STUDENT_GOOGLE,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  ACTION_RUNNING,
  FINISHED_LOADING,
  ACTION_END,
  UPDATE_USER_INFORMATION,
  SELECT_ROLE
} from 'src/redux/types/types_auth'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  isRunning: false,
  isTutor: false,
  isStudent: false,
  roleSelected: null,
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
    case ADD_STUDENT:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        user: payload,
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
      let boolTutor = localStorage.getItem('isTutor') === 'true'
      let boolStudent = localStorage.getItem('isStudent') === 'true'
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
        isStudent: boolStudent,
        isTutor: boolTutor,
        roleSelected: localStorage.getItem('role')
      }
    case LOGIN_SUCCESS:
      console.log(payload)
      let isStudent = false
      let isTutor = false
      if (payload.roles[0]) isTutor = true
      if (payload.roles[1]) isStudent = true
      localStorage.setItem('token', payload.token)
      localStorage.setItem('isStudent', isStudent)
      localStorage.setItem('isTutor', isTutor)
      return {
        ...state,
        ...payload,
        user: {
          id: payload.user.id,
          first_name: payload.user.first_name,
          last_name: payload.user.last_name,
          photo: payload.user.photo
        },
        isAuthenticated: true,
        isLoading: false,
        isStudent: isStudent,
        isTutor: isTutor
      }
    case SELECT_ROLE:
      localStorage.setItem('role', payload)
      return {
        ...state,
        roleSelected: payload
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
