import { combineReducers } from 'redux'

import auth from './auth'
import services from './tutor/services'
import tutorInfo from './tutor/tutor_data'
import alert from './alerts'
import studentInfo from './student/student_data'
import publications from './student/student_publications'
import knowledge_areas from './tutor/knowledge_areas'
import tutorsInfo from './student/tutors_data'
import advertisements from './student/advertisements'
import studentServices from './student/student_services'
import nominations from './tutor/nominations'

export default combineReducers({
  auth,
  alert,
  knowledge_areas,
  services,
  tutorInfo,
  studentInfo,
  publications,
  tutorsInfo,
  advertisements,
  studentServices,
  nominations
})
