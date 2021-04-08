import { combineReducers } from 'redux'

import auth from './auth'
import services from './services'
import tutorInfo from './tutor_data'
import alert from './alerts'

import knowledge_areas from './knowledge_areas'

export default combineReducers({
  auth,
  alert,
  knowledge_areas,
  services,
  tutorInfo
})
