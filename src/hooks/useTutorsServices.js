import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorServices = async () => {
  return Api.getServicesNew(
    'd63803e870efeef63d1b2d9899840963380137246fc6b447f696511024e5485f'
  ).then((res) => res.data)
}

const useTutorsServices = () => {
  return useQuery('tutorsServices', fetchTutorServices)
}

export default useTutorsServices
