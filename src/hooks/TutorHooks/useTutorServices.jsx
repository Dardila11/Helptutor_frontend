import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorServices =  async () => {
  return Api.getServices().then(res => res.data)
}

const useTutorServices = () => {
  return useQuery(['services',], () => fetchTutorServices())
}

export default useTutorServices
