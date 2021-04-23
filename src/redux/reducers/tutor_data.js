import { GET_TUTOR, UPDATE_TUTOR } from 'src/redux/types/types_tutor'

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
  isLoading: false,
  requestInProgress: true,
  userInfo: userInfoData
}

const tutorInfo = (state = initialState, action) => {
  switch (action.type) {
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
