import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorServices =  async (id) => {
  return Api.getTutorInfo(id).then(res => res.data)
}

const useTutorInfo = (id) => {
  return useQuery(['tutorInfo',id], () => fetchTutorServices(id))
}

export default useTutorInfo
