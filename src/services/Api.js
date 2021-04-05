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

const postTutor = (data) => {
  return https.post('/api/tutor/', data)
}

const updateTutorInfo = (data, state) => {
  return https.patch(`/api/tutor/`, data, tokenConfig(state))
}

const postGoogleTutor = (data) => {
  return https.post('/api/tutor/google/', data)
}

/*TODO: Ask for enterpoint*/
const postKnowledgeAreaTutor = (data,values) => {
  return https.post('/api/knowledgearea_tutor/',data, tokenConfig(values.state))
}

const patchTutorKnowledgeAreas = (data, pk) => {
  return https.patch('/api/knowledgearea_tutor/' + pk + '/', data)
}

const getSupports = () => {
  return https.get('/api/certificate')
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

/*
const loadUser = () => {
  return https.get('api/auth/user')
}*/


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

const getServicesTutor = (values) => {
  return https.get('/api/service/', tokenConfig(values.state))
}

const postServiceTutor = (data, values) => {
  return https.post('/api/service/', data, tokenConfig(values.state))
}

const deleteServiceTutor = (id) => {
  return https.delete('/api/service/'+id+'/')
}


const logConstants = {
  getCountries,
  getState,
  getCity,
  getUniversity,
  postTutor,
  postGoogleTutor,
  postKnowledgeAreaTutor,
  postServiceTutor,
  patchTutorKnowledgeAreas,
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
