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

const updateTutorInfo = (id, data) => {
  return https.patch(`/api/tutor/${id}/`, data)
}

const getTutorInfo = (id) => {
  return https.get(`/api/tutor/${id}/`)
}

const postGoogleTutor = (data) => {
  return https.post('/api/google/tutor/', data)
}

/*TODO: Ask for enterpoint*/
const postKnowledgeAreaTutor = (data) => {
  return https.post('/api/knowledgearea_tutor/',data)
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
  return https.post('/api/auth/google/login', data)
}

/*
const loadUser = () => {
  return https.get('api/auth/user')
}*/


const logout = (values) => {
  return https.post('api/auth/logout', null, tokenConfig(values.state))
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




const logConstants = {
  getCountries,
  getState,
  getCity,
  getUniversity,
  postTutor,
  postGoogleTutor,
  postKnowledgeAreaTutor,
  patchTutorKnowledgeAreas,
  getknowledgeAreas,
  getKnowledgeArea,
  getSubKnowledgeAreas,
  getSupports,
  getTutorKnowledgeAreas,
  deleteTutorKnowledgeArea,
  updateTutorInfo,
  getTutorInfo,
  login,
  loginGoogle,
  logout
}
export default logConstants
