const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  requestInProgress: true,
  userInfo: null
}

const tutorInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TUTOR':
      return {
        ...state,
        userInfo: action.payload,
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
