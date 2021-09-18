import Api from 'src/services/Api'
import { useQuery } from 'react-query'

const fetchAdvertisements = async () => {
  return Api.getAdvertisements().then((res) => res.data)
}

const useAdvertisements = () => {
  return useQuery('advertisements', () => fetchAdvertisements())
}

export default useAdvertisements
