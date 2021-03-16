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
export default {
  getCountries,
  getState,
  getCity,
  getUniversity,
  postTutor,
  postGoogleTutor
}
