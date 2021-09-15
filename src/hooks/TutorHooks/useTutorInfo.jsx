import { useQuery } from 'react-query'
import { helpTutorBackEnd } from 'src/services/HelptutorBackEnd'

const fetchTutorServices = (id) => {
  const data = helpTutorBackEnd.get('/tutor/'+id+'/')
  console.log(data)
  return data
}

const useTutorInfo = (id) => {
  return useQuery(['tutorInfo',id], () => fetchTutorServices(id))
}

export default useTutorInfo
