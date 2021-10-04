import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchOffers =  async () => {
  return Api.getOffers().then(res => res.data)
}

const useOffers = () => {
  return useQuery(['offers'], () => fetchOffers())
}

export default useOffers
