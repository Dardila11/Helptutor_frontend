import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchOffers = async () => {
  return Api.getOffers()
    .then((res) => res.data)
    .catch(err => console.log(err))
}

const usePublications = () => {
  return useQuery('publications', () => fetchOffers())
}

export default usePublications
