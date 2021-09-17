import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorServices = async (id) => {
  return Api.getTutorInfo(id)
}

const useTutorInfo = (id) => {
  return useQuery(['tutorInfo',id], () =>fetchTutorServices(id))
}

export default useTutorInfo
