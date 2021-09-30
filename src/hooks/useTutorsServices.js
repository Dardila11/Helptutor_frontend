import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorServices = async (id) => {
  return Api.getTutorServices(id).then((res) => res.data)
}

const useTutorsServices = (id) => {
  console.log('use hooks', id)
  return useQuery(['tutorsServices', id], () => fetchTutorServices(id))
}

export default useTutorsServices
