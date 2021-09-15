import { useQuery } from 'react-query'
import Api from 'src/services/Api'
import { TOKEN } from './token'

const fetchTutorServices = async () => {
  return Api.getServicesNew(
    TOKEN
  ).then((res) => res.data)
}

const useTutorsServices = () => {
  return useQuery('tutorsServices', fetchTutorServices)
}

export default useTutorsServices
