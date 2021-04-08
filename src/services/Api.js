import https from './ApiConfig'

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

const getSupports = () => {
  return https.get('/api/certificate')
}

/** TUTOR KNOWLEDGE AREA */
const postKnowledgeAreaTutor = (data,values) => {
  return https.post('/api/knowledgearea_tutor/',data, tokenConfig(values.state))
}

const patchTutorKnowledgeAreas = (data, pk) => {
  return https.patch('/api/knowledgearea_tutor/' + pk + '/', data)
}

const getTutorKnowledgeAreas = (idTutor) => {
  return https.get('/api/tutor/'+idTutor+'/speciality/')
}

const deleteTutorKnowledgeArea = (idArea) => {
  return https.delete('/api/knowledgearea_tutor/'+idArea+'/')
}

/**Knowledge Area services */

const getknowledgeAreas = () => {
  return https.get('/api/knowledgearea/')
} 

const getKnowledgeArea = (id) => {
  return https.get('/api/knowledgearea/'+id+'/')
}

const getSubKnowledgeAreas = (idArea) => {
  return https.get('/api/knowledgearea/'+idArea+'/speciality/')
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

const getTutorInfo = (id, state) => {
  return https.get(`/api/tutor/${id}/`, tokenConfig(state))
}

const tokenConfig = (getState) => {
  const token = getState().auth.token

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = 'Token '+token
  }

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
  return https.delete('/api/service/'+id+'/')
}

const patchServiceTutor = (id, data) => {
  return https.patch('/api/service/'+id+'/', data)
}

/** ESTUDENT SERVICES */

const postStudent = (data) => {
  return https.post('/api/student', data)
}


const logConstants = {
  getCountries,
  getState,
  getCity,
  getUniversity,
  getUser,
  postTutor,
  postGoogleTutor,
  postKnowledgeAreaTutor,
  postServiceTutor,
  postStudent,
  patchTutorKnowledgeAreas,
  patchServiceTutor,
  getknowledgeAreas,
  getKnowledgeArea,
  getSubKnowledgeAreas,
  getSupports,
  getTutorKnowledgeAreas,
  deleteTutorKnowledgeArea,
  deleteServiceTutor,
  updateTutorInfo,
  getTutorInfo,
  login,
  loginGoogle,
  logout,
  getServicesTutor
}
export default logConstants
