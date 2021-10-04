import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorServices = async (id) => {
  return Api.getTutorServices(id).then((res) => res.data)
}

const fetchServices = async () => {
  return Api.getServices().then(res => res.data)
}

export const useServices = () => {
  return useQuery('services', () => fetchServices())
} 

export const useTutorsServices = (id) => {
  return useQuery(['tutorsServices', id], () => fetchTutorServices(id))
}


