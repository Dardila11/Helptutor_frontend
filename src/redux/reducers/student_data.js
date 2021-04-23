import { GET_STUDENT, UPDATE_STUDENT } from 'src/redux/types/types_student'

const userInfoData = {
  first_name: '',
  last_name: '',
  sex: '',
  birthday: '',
  email: ''
}

const initialState = {
  student: null,
  isLoading: false,
  requestInProgress: true,
  userInfo: userInfoData
}

const tutorInfo = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENT:
      const data = action.payload
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
    case UPDATE_STUDENT:
      const data1 = action.payload
      const student1 = {
        first_name: data1.user.first_name,
        last_name: data1.user.last_name,
        gender: data1.user.gender,
        birthday: data1.user.birthday,
        email: data1.user.email
      }
      return {
        ...state,
        userInfo: student1,
        isAuthenticated: true
      }
    case 'FINISHED_LOADING':
      return {
        ...state,
        requestInProgress: false
      }
    default:
      return state
  }
}

export default tutorInfo
