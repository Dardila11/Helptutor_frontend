import { combineReducers } from 'redux'

import auth from './auth'
import messages from './messages'
import errors from './errors'
import services from './services'

import knowledge_areas from './knowledge_areas'

export default combineReducers({
  auth,
  messages,
  errors,
  knowledge_areas,
  services
})
