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
  requestInProgress: true,
  userInfo: userInfoData
}


const tutorInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TUTOR':
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
    case 'UPDATE_TUTOR':
      return {
        ...state,
        userInfo: action.payload,
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
