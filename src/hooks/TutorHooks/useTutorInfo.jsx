import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorInfo =  async (id) => {
  return Api.getTutorInfo(id).then(res => res.data)
}

const useTutorInfo = (id) => {
  return useQuery(['tutorInfo',id], () => fetchTutorInfo(id))
}

export default useTutorInfo
