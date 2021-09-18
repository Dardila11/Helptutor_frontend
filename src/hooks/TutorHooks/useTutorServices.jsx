import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorServices =  async (id) => {
  return Api.getTutorServices(id).then(res => res.data)
}

const useTutorServices = (id) => {
  return useQuery(['tutorServices',id], () => fetchTutorServices(id))
}

export default useTutorServices
