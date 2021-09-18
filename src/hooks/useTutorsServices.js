import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorServices = async () => {
  return Api.getServices().then((res) => res.data)
}

const useTutorsServices = () => {
  return useQuery('tutorsServices', () => fetchTutorServices())
}

export default useTutorsServices
