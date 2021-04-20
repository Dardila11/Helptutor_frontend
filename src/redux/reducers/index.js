import { combineReducers } from 'redux'

import auth from './auth'
import services from './services'
import tutorInfo from './tutor_data'
import alert from './alerts'
import studentInfo from './student_data'
import publications from './publications'
import knowledge_areas from './knowledge_areas'
import tutorsInfo from './tutors_data'
import advertisements from './advertisements'

export default combineReducers({
  auth,
  alert,
  knowledge_areas,
  services,
  tutorInfo,
  studentInfo,
  publications,
  tutorsInfo,
  advertisements
})
