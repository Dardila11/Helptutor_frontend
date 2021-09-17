import https from './ApiConfig'


/* token header */
const AuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("currentUser")).token
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  config.headers['Authorization'] = 'Token ' + token

  return config
}
/* Location Services*/

const getCountries = () => {
  return https.get('/api/country')
}

const getState = () => {
  return https.get('/api/state')
}

const getCity = () => {
  return https.get('/api/city')
}

const getUniversity = () => {
  return https.get('/api/university')
}

/* Tutor services */

const getUser = (state) => {
  return https.get('api/auth/user', tokenConfig(state))
}

const postTutor = (data) => {
  return https.post('/api/tutor/', data)
}

const updateTutorInfo = (data, state) => {
  return https.patch('/api/tutor/', data, tokenConfig(state))
}

const postGoogleTutor = (data) => {
  return https.post('/api/tutor/google/', data)
}

const postGoogleStudent = (data) => {
  return https.post('/api/student/google/', data)
}

const getCertificate = () => {
  return https.get('/api/certificate')
}

/** TUTOR KNOWLEDGE AREA */
const postKnowledgeAreaTutor = (data, values) => {
  return https.post(
    '/api/knowledgearea_tutor/',
    data,
    tokenConfig(values.state)
  )
}

const patchTutorKnowledgeAreas = (data, pk) => {
  return https.patch('/api/knowledgearea_tutor/' + pk + '/', data)
}

const getTutorKnowledgeAreas = (idTutor) => {
  return https.get('/api/tutor/' + idTutor + '/speciality/')
}

const deleteTutorKnowledgeArea = (idArea) => {
  return https.delete('/api/knowledgearea_tutor/' + idArea + '/')
}

/**Knowledge Area services */

const getknowledgeAreas = () => {
  return https.get('/api/knowledgearea/')
}

const getKnowledgeArea = (id) => {
  return https.get('/api/knowledgearea/' + id + '/')
}

const getSubKnowledgeAreas = (idArea) => {
  return https.get('/api/knowledgearea/' + idArea + '/knowledgearea/')
}

/*LOGIN*/

const login = (data) => {
  return https.post('/api/auth/login', data)
}

const loginGoogle = (data) => {
  return https.post('/api/auth/login/google', data)
}

const logout = (values) => {
  return https.post('api/auth/logout', null, tokenConfig(values.state))
}

const getTutorInfo = (id) => {
  return https.get(`/api/tutor/${id}/`, AuthHeader())
}

const getTutorInfoNew = (id, token) => {
  return https.get(`/api/tutor/${id}/`, addToken(token))
}


const getStudentInfo = (id, state) => {
  return https.get(`/api/student/${id}/`, tokenConfig(state))
}

const tokenConfig = (getState) => {
  const token = getState().auth.token

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    config.headers['Authorization'] = 'Token ' + token
  }

  return config
}

const addToken = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  config.headers['Authorization'] = 'Token ' + token
  
  return config
}

/** TUTOR SERVICES */

const getServicesTutor = (values) => {
  return https.get('/api/tutor/services/', tokenConfig(values.state))
}

const postServiceTutor = (data, values) => {
  return https.post('/api/service/', data, tokenConfig(values.state))
}

const deleteServiceTutor = (id) => {
  return https.delete('/api/service/' + id + '/')
}

const patchServiceTutor = (id, data) => {
  return https.patch('/api/service/' + id + '/', data)
}

const getNomination = (id, state) => {
  return https.get('/api/nomination/' + id + '/', tokenConfig(state))
}

const getNominations = (state) => {
  return https.get('/api/nomination/', tokenConfig(state))
}

const postNomination = (data, state) => {
  return https.post('/api/nomination/', data, tokenConfig(state))
}

const patchNomination = (id, data, state) => {
  return https.patch('/api/nomination/' + id + '/', data, tokenConfig(state))
}

const deleteNomination = (id, state) => {
  return https.delete('/api/nomination/' + id + '/', tokenConfig(state))
}

/** ESTUDENT SERVICES */

const postStudent = (data) => {
  return https.post('/api/student/', data)
}

const updateStudentInfo = (data, state) => {
  return https.patch('/api/student/', data, tokenConfig(state))
}

const postOffer = (data, state) => {
  return https.post('/api/offer/', data, tokenConfig(state))
}

const getTutors = (state) => {
  return https.get('api/tutor/', tokenConfig(state))
}

const getOffers = (state) => {
  return https.get('api/offer/', tokenConfig(state))
}

const postAdvertisement = (data, state) => {
  return https.post('api/advertisement/', data, tokenConfig(state))
}

const getAdvertisements = (state) => {
  return https.get('/api/advertisement/', tokenConfig(state))
}

const getAdvertisementAnswers = (id, state) => {
  console.log(id)
  return https.get('/api/answer/', tokenConfig(state))
}

const getServices = (state) => {
  return https.get('api/service/', tokenConfig(state))
}

const getServicesNew = (token) => {
  return https.get('api/service', addToken(token))
}

const patchOffer = (id, data, state) => {
  return https.patch('api/offer/' + id + '/', data, tokenConfig(state))
}

const deleteOffer = (id, state) => {
  return https.delete('api/offer/' + id + '/', tokenConfig(state))
}

const getOfferNominations = (id, state) => {
  return https.get('api/nomination/', tokenConfig(state))
}

const postAnswer = (data, state) => {
  return https.post('api/answer/', data, tokenConfig(state))
}

const getSchedule = (idTutor) => {
  console.log('get schedule with id:'+idTutor)
  //return https.post('api/tutor/'+idTutor+'/schedule', tokenConfig(state))
}

const postSchedule = (idTutor) => {
  console.log('post schedule with id:'+idTutor)
  //return https.post('api/tutor/'+idTutor+'/schedule', tokenConfig(state))
}

const logConstants = {
  getCountries,
  getState,
  getCity,
  getUniversity,
  getUser,
  getTutorInfo,
  getTutorInfoNew,
  getStudentInfo,
  getknowledgeAreas,
  getKnowledgeArea,
  getSubKnowledgeAreas,
  getCertificate,
  getTutorKnowledgeAreas,
  getTutors,
  getOffers,
  getAdvertisements,
  getAdvertisementAnswers,
  getServicesTutor,
  getServices,
  getServicesNew,
  getNomination,
  getNominations,
  getOfferNominations,
  getSchedule,
  postTutor,
  postGoogleTutor,
  postGoogleStudent,
  postKnowledgeAreaTutor,
  postServiceTutor,
  postStudent,
  postOffer,
  postAdvertisement,
  postNomination,
  postAnswer,
  postSchedule,
  patchTutorKnowledgeAreas,
  patchServiceTutor,
  patchNomination,
  patchOffer,
  deleteTutorKnowledgeArea,
  deleteServiceTutor,
  deleteNomination,
  deleteOffer,
  updateTutorInfo,
  updateStudentInfo,
  login,
  loginGoogle,
  logout
}
export default logConstants
