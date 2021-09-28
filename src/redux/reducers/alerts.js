import { LAUNCHALERT } from 'src/redux/types/types_alerts'

const initialState = {
  msg: '',
  status: ''
}

const alert = (state = initialState, action) => {
  switch (action.type) {
    case LAUNCHALERT:
      return (state = action.payload)
    default:
      return state
  }
}

export default alert
