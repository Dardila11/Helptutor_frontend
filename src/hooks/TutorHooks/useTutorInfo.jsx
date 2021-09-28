import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorInfo =  async (id) => {
  return Api.getTutorInfo(id).then(res => res.data)
}

const useTutorInfo = (id) => {
  return useQuery(['tutorInfo',id], () => fetchTutorInfo(id), {
    // disable query from automatically running if id is null
    enabled: id === null ? false : true,
    refetchOnWindowFocus: id === null ? false : true
})
}

export default useTutorInfo
