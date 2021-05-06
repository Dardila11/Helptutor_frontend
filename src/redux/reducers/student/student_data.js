import {
  GET_STUDENT,
  UPDATE_STUDENT,
  LOADING
} from 'src/redux/types/types_student'

const userInfoData = {
  first_name: '',
  last_name: '',
  sex: '',
  birthday: '',
  email: '',
  interest: ''
}

const initialState = {
  student: null,
  isLoading: true,
  userInfo: userInfoData
}

const studentInfo = (state = initialState, action) => {
  const data = action.payload
  switch (action.type) {
    case GET_STUDENT:
      const student = {
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        gender: data.user.gender,
        birthday: data.user.birthday,
        email: data.user.email,
        interest: data.interest
      }
      return {
        ...state,
        userInfo: student,
        isAuthenticated: true,
        student: data.id
      }
    case LOADING:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_STUDENT:
      const student1 = {
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        gender: data.user.gender,
        birthday: data.user.birthday,
        email: data.user.email,
        interest: data.user.interest
      }
      return {
        ...state,
        userInfo: student1,
        isAuthenticated: true
      }
    default:
      return state
  }
}

export default studentInfo
