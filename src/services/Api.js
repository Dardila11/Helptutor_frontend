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

const postGoogleTutor = (data) => {
  return https.post('/api/google/tutor/', data)
}

/*TODO: Ask for enterpoint*/
const postKnowledgeAreaTutor = (data) => {
  return https.post('/api/knowledgearea_tutor/',data)
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


const logConstants = {
  getCountries,
  getState,
  getCity,
  getUniversity,
  postTutor,
  postGoogleTutor,
  postKnowledgeAreaTutor,
  getknowledgeAreas,
  getKnowledgeArea,
  getSubKnowledgeAreas,
  getSupports,
  getTutorKnowledgeAreas,
  deleteTutorKnowledgeArea
}
export default logConstants
